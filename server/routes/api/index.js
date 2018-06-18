const router = require('express').Router()
const auth = require('./auth')
const category = require('./category')
const post = require('./post')

// login access
router.use('/auth', auth)
// post part
router.use(post)
// category part
router.use(category)
module.exports = router
