const express = require('express')
const router = express.Router()

//const rolelist = require('./roles')
const userlist = require('./users')
const updateUser = require('./update')
const deleteUser = require('./delete')
const addUser = require('./add')

//router.use('/rolelist',rolelist) 
router.use('/userlist',userlist)
router.use('/update',updateUser)
router.use('/delete',deleteUser)
router.use('/create',addUser)
module.exports = router