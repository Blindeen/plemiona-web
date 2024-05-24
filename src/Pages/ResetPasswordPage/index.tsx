import React, {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {Button, Divider, Form, Input, Typography} from "antd";
import {StyledImage} from "../../Components/CommonComponents";
import ImageHero from "../../Components/ImageHero";

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // If there are no token in paramrs, the user is redirected to the forgot password page
    useEffect(() => {
        if (!token) {
            navigate('/forgot-password');
        }
    }, [token, navigate]);

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            alert('The password and confirmation password have to match!');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:5000/reset-password/${token}`, { password });
            alert('Password resetted');
            console.log(response.data);
            navigate('/login');
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
                autoComplete={"off"}
                onFinish={handleSubmit}
            >
                <div style={{textAlign: 'center'}}>
                    <StyledImage src='/assets/logo.png' alt='logo'/>
                    <Typography.Title level={3}
                                      style={{marginTop: '5px', marginBottom: '20px'}}>Reset you password</Typography.Title>
                </div>
                <Form.Item
                    label="New password"
                    name="new_password"
                    rules={[
                        { required: true, message: 'The password cannot be empty.' },
                        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: 'The password must have minimum eight characters, at least one uppercase letter, one lowercase letter and one number.' },
                        { max: 60, message: 'The password must have maximum 60 characters.' }
                    ]}
                >
                    <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Item>
                <Form.Item
                    label="Confirm password"
                    name="confirm_password"
                    rules={[
                        { required: true, message: 'The password cannot be empty.' },
                        { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, message: 'The password must have minimum eight characters, at least one uppercase letter, one lowercase letter and one number.' },
                        { max: 60, message: 'The password must have maximum 60 characters.' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('new_password') === value) {
                                return Promise.resolve();
                            }
                                return Promise.reject(new Error('The password and confirmation password have to match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password onChange={(e) => setConfirmPassword(e.target.value)} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 30 }}>
                    <Button type="primary" htmlType="submit" size={"large"} style={{ width: '100%', marginTop: '12px'}}
                            disabled={
                                !isFormValid ||
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }>
                        Reset password
                    </Button>
                </Form.Item>
                <Divider style={{marginTop: '8px', marginBottom: '16px'}}></Divider>
                <Typography.Title level={5}>
                    Already know your password? <Link to="/login">Go to login page</Link>
                </Typography.Title>
            </Form>
        </ImageHero>
    );
};

export default ResetPasswordPage;
