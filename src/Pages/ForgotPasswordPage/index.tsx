import React, {useEffect, useState} from 'react';
import axios, {AxiosError} from 'axios';
import ImageHero from "../../Components/ImageHero";
import {StyledImage} from "../../Components/CommonComponents";
import {Button, Divider, Form, Input, Typography} from 'antd';
import {Link} from "react-router-dom";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
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
                    <Typography.Title level={3} style={{marginTop: '5px'}}>Password reset</Typography.Title>
                    <Typography.Text strong>We will send you an email to reset your password.</Typography.Text>
                </div>
                <Form.Item
                    label="Email address"
                    name="email_address"
                    rules={[
                        {required: true, message: 'The email cannot be empty.'},
                        {type: 'email', message: 'The email must be in correct format.'},
                        { max: 255, message: 'The email must have maximum 255 characters.'}
                    ]}
                    style={{marginTop: '20px'}}
                >
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 30 }}>
                    <Button type="primary" htmlType="submit" size={"large"} style={{ width: '100%', marginTop: '12px'}}
                            disabled={
                                !isFormValid ||
                                !form.isFieldsTouched(true) ||
                                !!form.getFieldsError().filter(({ errors }) => errors.length).length
                            }>
                        Send reset password email
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

export default ForgotPasswordPage;
