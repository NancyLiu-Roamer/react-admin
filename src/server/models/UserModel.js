const mongoose = require('mongoose')
// const md5 = require('blueimp-md5')


const userSchema = new mongoose.Schema({
  username: {type: String, required: true}, 
  password: {type: String, required: true}, 
  email: String,
  create_time: {type: Number, default: Date.now},
  roleId: Number,
  status:Boolean,
  id:Number,
})


const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel