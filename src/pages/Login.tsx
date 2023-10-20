import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../components/zustand';

const Login: React.FC = () => {
    
    var loginSuccess = useStore(state => state.loginSuccess)
    const onFinish = () => {
        if (!loginSuccess){
        if (password == "asd") {
            setUsername(tempUsername)
            console.log(username)
            setLoginSuccess(true)
            navigate("/");
        }
        else
            alert("Incorrect Username or Password")
    };}

   
    
    const navigate = useNavigate();

    var username = useStore(state => state.username)
    var setUsername = useStore(state => state.setUsername)
    var setLoginSuccess = useStore(state => state.setLoginSuccess)
    const [password, setPassword] = useState<string | null>('');
    const [tempUsername, setTempUsername] = useState<string | null>('');
    

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100vh", width: '100%', border: '2px solid #000', flexDirection: 'column' }}>
            {!loginSuccess?(
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                        value={username}
                        onChange={(e) => {
                            console.log(username)
                            setTempUsername(e.target.value)
                        }}
                        placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        value={password || ''}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            console.log(password)
                        }}
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
                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => {onFinish()}}>
                        Log in
                    </Button >
                    ‎  Or <a href="/">Register </a>
                </Form.Item>
            </Form>):(
            <>
            <text>Already Logged In</text>
            <button onClick={setLoginSuccess(false)}> log out??</button>
            </>)}

        </div>
    );
};

export default Login;