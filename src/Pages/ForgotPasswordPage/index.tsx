import React, { useState } from 'react';
import axios, {AxiosError} from 'axios';
import ImageHero from "../../Components/ImageHero";
import {StyledImage} from "../../Components/CommonComponents";
import {Button, Form, Input, Typography} from 'antd';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/forgot-password', { email });
            alert('Password reset email sent');
            console.log(response.data);
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
                onFinish={handleSubmit}
            >
                <div style={{ textAlign: 'center' }}>
                    <StyledImage src='/assets/logo.png' alt='logo' />
                    <Typography.Title level={3} style={{ marginTop: '5px' }}>Forgot password</Typography.Title>
                </div>
                <Form.Item
                    label="Email address"
                    name="email"
                    rules={[
                        { required: true, message: 'The email cannot be empty.' },
                        { type: 'email', message: 'The email must be in correct format.' },
                        { max: 255, message: 'The email must have maximum 255 characters.' }
                    ]}
                >
                    <Input onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 30 }} style={{marginBottom: '8px'}}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Send reset password email
                    </Button>
                </Form.Item>
            </Form>
        </ImageHero>
    );
};

export default ForgotPasswordPage;
