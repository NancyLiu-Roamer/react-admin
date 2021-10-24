const express = require('express')
const router = express.Router()

const UserModel = require('../../models/UserModel')

// login
router.post('/', (req, res) => {  
    const {username, password} = req.body
    UserModel.findOne({username, password})
    .then(user => {
      if (user) { 
        // successfully login
        res.cookie('userid', user._id, {maxAge: 1000 * 60 * 60 * 24})
        res.send({status: 0, data: user})
      } else {// login failed
        res.send({status: 1, msg: 'Wrong Username and Passoword!'})
      }
    })
    .catch(error => {
      console.error('Unexpected Error', error)
      res.send({status: 1, msg: 'Unexpected Error, Please Try Again'})
    })
  })

  
module.exports = router