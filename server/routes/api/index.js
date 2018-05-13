const router = require('express').Router()
const auth = require('./auth')
const ripple = require('./ripple')
const category = require('./category')
const post = require('./post')

// 로긴 인증
router.use('/auth', auth)
// 사용자 댓글
router.use(ripple)
// 포스트 관련된 부분
router.use(post)
// 카테고리 관련된 부분 받아오기
router.use(category)
module.exports = router
