const express = require('express')
const router = express.Router()

const BlogModel = require('../../models/BlogModel')

router.delete('/',(req,res)=>{
    BlogModel.deleteOne({id:req.body.id}).then(
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