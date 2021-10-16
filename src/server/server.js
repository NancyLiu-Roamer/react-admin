const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser());

const login  = require('./routers/login/login') 
const products = require('./routers/products/index')
const userList = require('./routers/users/users')
const mongoose = require('mongoose')

// connect db by mongoose
mongoose.connect('mongodb://localhost/server_db2')
  .then(() => {
    console.log('db success!!!')
    // listen 5000 only when database connected successfully
    app.listen('5000', () => {
      console.log('port 5000 is ready')
    })
  })
  .catch(error => {
    console.error('db failed', error)
  })

//route module
app.use('/login',login)
app.use('/products',products)
app.use('/userlist',userList)


