import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Layout } from 'antd'
import './index-router.css'
import Users from '../views/user/UserList'
import NoPermission from '../views/no-permission/NoPermission'
import SideMenu from '../components/side/SideMenu'
import TopHeader from '../components/TopHeader'
import Home from '../views/home/Home'
import CreateBlog from '../views/create-blog/create'
import Image from '../views/image/images'
import Draft from '../views/blog-management/Draft.jsx'
import Published from '../views/blog-management/Published'
import Preview from '../views/blog-management/Preview'
import UpdateBlog from '../views/blog-management/UpdateBlog'
const { Header, Sider, Content } = Layout;
export default function IndexRouter() {
    return (
        <Layout >
            <Sider className="site-layout-background" theme='dark'>
                <SideMenu />
            </Sider>
            <Layout className="site-layout" >
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <TopHeader />
                </Header>
                <Content className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        height: '100%',
                    }}
                >
                    <HashRouter>
                        <Switch>
                            <Route path='/home'  component={Home} ></Route>
                            <Route path='/users' component={Users}></Route>
                            <Route path='/create-blog' component={CreateBlog}></Route>
                            <Route path='/blog-management/draft' component={Draft}></Route>
                            <Route path='/blog-management/preview/:id' component={Preview}></Route>
                            <Route path='/blog-management/edit/:id' component={UpdateBlog}></Route>
                            <Route path='/blog-management/published' component={Published}></Route>                 
                            <Route path='/images' component={Image}></Route>
                            <Redirect from='/' to='/home' exact />
                            <Route path='*' component={NoPermission}></Route>
                        </Switch>
                    </HashRouter>
                </Content>
            </Layout>
        </Layout>
    )
}


// {/* <Route path='/charts/bars' component={Published}></Route> */}
// {/* <Route path='/role' component={Role}></Route> */}
// {/* <Route path='/order' component={Order}></Route> */}
// /* <Route path='/products/category' component={ProductCategory}></Route> */}
// {/* <Route path='/products/product' component={Product}></Route> */}
// // import Role from '../views/role/RoleList'
// // import Product from '../views/product/Products'
// // import Order from '../views/order/Order'
// // import ProductCategory from '../views/product/ProductCategory'