const express = require('express')
const router = express.Router()

const UserModel = require('../../models/UserModel')
//const RoleModel = require('../../models/RoleModel')

//update user
router.patch('/', (req, res) => {
    const user = req.query
   // console.log(user)
    UserModel.findOneAndUpdate({id:user.id}, user)
    .then(oldUser => {
    const data = Object.assign(oldUser, user)
      res.send({status: 0,data})
    })
    .catch(error => {
      console.error('Unexpected Error', error)
      res.send({status: 1, msg: 'Unexpected Error'})
    })
})
module.exports = router