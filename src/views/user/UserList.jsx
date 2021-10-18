import React, { useState, useEffect, useRef } from 'react'
import { Modal, Table, Button, Switch, } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import UserForm from '../../components/UserForm'
import { useLocation } from 'react-router'
export default function UserList() {
    const [dataSource, setdataSource] = useState([])
    const location = useLocation()

    // edit user form visibility
    const [visible, setVisible] = useState(false);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [currentProcessItem,setCurrentProcessItem] = useState()
    // get all users
    useEffect(() => {
        axios.get('http://localhost:3000/users').then(
            res => {
                setdataSource(res.data)
            }
        )
    }, [location])

    //form ref
    const formRef = useRef(null)
    const editFormRef = useRef()

    // set table head
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },

        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, item) => {
                return (<Switch
                    defaultChecked={status}
                    onChange={() => handleRoleStatus(status, item)}
                />)
            }
        },
        {
            title: 'Operate',
            render: (item) => {
                return <div>
                    <Button type="primary"
                        shape="circle" icon={<DeleteOutlined />}
                        onClick={() => confirmDelete(item)}
                    />
                    <Button type="danger"
                        shape={'circle'} icon={<EditOutlined />}
                        onClick={() => editUser(item)}
                    />
                </div>
            }
        }

    ]

    // delete button function
    const confirmDelete = (item) => {
        Modal.confirm({
            title: 'Do you want do delete this user ?',
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
        axios.delete(`http://localhost:3000/users/${item.id}`).then(
            res => {
                console.log(res.data)
                //??? refresh for now need server res.data
                setdataSource([...dataSource, res.data])
            }
        )
    }


    //change role status
    const handleRoleStatus = (status, item) => {
        axios.patch(`http://localhost:3000/users/${item.id}`, {
            status: !status
        }).then(
            res => {
                setdataSource([...dataSource])
            })
    }

    //edit user
    const editUser = (item) => {
        setEditFormVisible(true)
        console.log(item)
        setCurrentProcessItem(item)
        //change async to sync
        setTimeout(()=>{
            editFormRef.current.setFieldsValue(item)
        },0)
        
    }
    const onUpdate = (values)=>{
        const temData = {
            username: values.username,
            password: values.password,
            email: values.email,
            status: true,
            roleId: values.role === 'manager' ? 1 :
                values.role === 'user' ? 2 : 3
        }
        axios.patch(`http://localhost:3000/users/${currentProcessItem.id}`, temData)
        setEditFormVisible(false);
        setdataSource([...dataSource, temData])
    }
        //create new user
        const onCreate = (values) => {
            const temData = {
                username: values.username,
                password: values.password,
                email: values.email,
                status: true,
                roleId: values.role === 'manager' ? 1 :
                    values.role === 'user' ? 2 : 3
            }
            axios.post('http://localhost:3000/users', temData)
            setVisible(false);
            setdataSource([...dataSource, temData])
        };
    
    return (
        <div>
            <Button type="primary" onClick={() => {
                setVisible(true);
            }}>ADD</Button>

            {/* create userform */}
            <Modal
                visible={visible}
                title="Create New User"
                okText="Create"
                cancelText="Cancel"
                onCancel={() => {
                    formRef.current.resetFields();
                    setVisible(false);
                }}
                onOk={() => {
                    formRef.current.validateFields()
                        .then((values) => {
                            //  send data to userlist
                            onCreate(values);
                            formRef.current.resetFields();
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <UserForm
                    visible={visible}
                    ref={formRef} />
            </Modal>

            {/* update user form  */}
            <Modal
                visible={editFormVisible}
                title="Edit User"
                okText="Submit"
                cancelText="Cancel"
                onCancel={() => {
                    editFormRef.current.resetFields();
                    setEditFormVisible(false);
                }}
                onOk={() => {                                                    
                    editFormRef.current.validateFields()
                        .then((values) => {
                            //  send data to userlist
                            onUpdate(values)
                            formRef.current.resetFields();
                            setEditFormVisible(false);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
                >
                <UserForm
                    visible={editFormVisible}
                    ref={editFormRef} />
            </Modal>

            {/* table */}
            <Table dataSource={dataSource} columns={columns}
                pagination={{ pageSize: 5 }}
                rowKey='id'
            />
        </div>
    )
}

