const router = require('express').Router()
const controller = require('./post.controller')
const authMiddleware = require('./../../../middlewares/auth')

// Bring the title and subtitle of all categories
router.get('/categories/posts', controller.allPostsTitleAndSubTitle)
// Bring the post data
router.get('/:category/:title', controller.post)

// add post
router.use('/:category/:title', authMiddleware) // 미들웨어
router.post('/:category/:title', controller.create)

// change post
router.use('/:category/:title', authMiddleware) // 미들웨어
router.put('/:category/:title', controller.change)

// delete post
router.use('/:category/:title', authMiddleware) // 미들웨어
router.delete('/:category/:title', controller.delete)

module.exports = router
