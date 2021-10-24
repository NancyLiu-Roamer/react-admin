import React, { useState, useEffect, useRef } from 'react'
import {
    Form, Button, Upload, Input, Checkbox,
    Row, Col, notification
} from 'antd'
import { DatePicker } from 'antd';
import axios from 'axios';
import BlogEditor from '../../components/BlogEditor';
import './create.css'
import { createBlog } from '../../api/blog';
export default function Create(props) {

    const [tags, setTags] = useState([])
    const [blogContent, setBlogContent] = useState()
    const formRef = useRef()

    //config tag list
    useEffect(() => {
        axios.get('/tags').then(
            res => {
                setTags(res.data.data.tag)
            }
        )
    }, [])

    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };

    // collect form data
    const onFinish = async (fieldsValue) => {
        const values = {
            'date': fieldsValue['date-picker'].format('MMMM Do YYYY'),
            'title': fieldsValue.title,
            'tags': fieldsValue.tag,
            'blog': blogContent,
            'status': 1,
            'id': Date.now()
            //'image':fieldsValue.image
        }
        try {
            const response = await createBlog({ ...values })
            notification.info({
                message: ``,
                description:
                    'Successfully Submitted',
                placement: 'topRight'
            });
            props.history.push('/blog-management/draft')
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2>Create New Blog</h2>

            <Form
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 20 }}
                onFinish={onFinish}
                ref={formRef}
            >
                {/* title */}
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                {/* tag */}
                <Form.Item name="tag" label="Tag" rules={[{ required: true }]}>
                    <Checkbox.Group>
                        <Row>
                            {tags.map(item =>
                                <Col key={item.id}>
                                    <Checkbox value={item.id} style={{ lineHeight: '32px' }}>
                                        {item.name}
                                    </Checkbox>
                                </Col>)}
                        </Row>
                    </Checkbox.Group>
                </Form.Item>

                {/* blog content */}
                <Form.Item name="blogContent" label="Blog">
                    <BlogEditor collectBlog={(value) => {
                        setBlogContent(value)
                    }} />
                </Form.Item>

                {/* date */}
                <Form.Item name="date-picker" label="Date">
                    <DatePicker format="YYYY-MM-DD" />
                </Form.Item>

                {/* button */}
                <Form.Item
                    wrapperCol={{
                        span: 12
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}