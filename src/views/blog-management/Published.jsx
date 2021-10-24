import React, { useEffect, useState } from 'react'
import { Modal, Table, Button, Tag } from 'antd'
import { EyeTwoTone, ExclamationCircleOutlined,DownloadOutlined} from '@ant-design/icons'
import { reqBlog } from '../../api/blog'
import { updateBlog } from '../../api/blog'
export default function Published(props) {
    const [blogList, setBlogList] = useState([])
    useEffect(() => {
        const fetchData = async()=>{
            const response = await reqBlog({status:2})
            setBlogList(response.data.data.blogs)
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
    //archive blog
    const arcBlog = async (item)=>{
        const response = await updateBlog({id:item.id,status:3})
        if(response.data.status===0){
        }
    }

    // remove blog from online
    const onRemove = (item)=>{
        Modal.confirm({
            title: 'Do you want to archive this blog?',
            icon: <ExclamationCircleOutlined />,
            okText: 'OK',
            onOk() {
               arcBlog(item)
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
