// 디비 모델을 불러옵니다
const Ripple = require('./../../../models/Ripple')

/*
    POST /api/ripple/comment
    {
        message
    }
*/
exports.comment = (req, res) => {
  console.log(`댓글: ${req.body.message}`)

  const { message } = req.body

  // ripple에 내장된 함수인 create를 정의
  const create = () => Ripple.create(message)

  // 응답
  const response = data => {
    res.json({
      success: true
    })
  }

  // 에러가 생겼을 때
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    })
  }

  // 함수 실행
  create()
    .then(response)
    .catch(onError)
}

/*
    GET /api/ripple/every
*/
// 모든 댓글 내용 볼 때
exports.every = (req, res) => {
  // ripple에 내장된 함수를 통해 불러옴
  const take = () => Ripple.lists()

  // 응답
  const response = data => {
    res.json({
      data
    })
  }

  take().then(response)
}
