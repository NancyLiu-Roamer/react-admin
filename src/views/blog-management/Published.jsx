import React, { useEffect, useState } from 'react'
import { Modal, Table, Button, Tag } from 'antd'
import { EyeTwoTone, ExclamationCircleOutlined,DownloadOutlined} from '@ant-design/icons'
import axios from 'axios'
export default function Published(props) {
    const [blogList, setBlogList] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/posts?status=2').then(
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
                    {/* if no tag then not mapping */}
                    {tags?.map(tag => {
                        let color = tag> 2 ? 'geekblue' : 'green';
                        return (
                            <Tag color={color} key={tag}>
                                 {tag===1?'Vue':tag===2?'React':'NodeJS'}
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
                'Active' :   'Archived'        
        },
        {
            title: 'Operate',
            render: (item) => {
                return <div>
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
                        shape={'circle'} icon={<DownloadOutlined/>}
                        onClick={() => { onRemove(item)}}
                    />
                </div>
            }
        }
    ]

    // remove blog from online
    const onRemove = (item)=>{
        Modal.confirm({
            title: 'Do you want to archive this blog?',
            icon: <ExclamationCircleOutlined />,
            okText: 'OK',
            onOk() {
                axios.patch(`http://localhost:3000/posts/${item.id}`,{
                    status:3
                }).then()
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
