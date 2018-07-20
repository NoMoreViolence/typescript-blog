const router = require('express').Router()
const auth = require('./auth')
const category = require('./category')
const post = require('./post')
const ripple = require('./ripple')

// login access
router.use('/auth', auth)
// post Ripple part
router.use(ripple)
// post part
router.use(post)
// category part
router.use(category)

module.exports = router
