import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal, Table, Button, Tag } from 'antd'
import { DeleteTwoTone, EditOutlined, EyeTwoTone, 
    ExclamationCircleOutlined,CloudUploadOutlined} from '@ant-design/icons'

export default function Draft(props) {
    const [blogList, setBlogList] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/posts/?status_lte=1').then(
            res => {
                setBlogList(res.data)
            }
        )
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
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
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
            status === 0 ? 'Draft' : status === 1 ?
            'Archived' : 'Online' 
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
                        shape={'circle'} icon={<EditOutlined/>}
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
                        onClick={() => { onPublish(item)}}
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
    const deleteMethod = (item) => {
        console.log(item)
        axios.delete(`http://localhost:3000/posts/${item.id}`).then(
            res => {
                console.log(res.data)
            }
        )
    }

    // publish blog
    const onPublish = (item)=>{
        Modal.confirm({
            title: 'Do you want to publish this blog ?',
            icon: <ExclamationCircleOutlined />,
            okText: 'OK',
            onOk() {
                axios.patch(`http://localhost:3000/posts/${item.id}`,{
                    status:2
                }).then(res=>{console.log(res.data)})
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
