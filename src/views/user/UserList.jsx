import React, { useState, useEffect, useRef } from 'react'
import { Modal, Table, Button, Switch, } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import UserForm from '../../components/UserForm'
import { useLocation } from 'react-router'
import { reqUserList } from '../../api/user/user'
import { deleteUser } from '../../api/user/user'
import { updateUser } from '../../api/user/user'
import { createUser } from '../../api/user/user'

export default function UserList() {
    const [dataSource, setdataSource] = useState([])
    //form ref
    const formRef = useRef(null)
    const editFormRef = useRef()

    // edit user form visibility
    const [visible, setVisible] = useState(false);
    const [editFormVisible, setEditFormVisible] = useState(false);
    const [currentProcessItem, setCurrentProcessItem] = useState()

    // get all users
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await reqUserList({})
                const response = res.data.data.users
                setdataSource(response)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])

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
            dataIndex: 'roleId',
            render: (roleId) => (
                roleId === 1 ? 'Admin' : roleId === 2 ? 'Manager' : 'User'
            )
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
        const fetchData = async () => {
            try {
                const res = await deleteUser(item.id)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }

    //change role status
    const handleRoleStatus = (status, item) => {
        const fetchData = async () => {
            try {
                const res = await updateUser({ id: item.id, status: !status })
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }

    //edit user
    const editUser = (item) => {
        setEditFormVisible(true)
        setCurrentProcessItem(item)
        //change async to sync
        setTimeout(() => {
            editFormRef.current.setFieldsValue(item)
        }, 0)

    }
    const onUpdate = async (values) => {
        const temData = {
            id: currentProcessItem.id,
            username: values.username,
            password: values.password,
            email: values.email,
            roleId: values.roleId

        }
        try {
            const res = await updateUser(temData)
            setEditFormVisible(false);
            setdataSource([...dataSource, temData])
        } catch (e) {
            console.log(e)
        }
    }
    //create new user
    const onCreate = async (values) => {
        const temData = {
            id: Date.now(),
            username: values.username,
            password: values.password,
            email: values.email,
            status: true,
            roleId: values.roleId
        }
        try {
            const res = await createUser(temData)
            const response = res.data.data
            setVisible(false);
            setdataSource([...dataSource, temData])
        } catch (e) {
            console.log(e)
        }
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

