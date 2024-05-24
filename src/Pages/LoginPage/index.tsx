import React, { useState } from 'react';
import axios from 'axios';
import {Button, Divider, Form, Input, Typography} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import ImageHero from "../../Components/ImageHero";
import { StyledImage } from "../../Components/CommonComponents";
import { FacebookLoginButton, GithubLoginButton } from "react-social-login-buttons";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('/login', { email, password });
            alert('Logged in');
            console.log(response.data);
            navigate('/');
        } // @ts-ignore
        catch (error: AxiosError) {
            console.error(error);
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred');
            }
        }
    };

    const handleGitHubLogin = () => {
        window.location.href = `http://localhost:5000/auth/github`;
    };
    const handleFacebookLogin = () => {
        window.location.href = `http://localhost:5000/auth/facebook`;
    };

    return (
        <ImageHero imageurl='/assets/backgrounds/landing-page-background.jpg'>
            <Form
                name="basic"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 20 }}
                labelAlign={'left'}
                style={{ width: '400px', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}
                initialValues={{ remember: true }}
                autoComplete={"off"}
                onFinish={handleLogin}
            >
                <div style={{ textAlign: 'center' }}>
                    <StyledImage src='/assets/logo.png' alt='logo' />
                    <Typography.Title level={3} style={{ marginTop: '5px' }}>Login</Typography.Title>
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
                    name="email"
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
                    style={{ marginTop: '8px' }}
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 30 }} style={{marginBottom: '8px'}}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Sign in
                    </Button>
                </Form.Item>
                <Typography.Paragraph>
                    Forgot your password? <Link to="/forgot-password">Reset it here</Link>
                </Typography.Paragraph>
                <Divider></Divider>
                <Typography.Title level={5} style={{ marginTop: '5px' }}>
                    Don't have an account? <Link to="/register">Sign up</Link>
                </Typography.Title>
            </Form>
        </ImageHero>
    );
};

export default LoginPage;
