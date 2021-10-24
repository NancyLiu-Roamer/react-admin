const TagModel = require('../../models/TagModel')
const express = require('express')
const router = express.Router()

// get tag list
router.get('/',(req,res)=>{
    const info = req.query
    TagModel.find(info).then(
        tag=>{
            res.send({status:0,data:{
                tag
            }})
        }
    ).catch(
        err=>{
            console.log(err)
            res.send({status:1,msg:'Unexpected Error'})
        }
    )
})
module.exports=router