const express = require('express')
const router = express.Router()

const UserModel = require('../../models/UserModel')
//const RoleModel = require('../../models/RoleModel')

//delete user
router.delete('/', (req, res) => {
    const {id} = req.body
    UserModel.deleteOne({id: id})
      .then((doc) => {
        res.send({status: 0})
      })
})
module.exports = router