import React from 'react'
import { useHistory } from 'react-router-dom'
import './login.css'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { reqLogin } from '../../api';
export default function Login() {
    let history = useHistory()
    const onFinish = async (values) => {
        try {
            const response = await reqLogin(values)
            if (response.data.status === 0) {
                message.success('Login Successful')
                localStorage.setItem('token', 'hhh')
                localStorage.setItem('_user', response.data)
                history.push('/home')
            } else {
                message.error('Login Failed')
            }
        } catch (error) {
            console.log('wrong', error)
        }
    }
    return (
        <div className='login-total-wrapper'>
            <div className='login-logo'>Blog Management</div>
            <div className='login-wrapper'>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}>
                        <Input prefix={< UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" className="login-form-button">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>



    )
}
