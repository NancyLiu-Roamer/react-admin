const express = require('express')
const router = express.Router()

const UserModel = require('../../models/UserModel')
const RoleModel = require('../../models/RoleModel')


// 获取所有用户列表
router.get('/', (req, res) => {
    UserModel.find({username: {'$ne': 'admin'}})
      .then(users => {
        RoleModel.find().then(roles => {
          res.send({status: 0, data: {users, roles}})
        })
      })
      .catch(error => {
        console.error('获取用户列表异常', error)
        res.send({status: 1, msg: '获取用户列表异常, 请重新尝试'})
      })
  })  
module.exports = router