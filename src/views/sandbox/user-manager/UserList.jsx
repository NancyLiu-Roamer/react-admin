import React, { useState, useEffect } from 'react'
import { Modal, Table, Button, Switch, } from 'antd'
import { Form } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import UserForm from '../../../components/UserForm'


export default function UserList() {

    const [dataSource, setdataSource] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3000/users').then(
            res => {
                const list = res.data
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
            title: 'Region',
            dataIndex: 'region',
        },
        {
            title: 'role',
            dataIndex: 'roleId',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            // render: (key) => {
            //     return <Tag color='pink'>{key}</Tag>
            // }
        },
        {
            title: 'Status',
            dataIndex: 'roleStatus',
            render: (roleStatus) => {
                return <Switch checked={roleStatus}
                // onChange={changeStatus} 
                />

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

    const [visible, setVisible] = useState(false);
    const onCreate = (values) => {
        // axios.post('',)
        console.log('Received values of form: ', values);
        setVisible(false);
    };
    return (
        <div>
            <Button type="primary" onClick={() => {
                setVisible(true);
            }}>ADD</Button>

                <UserForm 
                        visible={visible}
                        onCreate={onCreate}
                        onCancel={() => {
                          setVisible(false);
                        }}/>

            <Table dataSource={dataSource} columns={columns}
                pagination={{ pageSize: 5 }}
                rowKey={(item) => item.id}
            />
        </div>
    )
}
