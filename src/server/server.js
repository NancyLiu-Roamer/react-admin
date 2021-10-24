const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser());
const mongoose = require('mongoose')
const login  = require('./routers/login/login') 
const users = require('./routers/users/index')
const blogs = require('./routers/posts/index')
const tags = require('./routers/tags/index')

// connect db by mongoose
mongoose.connect('mongodb://localhost/react-admin')
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
app.use('/users',users)
app.use('/posts',blogs)
app.use('/tags',tags)


