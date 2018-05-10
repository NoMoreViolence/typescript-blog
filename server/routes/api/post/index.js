const router = require('express').Router()
const controller = require('./post.controller')
const authMiddleware = require('./../../../middlewares/auth')

// GET 카테고리 리스트 출력 OR 특정 카테고리 리스트 출력
router.get('/categories/posts', controller.allPosts)
// 포스트 데이터 불러오기
router.get('/:title', controller.post)

// POST 카테고리 추가
router.use('/create', authMiddleware) // 미들웨어
router.post('/create', controller.create)

// PUT 카테고리 이름 수정 || (아직 완성되지 않음) => 포스트 rest api 정리가 끝나지 않았음
router.use('/change', authMiddleware) // 미들웨어
router.put('/change', controller.change)

// DELETE 카테고리 삭제 || (아직 완성되지 않음) => 포스트 rest api 정리가 끝나지 않았음
router.use('/delete', authMiddleware) // 미들웨어
router.delete('/delete', controller.delete)

module.exports = router
