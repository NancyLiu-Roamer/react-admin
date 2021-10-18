import React, { useState, useEffect } from 'react'
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import { useLocation } from 'react-router';
import axios from 'axios';
export default function TopHeader() {
    const { Header } = Layout;
    // let location = useLocation()
    // {location.state.data.username.toUpperCase()}
    const [weather, setWeather] = useState()
    const [date, setDate] = useState()
    const menu = (
        <Menu >
            <Menu.Item style={{ 'marginUp': '30px' }} key={1}>
                Logout
            </Menu.Item>
        </Menu>
    )
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
        <Header style={{ padding: '0 16px' }} className="site-layout-background" >
            <div style={{ 'float': 'right' }}>
                <span style={{ 'marginRight': '20px' }}>{date}</span>
                <span style={{ 'marginRight': '20px' }}>{weather}</span>
                <span> Welcom <span style={{ 'color': 'purple' }}>Admin</span> Back</span>
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
