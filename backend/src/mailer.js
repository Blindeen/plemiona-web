const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendMail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
