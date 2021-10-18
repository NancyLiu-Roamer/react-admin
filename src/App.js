import React from 'react'
import IndexRouter from './router/IndexRouter'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './views/login/Login'
import './App.css'
export default function App() {
    return (
        <HashRouter>
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/' render={() => {
                    return localStorage.getItem('token') ? <IndexRouter></IndexRouter> : <Redirect to='/login' />
                }} />
            </Switch>
        </HashRouter>

    )
}
