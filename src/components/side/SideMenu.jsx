import React, { useEffect, useState } from 'react'
import { withRouter,useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './sideMenu.css'
import axios from 'axios';
import menuConfig from '../../utils/menuConfig';
const { Sider } = Layout;
const { SubMenu } = Menu;

function SideMenu(props) {
  // get menu list
  const [menuList, setMenuList] = useState([])
  const [menuAuth, setMenuAuth] = useState([])
  let location  = useLocation()
 
  useEffect(() => {
    setMenuList(menuConfig)
    
  }, [])
// console.log(props,'side');
  //home page menu permission
  const checkPermission = (item) => {
    return item.permission === 1
  }

  const renderMenu = (menuList) => {
    return menuList.map(item => {
      // add '?' if item.children is not undefined
      if (item.children?.length > 0 ) {
        return <SubMenu key={item.key}
          title={item.title}
          // onClick={() => {
          //   props.history.push(item.key)
          // }}
          >
          {renderMenu(item.children)}         
        </SubMenu>
      }
      return <Menu.Item key={item.key}
        onClick={() => {
          props.history.push(item.key)
        }}>{item.title}</Menu.Item>
    })
  }
  
 //set default opened menu
  const selectKeys = [location.pathname]
  const openKeys = ['/'+ location.pathname.split('/')[1]]

    return (
      <Sider theme='light'>
        {/* side menu title */}
        <div className="logo">News</div>
        {/* side menu */}
        <Menu mode="inline" 
        defaultOpenKeys={openKeys} 
        defaultSelectedKeys={selectKeys}>
          {renderMenu(menuList)}
        </Menu>
      </Sider>
    )
  }

export default withRouter(SideMenu)