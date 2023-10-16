import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import {AutoComplete, Select,} from 'antd';

const AddCharityForm: React.FC = () => {
    const { Option } = Select;

    interface charity_data_format {
        username: string | null;
        email: string | null;
        phonenumber: number | null;
        category: string | null;
        intro: string | null;
        website: string | null;
        donationlink: string | null;
        password: string | null;
    }

    const [charity_data, set_charity_data] = useState<charity_data_format>({
        username: null,
        email: null,
        phonenumber: null,
        category: null,
        intro: null,
        website: null,
        donationlink: null,
        password: null
    });

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        fetch('https://652cc3a0d0d1df5273efa6e4.mockapi.io/charity', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(charity_data)
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).catch(error => {
            alert("Error with registering user :"+ error)
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select style={{ width: 70 }}>
                <Option value="91">+91</Option>
                <Option value="1">+1</Option>
            </Select>
        </Form.Item>
    );

    const onWebsiteChange = (value: string) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
        }
    };
    const [autoCompleteResult, setAutoCompleteResult] = useState<string[]>([]);
    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));

    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 20 }}
                style={{ maxWidth: 700, paddingTop: '1rem' }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="Organisation Name"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input
                        name="username"
                        placeholder="Enter your unique name"
                        value={charity_data.username || ''}
                        onChange={(e) => set_charity_data({ ...charity_data, username: e.target.value })}
               
                    />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="E-mail"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input
                        name="email"
                        placeholder="Enter your valid Email Id"
                        value={charity_data.email || ''}
                        onChange={(e) => set_charity_data({ ...charity_data, email: e.target.value })}
                    />
                </Form.Item>


                <Form.Item
                    label="City"
                    name='city'
                    rules={[{ required: true, message: 'Please input your City!' }]}
                >
                    <Input placeholder="Enter your City"/>
                </Form.Item>

                <Form.Item
                    label="Country"
                    name='country'
                    rules={[{ required: true, message: 'Please input your country!' }]}
                >
                    <Input placeholder="Enter your country"/>
                </Form.Item>

                <Form.Item
                    name="phone"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' },
                    { pattern: /^\d{10}$/, message: 'Please enter a 10-digit phone number!' }]}
                >
                    <Input addonBefore={prefixSelector} style={{ width: '100%' }}
                        name="phonenumber"
                        placeholder="Enter your 10 digit number"
                        value={charity_data.phonenumber || ''}
                        onChange={(e) => set_charity_data({ ...charity_data, phonenumber: parseInt(e.target.value, 10) || null })}
                    />
                </Form.Item>

                <Form.Item
                    name="Category"
                    label="Category"
                    rules={[{ required: true, message: 'Please select Category!' }]}
                >
                    <Select
                        placeholder="Select your Category"
                        onChange={(value) => set_charity_data({ ...charity_data, category: value })}
                    >
                        <Option value="Charitable">Charitable</Option>
                        <Option value="Non-Charitable">Non-Charitable</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="intro"
                    label="Intro"
                    rules={[{ required: true, message: 'Please input Intro' }]}
                >
                    <Input.TextArea showCount maxLength={250} name="intro"
                    placeholder='Tell the people about your organisation!!'
                        value={charity_data.intro || ''}
                        onChange={(e) => set_charity_data({ ...charity_data, intro: e.target.value })} />
                </Form.Item>

                <Form.Item
                    name="website"
                    label="Website"
                    rules={[{ message: 'Please input website!' }]}
                >
                    <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
                        <Input name="website"
                            value={charity_data.website || ''}
                            onChange={(e) => set_charity_data({ ...charity_data, website: e.target.value })} />
                    </AutoComplete>
                </Form.Item>


                <Form.Item
                    label="Donation Link"
                    name="website2"
                    rules={[{ message: 'Please input website through which user can donate!' }]}
                >
                    <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
                        <Input name="donationlink"
                            value={charity_data.donationlink || ''}
                            onChange={(e) => set_charity_data({ ...charity_data, donationlink: e.target.value })} />
                    </AutoComplete>
                </Form.Item>


                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password name="password"
                        value={charity_data.password || ''}
                        onChange={(e) => set_charity_data({ ...charity_data, password: e.target.value })} />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
export default AddCharityForm