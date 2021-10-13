import React from 'react'
import {BrowserRouter,Route,Switch,Redirect } from 'react-router-dom'
import Login from '../views/login/Login.jsx'
import NewsSandBox from '../views/sandbox/NewsSandBox.jsx'
export default function IndexRouter() {
    return (       
       <BrowserRouter>
            <Switch>
                <Route path='/login' component = {Login} />
                <Route path='/' render={()=>{ 
                    return localStorage.getItem('token')?<NewsSandBox />:<Redirect to='/login' />
                }}/>
            </Switch>
        </BrowserRouter>

       
    )
}
