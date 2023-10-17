import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const onFinish = (values: any) => {
        if (values?.username === "aa" && values?.password === 'aa') {
            console.log('Received values of form: ', values?.username);
            alert("User Logged in Succesfully!!!")
            navigate("/");
        }
        else
        alert("Incorrect Username or Password")

    };

    const navigate = useNavigate();

    interface login_data_format {
        username: string | null;
        password: string | null;
    }

    const [login_data, set_login_data] = useState<login_data_format>({
        username: null,
        password: null
    });

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', border: '2px solid #000', flexDirection: 'column' }}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} 
                    value={login_data.username || ''}
                    onChange={(e) => set_login_data({ ...login_data, username: e.target.value })}
               
                    placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        value={login_data.password || ''}
                        onChange={(e) => set_login_data({ ...login_data, password: e.target.value })}
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="">
                        Forgot password
                    </a>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" >
                        Log in
                    </Button>
                    ‎  Or <a href="/">Register </a>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;