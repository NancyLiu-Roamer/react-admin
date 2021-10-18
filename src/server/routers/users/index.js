const express = require('express')
const router = express.Router()
const rolelist = require('./roles')
const userlist = require('./users')
router.use('/rolelist',rolelist) 
router.use('/userlist',userlist)
module.exports = router