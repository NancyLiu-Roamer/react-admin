const express = require('express')
const router = express.Router()
const addBlog = require('./add')
const deleteBlog = require('./delete')
const updateBlog = require('./update')

const BlogModel = require('../../models/BlogModel')
const TagModel = require('../../models/TagModel')

router.use('/create',addBlog)
router.use('/delete',deleteBlog)
router.use('/update',updateBlog)

// get blog list
router.get('/', (req, res) => {
  const params = req.query
    BlogModel.find(params)
      .then(blogs => {
        TagModel.find().then(tags => {
          res.send({status: 0, data: {blogs,tags}})
        })
      })
      .catch(error => {
        console.error('Unexpected Error', error)
        res.send({status: 1, msg: 'Unexpected Error, Please Try Again'})
      })
  })  
module.exports = router