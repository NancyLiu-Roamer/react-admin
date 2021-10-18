import React, { forwardRef} from 'react'
import {Form, Input, Select } from 'antd'

// import axios from 'axios';
const UserForm = forwardRef((props, ref) => {
    const { Option } = Select
    const [form] = Form.useForm();
    return (
        <Form layout="vertical"
            form={form} 
            ref={ref}>
            <Form.Item
                name="username"
                label="User Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
                <Input.Password />
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!'
                    },

                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    })
                ]}

            >
                <Input.Password />
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
                <Input />
            </Form.Item>
            <Form.Item name="role" label='Role'>
                <Select style={{ width: 120 }} >
                    <Option value="Manager">Manager</Option>
                    <Option value="User">User</Option>
                </Select>
            </Form.Item>
        </Form>


    )
})
export default UserForm