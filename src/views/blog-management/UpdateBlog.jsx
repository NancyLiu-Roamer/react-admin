import React, { useState, useEffect, useRef } from 'react'
import {
    Form, Button, Upload, Input, Checkbox,
    Row, Col, notification
} from 'antd'
import { UploadOutlined} from '@ant-design/icons';
import axios from 'axios';
import BlogEditor from '../../components/BlogEditor';

export default function UpdateBlog(props) {

    const [tags, setTags] = useState([])
    const [blogContent, setBlogContent] = useState()
    // const [formContent,setFormContent] = useState()
    const formRef = useRef()

    //config tag list
    useEffect(() => {
        axios.get('http://localhost:3000/tagList').then(
            res => {
                setTags(res.data)
            }
        )
    }, [tags])

    //set prefilled content
    useEffect(() => {
    axios.get(`http://localhost:3000/posts/${props.match.params.id}`).then(
        res=>{
            const {title,tags,blog} = res.data
            formRef.current.setFieldsValue(
                {
                    title:title,
                    tags:tags,
                }
            )
            setBlogContent(blog)
        }
    )
       
    },[blogContent])

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
            'title':fieldsValue.title,
            'tags':fieldsValue.tag,
            'blog':blogContent,
            'status':0
        }
        axios.patch(`http://localhost:3000/posts/${props.match.params.id}`,{...values}).then(
            res=>{
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

    return (
        <div>
            <h2>Update Blog</h2>
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
                                    <Checkbox value={item.name} 
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
                        }} content = {blogContent}/>
                </Form.Item>

                {/* img */}
                <Form.Item
                    name="image"
                    label="Image"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                >
                    <Upload name="image" action="/upload.do" listType="picture">
                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                    </Upload>
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