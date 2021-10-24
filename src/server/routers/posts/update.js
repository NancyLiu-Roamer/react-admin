const express = require('express')
const router = express.Router()

const BlogModel = require('../../models/BlogModel')

router.patch('/',(req,res)=>{
    BlogModel.findOneAndUpdate({id: req.body.id}, req.body)
    .then(old => {
      const data = Object.assign(old,req.body)     
      res.send({status: 0, data})
    })
    .catch(error => {
      console.error('Unexpected Error', error)
      res.send({status: 1, msg: 'Unexpected Error'})
    })
})

module.exports = router