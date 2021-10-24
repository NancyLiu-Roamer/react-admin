const express = require('express')
const router = express.Router()

const UserModel = require('../../models/UserModel')

// get user list
router.get('/', (req, res) => {
  const user = req.query
    UserModel.find(user)
      .then(users => {
        res.send({status: 0, data: {users}})
      })
      .catch(error => {
        console.error('Unexpected Error', error)
        res.send({status: 1, msg: 'Unexpected Error, Please Try Again'})
      })
  })  
module.exports = router