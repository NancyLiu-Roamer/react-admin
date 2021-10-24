const express = require('express')
const router = express.Router()

const BlogModel = require('../../models/BlogModel')

router.post('/',(req,res)=>{
   // console.log(req.body)
    BlogModel.create(req.body).then(
        blog=>{
            res.send({status:0,data:blog})
        }
    ).catch(
        err=>{
            console.log(err)
            res.send({status:0,msg:'Unexpected Error'})
        }
    )
})

module.exports = router