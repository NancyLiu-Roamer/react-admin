import React, { useEffect, useState } from 'react'

import { BrowserRouter, Route, Switch, Redirect, useLocation } from 'react-router-dom'
import User from '../views/user/UserList'
import Role from '../views/role/RoleList'
import Product from '../views/product/Products'
import Order from '../views/order/Order'
import ProductCategory from '../views/product/ProductCategory'
import NoPermission from '../views/no-permission/NoPermission'
import SideMenu from '../components/side/SideMenu'
import TopHeader from '../components/TopHeader'
import Home from '../views/home/Home'
import { Layout } from 'antd'
const { Content } = Layout;

export default function IndexRouter(props) {
    // const location = useLocation();
    const [menu, setMenu] = useState()
    // useEffect(() => {
    //     setMenu(localStorage.getItem('_user'))
    // }, [])
    return (
        <Layout>
            <SideMenu />
            <Layout className="site-layout">
                <TopHeader />
                <Content className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    <BrowserRouter>
                        <Switch>
                            <Route path='/home' component={Home}></Route>
                            <Route path='/user' component={User}></Route>
                            <Route path='/role' component={Role}></Route>
                            <Route path='/order' component={Order}></Route>
                            <Route path='/products/category' component={ProductCategory}></Route>
                            <Route path='/products/product' component={Product}></Route>
                            <Redirect from='/' to='/home' exact />
                            <Route path='*' component={NoPermission}></Route>
                            
                        </Switch>
                    </BrowserRouter>
                </Content>
            </Layout>
        </Layout>




    )
}
