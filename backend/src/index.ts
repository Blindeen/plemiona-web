import express, { Request, Response } from 'express';
import axios from 'axios';
import qs from 'qs';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import cors from 'cors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from './database/model/User';
import './database/sync';
import { UniqueConstraintError } from 'sequelize';
import { body, validationResult } from 'express-validator';

dotenv.config();
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());
app.use(cors());

const {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    FB_APP_ID,
    FB_APP_SECRET,
    JWT_SECRET = 'your_jwt_secret',
    HCAPTCHA_SECRET
} = process.env;

const REDIRECT_URI = 'http://localhost:3000';

interface CustomJwtPayload extends JwtPayload {
    userId: number;
}

const generateToken = (user: User) => {
    return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = (to: string, subject: string, text: string) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };
    return transporter.sendMail(mailOptions);
};

const verifyCaptcha = async (token: string) => {
    const response = await axios.post(
        `https://hcaptcha.com/siteverify`,
        qs.stringify({
            secret: HCAPTCHA_SECRET,
            response: token
        })
    );

    return response.data.success;
};


// User register endpoint
app.post('/register',
    [
        // Data validation
        body('email').notEmpty().isEmail().isLength({ max: 255 }),
        body('password').notEmpty().isLength({ max: 60 })
            // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'There are validation errors in the form' });
        }

        const { email, password, captchaToken } = req.body;
        if (captchaToken && !await verifyCaptcha(captchaToken)) {
            return res.status(400).json({ message: 'Invalid CAPTCHA' });
        }

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ email, password: hashedPassword });
            res.status(201).json({ message: 'User registered successfully', user});
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                res.status(409).json({ message: 'User with this email already exists' });
            } else {
                res.status(500).json({ message: 'Error registering user', error });
            }
        }
    }
);

// Logging in a user traditional way
app.post('/login',[
        // Data validation
        body('email').notEmpty().isEmail().isLength({ max: 255 }),
        body('password').notEmpty().isLength({ max: 60 })
            // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    ],
    async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'There are validation errors in the form' });
    }

    const { email, password} = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user || !await bcrypt.compare(password, <string>user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = generateToken(user);
        res.json({ message: 'User logged in successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in user', error });
    }
});

// Logging using GitHub
app.get('/auth/github', (req, res) => {
    // Creating an url to authorize through GitHub
    const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=http://localhost:5000/auth/github/callback&scope=user:email`;
    // Redirecting to the said url
    res.redirect(url);
});
// Callback endpoint for GitHub
app.get('/auth/github/callback', async (req, res) => {
    // Extracting the code from the query parameters
    const opts = { headers: { accept: 'application/json' } };

    // Extracting the code from the query parameters
    const code = req.query.code as string;
    const body = {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
    };

    try {
        console.log('Exchanging code for access token');
        const response = await axios.post('https://github.com/login/oauth/access_token', qs.stringify(body), opts);
        const params = new URLSearchParams(response.data);
        const accessToken = params.get('access_token');
        if (!accessToken) {
            return res.status(400).json({ message: 'Access token not found' });
        }

        console.log('Fetching user data from GitHub');
        const githubUserResponse = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `token ${accessToken}` },
        });

        // Due to privacy reasons, GitHub does not always return the email in the user response
        let email = githubUserResponse.data.email;
        if (!email) {
            // Fetching the email from the emails endpoint
            console.log('Fetching user emails from GitHub');
            const emailsResponse = await axios.get('https://api.github.com/user/emails', {
                headers: { Authorization: `token ${accessToken}` },
            });
            const primaryEmail = emailsResponse.data.find((email: any) => email.primary && email.verified);
            email = primaryEmail ? primaryEmail.email : null;
        }
        // If the email is not found, return an error
        if (!email) {
            return res.status(400).json({ message: 'Email not found from GitHub account' });
        }

        // Check if the user already exists in the database
        let user = await User.findOne({ where: { githubId: githubUserResponse.data.id } });
        if (!user) {
            user = await User.create({ email, githubId: githubUserResponse.data.id });
        }

        // Generate a JWT token and redirect to the frontend
        const token = generateToken(user);
        res.redirect(`${REDIRECT_URI}/?token=${token}`);

    } catch (err) {
        // @ts-ignore
        console.error('Error during GitHub callback processing:', err.response ? err.response.data : err.message);
        // @ts-ignore
        res.status(500).json({ message: err.message });
    }
});

// Logging using Facebook
app.get('/auth/facebook', (req, res) => {
    const url = `https://www.facebook.com/v11.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=http://localhost:5000/auth/facebook/callback&scope=email`;
    res.redirect(url);
});

app.get('/auth/facebook/callback', async (req, res) => {
    const code = req.query.code as string;
    const body = {
        client_id: FB_APP_ID,
        client_secret: FB_APP_SECRET,
        redirect_uri: `http://localhost:5000/auth/facebook/callback`,
        code,
    };

    try {
        console.log('Exchanging code for access token');
        const response = await axios.get(`https://graph.facebook.com/v11.0/oauth/access_token?${qs.stringify(body)}`);
        const accessToken = response.data.access_token;
        if (!accessToken) {
            return res.status(400).json({ message: 'Access token not found' });
        }

        console.log('Fetching user data from Facebook');
        const fbUserResponse = await axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`);

        const email = fbUserResponse.data.email;
        if (!email) {
            return res.status(400).json({ message: 'Email not found from Facebook account' });
        }

        let user = await User.findOne({ where: { facebookId: fbUserResponse.data.id } });
        if (!user) {
            user = await User.create({ email, facebookId: fbUserResponse.data.id });
        }

        const token = generateToken(user);
        res.redirect(`${REDIRECT_URI}/?token=${token}`);
    } catch (err) {
        // @ts-ignore
        console.error('Error during Facebook callback processing:', err.response ? err.response.data : err.message);
        // @ts-ignore
        res.status(500).json({ message: err.message });
    }
});

app.post('/forgot-password', async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const resetToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
        const html = `
            Hello,
            We received a request to reset your password. If you didn't make the request, just ignore this email. Otherwise, you can reset your password using this link:
            ${resetUrl}
            Please note that this link is only valid for the next 60 minutes.
            If you're having trouble clicking the password reset link, copy and paste the URL into your web browser.
            If you have any issues or questions, please contact our support team.
            
            Best regards,
            Web-plemiona
        `;
        await sendMail(user.email, 'Web-plemiona: Password reset', html);
        res.status(200).json({ message: 'Password reset link sent to your email' });
    } catch (error) {
        console.error('Error sending reset link:', error);
        res.status(500).json({ message: 'Error sending reset link' });
    }
});

app.post('/reset-password/:token', async (req: Request, res: Response) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
        const user = await User.findOne({ where: { id: decoded.userId } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        res.status(200).json({ message: 'Password reset successfully', success: true });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Error resetting password' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
