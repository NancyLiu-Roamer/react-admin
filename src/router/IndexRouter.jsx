import React from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import './index-router.css'
import Users from '../views/user/UserList'
import NoPermission from '../views/no-permission/NoPermission'
import SideMenu from '../components/side/SideMenu'
import TopHeader from '../components/header/TopHeader'
import Home from '../views/home/Home'
import CreateBlog from '../views/create-blog/create'
import Posts from '../views/posts/Posts'
import Draft from '../views/blog-management/Draft.jsx'
import Published from '../views/blog-management/Published'
import Preview from '../views/blog-management/preview/Preview'
import UpdateBlog from '../views/blog-management/UpdateBlog'
import { connect } from 'react-redux'
const { Header, Content } = Layout;
const IndexRouter = (props) => {
    return (
        <Layout >
            <SideMenu />
            {/* </Sider> */}
            <Layout className="site-layout" >
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <TopHeader />
                </Header>
                <Spin spinning={props.isLoading} >
                    <Content className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            height: '100%',

                        }}
                    >
                        <HashRouter>
                            <Switch>
                                <Route path='/home' exact component={Home} ></Route>
                                <Route path='/users' exact component={Users}></Route>
                                <Route path='/create-blog' component={CreateBlog}></Route>
                                <Route path='/blog-management/draft' component={Draft}></Route>
                                <Route path='/blog-management/preview/:id' component={Preview}></Route>
                                <Route path='/blog-management/edit/:id' component={UpdateBlog}></Route>
                                <Route path='/blog-management/published' component={Published}></Route>
                                <Route path='/posts' component={Posts}></Route>
                                <Redirect from='/' to='/home' exact />
                                <Route path='*' component={NoPermission}></Route>
                            </Switch>
                        </HashRouter>
                    </Content>
                </Spin>
            </Layout>
        </Layout>
    )
}
export default connect(state => ({ isLoading: state.LoadingStore }),
    {})(IndexRouter)

