import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router";
import { useLocation, useHistory } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import './sideMenu.css'
import menuConfig from '../../utils/menuConfig';
import { connect } from 'react-redux';
const {Sider} = Layout;
const { SubMenu } = Menu;

function SideMenu(props) {
  // get menu list
  const [menuList, setMenuList] = useState([])
  // const [menuAuth, setMenuAuth] = useState([])
  let location = useLocation()
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
      if (item.children?.length > 0) {
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
  const openKeys = ['/' + location.pathname.split('/')[1]]

  //redux
  // const mapStateToProps = (state)=>({isCollapsed:state.collapseStore})

  return (
    <Sider className="site-layout-background" theme='dark' trigger={null}
      collapsible collapsed={props.isCollapsed}>
      <div className='side-wrapper'>
        <div className="logo">
          {props.isCollapsed ? <span></span>  : <span>Blog Management</span> }         
          </div>
        <Menu mode="inline" theme='dark'
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={selectKeys}>
          {renderMenu(menuList)}
        </Menu>
      </div>
    </Sider>

  )
}
export default connect(
  state=>({isCollapsed:state.collapseStore}),
  {}
)(withRouter(SideMenu))
