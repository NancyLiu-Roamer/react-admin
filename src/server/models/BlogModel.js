
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    id:Number,
    status:Number,
    blog:String,
    title: String,
    tags: Array,
    date: String
})

const BlogModel = mongoose.model('blogs', blogSchema )

module.exports = BlogModel
