import React from 'react'
import IndexRouter from './router/IndexRouter'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store, persistor  } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import Login from './views/login/Login'
import './App.css'
export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <HashRouter>
            <Switch>
            <Route path='/login' component={Login} />
            <Route path='/' render={() => {
            return localStorage.getItem('token')?<IndexRouter></IndexRouter>: <Redirect to='/login' />
            }} />
            </Switch>
            </HashRouter>
            </PersistGate>
        </Provider>
    )
}
