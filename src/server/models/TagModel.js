const mongoose = require('mongoose')

const tagSchema = new mongoose.Schema({
    id:Number,
    name: String,
})

const TagModel = mongoose.model('taglists', tagSchema)


module.exports = TagModel