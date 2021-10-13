import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './sideMenu.css'
import axios from 'axios';
const { Sider } = Layout;
const { SubMenu } = Menu;

function SideMenu(props) {

  // get menu list
  const [menu, setMenu] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/rights?_embed=children').then(
      res => { setMenu(res.data) }
    )
  }, [])

  //home page menu permission
  const checkPermission = (item) => {
    return item.permission === 1
  }
  const renderMenu = (menu) => {
    return menu.map(item => {
      // add '?' if item.children is not undefined
      if (item.children?.length > 0 && checkPermission(item)) {
        return <SubMenu key={item.key}
          title={item.title}
          onClick={() => {
            props.history.push(item.key)
          }}>
          {renderMenu(item.children)}
          
        </SubMenu>
      }
      return checkPermission(item) && <Menu.Item key={item.key}
        onClick={() => {
          props.history.push(item.key)
        }}>{item.title}</Menu.Item>
    })
  }
  
 //set default opened menu
  const selectKeys = [props.location.pathname]
  const openKeys = ['/'+ props.location.pathname.split('/')[1]]

    return (
      <Sider trigger={null} collapsible collapsed={false} >

        {/* side menu title */}
        <div className="logo">News</div>

        {/* side menu */}
        <Menu theme="dark" mode="inline" 
        defaultOpenKeys={openKeys} 
        defaultSelectedKeys={selectKeys}>
          {renderMenu(menu)}
        </Menu>

      </Sider>
    )
  }

export default withRouter(SideMenu)