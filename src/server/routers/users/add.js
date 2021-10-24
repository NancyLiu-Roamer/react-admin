const express = require('express')
const router = express.Router()

const UserModel = require('../../models/UserModel')

router.post('/',(req,res)=>{
    //console.log(req.query)
    UserModel.findOne({username:req.query.username}).then(
        user=>{
            if(user){
                res.send({status:1,msg:'Existed User'})
                return new Promise(()=>{})
            }else{
                return UserModel.create({
                    ...req.query
                })
            }
        }
    ).then(
        user=>{
            res.send({status:0,data:user})
        }
    ).catch(
        err=>{
            console.log(err)
            res.send({status:1,msg:'Unexpected Error'})
        }
    )

})

module.exports=router