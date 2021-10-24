import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal, Table, Button, Tag } from 'antd'
import {
    DeleteTwoTone, EditOutlined, EyeTwoTone,
    ExclamationCircleOutlined, CloudUploadOutlined
} from '@ant-design/icons'
import { reqBlog } from '../../api/blog'
import { deleteBlog } from '../../api/blog'
import { updateBlog } from '../../api/blog'
export default function Draft(props) {
    const [blogList, setBlogList] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await reqBlog({})
            const temp = response.data.data.blogs
            setBlogList(temp.filter(item => { return item.status != 2 }))
        }
        fetchData()
    }, [])

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            render: tags => (
                <span>
                    {tags.map(tag => {
                        let color = tag > 2 ? 'geekblue' : 'green';
                        return (
                            <Tag color={color} key={tag}>
                                {tag === 1 ? 'Vue' : tag === 2 ? 'React' : 'NodeJS'}
                            </Tag>
                        );
                    })}
                </span>
            )
        },
        {
            title: 'Date',
            dataIndex: 'date',
        },

        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) =>
                status === 1 ? 'Draft' : status === 2 ?
                    'Active' : 'Archived'
        },
        {
            title: 'Operate',
            render: (item) => {
                return <div>
                    <Button
                        shape="circle" icon={<DeleteTwoTone />}
                        onClick={() => confirmDelete(item)}
                    />
                    <Button
                        shape={'circle'} icon={<EditOutlined />}
                        onClick={() => {
                            props.history.push({
                                pathname: `/blog-management/edit/${item.id}`,
                                state: { item: item }
                            })
                        }}
                    />
                    <Button
                        shape={'circle'} icon={<EyeTwoTone />}
                        onClick={() => {
                            props.history.push({
                                pathname: `/blog-management/preview/${item.id}`,
                                state: { item: item }
                            })
                        }}
                    />
                    <Button
                        shape={'circle'} icon={<CloudUploadOutlined />}
                        onClick={() => { onPublish(item) }}
                    />
                </div>
            }
        }
    ]
    // delete button function
    const confirmDelete = (item) => {
        Modal.confirm({
            title: 'Do you want to delete ?',
            icon: <ExclamationCircleOutlined />,
            okText: 'OK',
            onOk() {
                deleteMethod(item)
            },
            cancelText: 'Cancel',
        });
    }
    const deleteMethod = async (item) => {
        const response = await deleteBlog(item.id)
        setBlogList(blogList)
    }
    //publish blog
    const publishBlog = async (item) => {
        const response = await updateBlog({ id: item.id, status: 2 })
    }

    // publish blog
    const onPublish = (item) => {
        Modal.confirm({
            title: 'Do you want to publish this blog ?',
            icon: <ExclamationCircleOutlined />,
            okText: 'OK',
            onOk() {
                publishBlog(item)
            },
            cancelText: 'Cancel',
        });
    }


    return (
        <Table dataSource={blogList} columns={columns}
            pagination={{ pageSize: 5 }}
            rowKey='id'
        />
    )
}
