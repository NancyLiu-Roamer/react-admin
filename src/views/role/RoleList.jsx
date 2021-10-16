import React, { useEffect, useState } from 'react'
import { Modal, Table, Tag, Button, Tree } from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
export default function RoleList() {

    // get page data
    const [dataSource, setDataSource] = useState([])
    useEffect(() => {
        axios.get('http://localhost:3000/roles').then(
            res => {
                setDataSource(res.data)
            }
        )
        axios.get('http://localhost:3000/rights?_embed=children').then(
            res => {
                setTreeData(res.data)
            }
        )
    }, [])
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return <Tag color='pink'>{id}</Tag>
            }
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Operate',
            render: (item) => {
                return <div>
                    <Button type="primary"
                        shape="circle" icon={<DeleteOutlined />}
                        onClick={() => confirmMethod(item)} />
                    <Button type="danger"
                        shape={'circle'} icon={<EditOutlined />}
                        onClick={() => {
                            setVisible(true)
                            setCurrentRights(item.rights)
                        }} />
                </div>
            }
        }
    ]

    // about delete button
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
        setDataSource(dataSource.filter(data => {
            return data.id !== item.id
        }))
        setCurrentId(item.id)
        axios.delete(`http://localhost:3000/roles/${item.id}`)
    }

    // popup dialog
    const [isVisible, setVisible] = useState(false)
    const [treeData, setTreeData] = useState([])
    const [currentRights, setCurrentRights] = useState()
    const [currentId,setCurrentId] = useState()
    const onCheckKey = (checkedKeys) => {
        setCurrentRights(checkedKeys)
    }
    const handleOk=()=>{
        dataSource.map(item=>{
            if(item.id === currentId){
                return {...item,treeData:currentRights}
            }
            return item
        })
        setVisible(false)

    }
    return (
        <div>
            <Table dataSource={dataSource} columns={columns}
                pagination={{ pageSize: 5 }}
                rowKey={(item) => item.id}
            />
            <Modal
                title="Modal 1000px width"
                centered
                visible={isVisible}
                onOk={handleOk}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <Tree
                    checkable
                    checkedKeys={currentRights}
                    onCheck={onCheckKey}
                    treeData={treeData}
                    checkStrictly
                />
            </Modal>
        </div>
    )
}
