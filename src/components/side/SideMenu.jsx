import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router";
import { useLocation,useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import './sideMenu.css'
import menuConfig from '../../utils/menuConfig';
const { SubMenu } = Menu;

function SideMenu() {
  // get menu list
  const [menuList, setMenuList] = useState([])
  // const [menuAuth, setMenuAuth] = useState([])
  let location  = useLocation()
  let history = useHistory()
 
  useEffect(() => {
    setMenuList(menuConfig)  
  }, [location])
// console.log(props,'side');
  //home page menu permission
  // const checkPermission = (item) => {
  //   return item.permission === 1
  // }

  const renderMenu = (menuList) => {
    return menuList.map(item => {
      // add '?' if item.children is not undefined
      if (item.children?.length > 0 ) {
        return <SubMenu key={item.key}
          title={item.title}
          >
          {renderMenu(item.children)}         
        </SubMenu>
      }
      return <Menu.Item key={item.key}
        onClick={() => {
         history.push(item.key)
        }}>{item.title}</Menu.Item>
    })
  }
  
 //set default opened menu
  const selectKeys = [location.pathname]
  const openKeys = ['/'+ location.pathname.split('/')[1]]

  
    return (
      <div className='side-wrapper'>
        <div className="logo">Blog Management</div>
        <Menu mode="inline" theme='dark'
        defaultOpenKeys={openKeys} 
        defaultSelectedKeys={selectKeys}>
          {renderMenu(menuList)}
        </Menu>
      </div>
    )
  }
export default withRouter(SideMenu)