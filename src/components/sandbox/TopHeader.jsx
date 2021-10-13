import React, { useState } from 'react'
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,UserOutlined 
} from '@ant-design/icons';
const { Header } = Layout;
export default function TopHeader() {
    const [collapsed, setCollaped] = useState(false)
    const changeCollapsed = () => {
        setCollaped(!collapsed)
    }
    // menu item
    const menu =(
        <Menu >
        <Menu.Item style={{'margin-up':'20px'}}>
            Admin
        </Menu.Item>
        <Menu.Item>
            Logout
        </Menu.Item>
        </Menu>
    )
    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
            {
                collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}></MenuUnfoldOutlined> : <MenuFoldOutlined onClick={changeCollapsed} />
            }

            {/* role dispaly */}
            <div style={{ 'float': 'right' }}>
                <span>Welcom admin Back</span> 
            {/* avatar */}
            <Dropdown overlay={menu} >
                <Avatar style={{'marginLeft':'20px'}}  size="large" icon={<UserOutlined />}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()} />    
                </Avatar>
               
            </Dropdown>                
            </div>
            

        </Header>

    )
}
