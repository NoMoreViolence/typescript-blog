const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
  // get token
  const token = req.headers['x-access-token']

  // if token doesn't exist
  if (!token) {
    return res.status(403).json({
      success: false,
      message: '토큰이 존재하지 않습니다',
      info: {},
      type: 'undefinded token'
    })
  }

  // check token
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
      const errInfo = {}
      if (err) {
        errInfo.success = false
        errInfo.message = '유효하지 않은 토큰 값'
        errInfo.info = {}
        errInfo.type = 'invalid token'
        reject(errInfo)
      }

      resolve(decoded)
    })
  })

  // wrong token
  const onError = error => {
    res.status(403).json(error)
  }

  // process the promise
  p
    .then(decoded => {
      req.decoded = decoded
      next()
    })
    .catch(onError)
}

module.exports = authMiddleware
