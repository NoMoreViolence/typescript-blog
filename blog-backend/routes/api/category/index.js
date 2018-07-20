const router = require('express').Router()
const controller = require('./category.controller')
const authMiddleware = require('./../../../middlewares/auth')

// print all Posts title of Category
router.get('/:category', controller.showTitleAndSubTitle)

// category add
router.use('/:category', authMiddleware) // login check middleware
router.post('/:category', controller.categoryCreate)

// category change
router.use('/:category', authMiddleware) // login check middleware
router.patch('/:category', controller.categoryChange)

// category delete
router.use('/:category', authMiddleware) // login check middleware
router.delete('/:category', controller.categoryDelete)

module.exports = router
