const express = require('express')
const router = express.Router()
const CategoryModel  = require('../../models/CategoryModel')

router.get('/',(req,res)=>{
    console.log(req.body)
    CategoryModel.find({cat_level:{$lte:1}}).limit(100)
    .then(categories => {
      res.send({status: 0, data: categories})
    })
    .catch(error => {
      console.error('获取分类列表异常', error)
      res.send({status: 1, msg: '获取分类列表异常, 请重新尝试'})
    })
})

module.exports = router