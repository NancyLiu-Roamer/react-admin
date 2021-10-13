import React from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import { Route, Switch, Redirect } from 'react-router-dom'
import Home from './home/Home'
import UserList from './user-manager/UserList'
import RoleList from './right-manage/RoleList'
import RightList from './right-manage/RightList'
import NoPermission from './no-permission/NoPermission'
import { Layout } from 'antd'
import './newsSandBox.css'
const { Content } = Layout;
export default function NewsSandBox() {
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
                    <Switch>
                        <Route path='/home' component={Home}></Route>
                        <Route path='/user-manage/list' component={UserList}></Route>
                        <Route path='/user/list' component={UserList}></Route>
                        {/* <Route path='/blog/list' component={BlogList}></Route> */}
                        <Route path='/right-manage/role/list' component={RoleList}></Route>
                        <Route path='/right-manage/right/list' component={RightList}></Route>
                        <Redirect from='/' to='/home' exact></Redirect>
                        <Route path='*' component={NoPermission}></Route>
                    </Switch>
                </Content>
            </Layout>


        </Layout>


    )
}
