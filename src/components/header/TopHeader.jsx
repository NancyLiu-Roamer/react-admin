import React, { useState, useEffect } from 'react'
import { withRouter } from "react-router";
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { collapSideAction } from '../../redux/actions/collapSideAction'
import axios from 'axios';
import './header.css'
const { Header } = Layout;
const TopHeader = (props) => {

    const [isCollapsed, setCollapsed] = useState(false)
    const [weather, setWeather] = useState()
    const [date, setDate] = useState()

    const toggleSideMenu = () => {
        setCollapsed(!isCollapsed)
        props.collapSide()
    }
    const logout = () => {
        localStorage.removeItem('token')
        props.history.push('/login')
      
    }

    //logout menu
    const menu = (
        <Menu >
            <Menu.Item style={{ 'marginUp': '30px' }} key={1} onClick={logout}>
                Logout
            </Menu.Item>
        </Menu>
    )

    //get weather
    useEffect(() => {
        axios.get('http://api.openweathermap.org/data/2.5/weather?q=sydney&appid=a9af7e3e425463aed9f70a9a652288a8').then(
            res => {
                const nowWeather = res.data.weather[0].description.toUpperCase()
                setWeather(nowWeather)
            }
        )
        const day = new Date(Date.now())
        setDate(day.toDateString())
    }, [])
    return (
        <Header style={{ padding: '0 16px' }} className="site-layout-background header-wrapper" >
            <div onClick={toggleSideMenu}>
                {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <div className='header-right'>
                <span >{date}</span>
                <span >{weather}</span>
                <span> Welcom Admin Back</span>
                {/* avatar */}
                <Dropdown overlay={menu} >
                    <Avatar style={{ 'marginLeft': '20px' }} size="large" icon={<UserOutlined />}>
                        <div className="ant-dropdown-link" onClick={e => e.preventDefault()} />
                    </Avatar>
                </Dropdown>
            </div>
        </Header>

    )
}
export default connect(
    state => ({ isCollapsed: state.collapseStore }),
    { collapSide: collapSideAction }
)(withRouter(TopHeader))
