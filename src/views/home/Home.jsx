import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { Layout } from 'antd'
import './home.css'
import User from '../user/UserList'
// import User from '../views/user/UserList'
import Role from '../role/RoleList'
import Product from '../product/Products'
import Order from '../order/Order'
import ProductCategory from '../product/ProductCategory'
import NoPermission from '../no-permission/NoPermission'
import SideMenu from '../../components/side/SideMenu'
import TopHeader from '../../components/TopHeader'
export default function Home(props) {
    const { Content } = Layout;
    let location = useLocation()
    
    const [user, setUser] = useState()
    useEffect(() => {
        setUser(location.state)
    }, [])
    return (
        <div>
            
        </div>
        // <Layout>
        //     {/* <SideMenu /> */}
        //     {/* <Layout className="site-layout"> */}
        //         {/* <TopHeader user={user}/> */}
        //         <Content className="site-layout-background"
        //             style={{
        //                 margin: '24px 16px',
        //                 padding: 24,
        //                 minHeight: 280,
        //             }}
        //         >
        //             {/* <BrowserRouter>
        //                 <Switch> */}
        //             {/* <Route path='/home' component={Home}></Route> */}
        //             {/* <Route path='/user' component={User}></Route> */}
        //             {/* <Route path='/role' component={Role}></Route>
        //                     <Route path='/order' component={Order}></Route>
        //                     <Route path='/products/category' component={ProductCategory}></Route>
        //                     <Route path='/products/product' component={Product}></Route>
        //                     {/* <Redirect from='/' to={'/home', { a: '1' }} exact /> */}
        //             {/* <Redirect from='/' to='/home' exact/>
        //                     <Route path='*' component={NoPermission}></Route> 
        //                 </Switch>
        //             </BrowserRouter> */}
        //         </Content>
        //     </Layout>
        // </Layout>
    )
}
