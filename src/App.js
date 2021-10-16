import React from 'react'
import IndexRouter from './router/IndexRouter'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Login from './views/login/Login'
// import Home from './views/home/Home'
import './App.css'
export default function App() { 
    return (  
        <BrowserRouter>
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/' render={() => {
                return localStorage.getItem('token') ? <IndexRouter/>  : <Redirect to='/login' />
            }} />
        </Switch>
    </BrowserRouter>
              
    )
}
