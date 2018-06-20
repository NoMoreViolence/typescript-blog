const router = require('express').Router()
const controller = require('./post.controller')
const authMiddleware = require('./../../../middlewares/auth')

// Bring the post data
router.get('/:category/:title', controller.postShow)

// Add post
router.use('/:category/:title', authMiddleware) // 미들웨어
router.post('/:category/:title', controller.postCreate)

// Change post
router.use('/:category/:title', authMiddleware) // 미들웨어
router.put('/:category/:title', controller.postChange)

// Delete post
router.use('/:category/:title', authMiddleware) // 미들웨어
router.delete('/:category/:title', controller.postDelete)

module.exports = router
