const router = require('express').Router()
const controller = require('./auth.controller')
const authMiddleware = require('./../../../middlewares/auth')

// register
router.post('/register', controller.register)

// login
router.post('/login', controller.login)

// auto login
router.use('/check', authMiddleware)
router.post('/check', controller.check)

module.exports = router
