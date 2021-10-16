const express = require('express')
const router = express.Router()
const Category =require('./category')
const Product = require('./product')


router.use('/category',Category)
router.use('/product',Product)

module.exports = router