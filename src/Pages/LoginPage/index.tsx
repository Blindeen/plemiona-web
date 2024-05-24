import React, { useEffect, useState } from 'react';
import axios, {AxiosError} from 'axios';
import { Button, Divider, Form, Input, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { FacebookLoginButton, GithubLoginButton } from "react-social-login-buttons";

import ImageHero from "../../Components/ImageHero";
import { StyledImage } from "../../Components/CommonComponents";
import HCaptchaComponent from "./HCaptchaComponent";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginAttempts, setLoginAttempts] = useState<number>(0);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);
    const handleCaptchaVerified = (token: string | null) => {
        setCaptchaToken(token);
    };

    // Traditional logging
    const handleLogin = async () => {
        if (loginAttempts >= 3 && !captchaToken) {
            alert('Please complete the CAPTCHA');
            return;
        }

        try {
            const response = await axios.post('/login', { email, password, captchaToken});
            alert('User logged in');
            console.log(response.data);
            setLoginAttempts(0);
            navigate('/');
        }
            // @ts-ignore
        catch (error: AxiosError) {
            setLoginAttempts(prev => prev + 1);
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred');
            }
        }
    };

    // Logging through GitHub
    const handleGitHubLogin = () => {
        window.location.href = `http://localhost:5000/auth/github`;
    };

    // Logging through Facebook
    const handleFacebookLogin = () => {
        window.location.href = `http://localhost:5000/auth/facebook`;
    };

    const [form] = Form.useForm();
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    useEffect(() => {
        setIsFormValid(true);
    }, []);

    return (
        <ImageHero imageurl='/assets/backgrounds/landing-page-background.jpg'>
            <Form
                form={form}
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 20 }}
                labelAlign={'left'}
                style={{ width: '450px', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}
                initialValues={{ remember: true }}
                onFinish={handleLogin}
            >
                <div style={{ textAlign: 'center' }}>
                    <StyledImage src='/assets/logo.png' alt='logo' />
                    <Typography.Title level={3} style={{marginTop: '5px', marginBottom: '20px'}}>Login</Typography.Title>
                </div>
                <Form.Item wrapperCol={{ span: 30 }} style={{marginBottom: '3px'}}>
                    <FacebookLoginButton onClick={handleGitHubLogin}>
                        Login with Facebook
                    </FacebookLoginButton>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 30 }}>
                    <GithubLoginButton onClick={handleFacebookLogin}>
                        Login with GitHub
                    </GithubLoginButton>
                </Form.Item>
                <Form.Item
                    label="Email address"
                    name="email_address"
                    rules={[
                        { required: true, message: 'The email cannot be empty.' },
                        { type: 'email', message: 'The email must be in correct format.' },
                        { max: 255, message: 'The email must have maximum 255 characters.' }
                    ]}
                >
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        { required: true, message: 'The password cannot be empty.' },
                        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: 'The password must have minimum eight characters, at least one uppercase letter, one lowercase letter and one number.' },
                        { max: 60, message: 'The password must have maximum 60 characters.' }
                    ]}
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                {loginAttempts >= 3 && (
                    <Form.Item style={{ display: 'flex', justifyContent: 'center' }}>
                        <HCaptchaComponent onCaptchaVerified={handleCaptchaVerified} />
                    </Form.Item>
                )}
                <Form.Item wrapperCol={{ span: 30 }} style={{marginBottom: '8px'}}>
                    <Button type="primary" htmlType="submit" size={"large"} style={{ width: '100%', marginTop: '12px'}}
                            disabled={
                                !isFormValid ||
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
                                (loginAttempts >= 3 && !captchaToken)
                            }>
                        Sign in
                    </Button>
                </Form.Item>
                <Typography.Paragraph>
                    Forgot your password? <Link to="/forgot-password">Reset it here</Link>
                </Typography.Paragraph>
                <Divider style={{marginTop: '8px', marginBottom: '16px'}}></Divider>
                <Typography.Title level={5}>
                    Don't have an account? <Link to="/register">Sign up</Link>
                </Typography.Title>
            </Form>
        </ImageHero>
    );
};

export default LoginPage;
