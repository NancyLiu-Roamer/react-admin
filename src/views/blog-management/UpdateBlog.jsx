import React, { useState, useEffect, useRef } from 'react'
import {
    Form, Button, Upload, Input, Checkbox,
    Row, Col, notification
} from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import BlogEditor from '../../components/BlogEditor';

export default function UpdateBlog(props) {

    const [tagList, setTags] = useState([])
    const [blogContent, setBlogContent] = useState()
    
    const formRef = useRef()

    //config tag list
    useEffect(() => {
        axios.get('http://localhost:3000/taglist').then(
            res => {
                setTags(res.data)
            }
        )
    }, [])

    //set prefilled content
    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${props.match.params.id}`).then(
            res => {
                const { title, tags, blog } = res.data
                formRef.current.setFieldsValue(
                    {
                        title: title,
                        tag: tags
                    }
                )              
                setBlogContent(blog)
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
    const onFinish = (fieldsValue) => {
        const values = {
            'title': fieldsValue.title,
            'tags': fieldsValue.tag,
            'blog': blogContent,
            'status': 1
        }
        axios.patch(`http://localhost:3000/posts/${props.match.params.id}`, { ...values }).then(
            res => {
                notification.info({
                    message: ``,
                    description:
                        'Successfully Updated',
                    placement: 'topRight'
                });
                props.history.push(`/blog-management/preview/${props.match.params.id}`)
            }
        )
    }
    const onCancle = () => {
        props.history.goBack()
    }

    return (
        <div>
            <h2>Update Blog</h2>
            <Form
                labelCol={{ span: 1}}
                wrapperCol={{ span: 18 }}
                onFinish={onFinish}
                ref={formRef}
            >
                {/* title */}
                <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                {/* tag */}
                <Form.Item name="tag" label="Tag" rules={[{ required: true }]} >
                    <Checkbox.Group >
                        <Row>
                            {tagList.map(item =>
                                <Col key={item.id}>
                                    <Checkbox value={item.id}
                                        style={{ lineHeight: '32px' }}
                                    >
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
                    }} content={blogContent} />
                </Form.Item>

                {/* button */}
                <Form.Item
                    wrapperCol={{
                        span: 12,
                        offset:8
                    }}
                >
                    <Button type="primary" htmlType="submit" style={{marginRight:'20px'}}>
                        Submit
                    </Button>
                    <Button type="primary" onClick={onCancle}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}