import React, {useEffect, useState} from 'react';
import axios, { AxiosError } from 'axios';
import {Button, Divider, Form, Input, Typography} from 'antd';
import ImageHero from "../../Components/ImageHero";
import {StyledImage} from "../../Components/CommonComponents";
import {useNavigate, Link} from "react-router-dom";


const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Registering user
    const handleRegister = async () => {
        try {
            const response = await axios.post('/register', { email, password });
            alert('Account created');
            console.log(response.data);
            // Redirect after successful creation
            navigate('/login');
        }
        // @ts-ignore
        catch (error: AxiosError) {
            console.error(error);
            if (error.response && error.response.data) {
                alert(error.response.data.message);
            } else {
                alert('An error occurred');
            }
        }
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
                name="basic"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 20 }}
                labelAlign={'left'}
                style={{ width: '450px', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}
                initialValues={{ remember: true }}
                autoComplete="off"
                onFinish={handleRegister}
            >
                <div style={{textAlign: 'center'}}>
                    <StyledImage src='/assets/logo.png' alt='logo'/>
                    <Typography.Title level={3} style={{marginTop: '5px'}}>Create an account</Typography.Title>
                </div>
                <Form.Item
                    label="Email address"
                    name="email_address"
                    rules={[
                        { required: true, message: 'The email cannot be empty.'},
                        { type: 'email', message: 'The email must be in correct format.'},
                        { max: 255, message: 'The email must have maximum 255 characters.'}
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
                    style={{marginTop: '8px'}}
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 30 }}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: '12px'}}
                            disabled={
                        !isFormValid ||
                        !form.isFieldsTouched(true) ||
                        !!form.getFieldsError().filter(({ errors }) => errors.length).length
                    }>
                        Create an account
                    </Button>
                </Form.Item>
                <Divider></Divider>
                <Typography.Title level={5} style={{marginTop: '5px'}}>
                    Already have an account? <Link to="/login">Sign in</Link>
                </Typography.Title>
            </Form>
        </ImageHero>
    );
};

export default RegisterPage;
