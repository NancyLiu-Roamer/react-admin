import React, { useState, useEffect } from 'react'
import { Modal, Table, Tag, Button } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
export default function RightList() {

    const [dataSource, setdataSource] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:3000/rights?_embed=children').then(
            res => {
                const list = res.data
                list.forEach(item => {
                    if (item.children.length === 0) {
                        item.children = ''
                    }
                })
                setdataSource(list)
            }
        )
    }, [])

    const confirmMethod = (item) => {
        Modal.confirm({
            title: 'Do you want do delete',
            icon: <ExclamationCircleOutlined />,
            okText: 'OK',
            onOk() {
                deleteMethod(item)
            },
            cancelText: 'Cancel',
        });
    }
    const deleteMethod = (item) => {

        if (item.grad === 1) {
            setdataSource(dataSource.filter(data => {
                return data.id !== item.id
            }))
            axios.delete(`http://localhost:3000/rights/${item.id}`)

        } else {
            let list = dataSource.filter(data => data.id === item.rightId)
            list[0].children = list[0].children.filter(data => data.id !== item.id)
            setdataSource([...dataSource])
            axios.delete(`http://localhost:3000/children/${item.id}`)
        }


        setdataSource([...dataSource])
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Auth',
            dataIndex: 'title',
        },
        {
            title: 'Route',
            dataIndex: 'key',
            render: (key) => {
                return <Tag color='pink'>{key}</Tag>
            }
        },
        {
            title: 'Operate',
            render: (item) => {
                return <div>
                    <Button type="primary"
                        shape="circle" icon={<DeleteOutlined />}
                        onClick={() => confirmMethod(item)} />
                    <Button type="danger"
                        shape={'circle'} icon={<EditOutlined />} />
                </div>
            }
        }

    ]
    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                pagination={{ pageSize: 5 }}
            />
        </div>
    )
}
