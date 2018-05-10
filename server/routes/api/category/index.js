const router = require('express').Router()
const controller = require('./category.controller')
const authMiddleware = require('./../../../middlewares/auth')

// GET 카테고리 리스트 출력 OR 특정 카테고리 리스트 출력
router.get('/categories', controller.all)
// GET 특정 카테고리의 포스트 이름만을 가져와서 보냄
router.get('/:category', controller.postNames)

// POST 카테고리 추가
router.use('/:category', authMiddleware) // 미들웨어
router.post('/:category', controller.create)

// PATCH 카테고리 이름 수정 || (아직 완성되지 않음) => 포스트 rest api 정리가 끝나지 않았음
router.use('/:category', authMiddleware) // 미들웨어
router.patch('/:category', controller.change)

// DELETE 카테고리 삭제 || (아직 완성되지 않음) => 포스트 rest api 정리가 끝나지 않았음
router.use('/:category', authMiddleware) // 미들웨어
router.delete('/:category', controller.delete)

router.get('/hello', controller.temptmep)

module.exports = router
