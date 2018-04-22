const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // 헤더 || url 쿼리 || body 안에 토큰을 아무거나 넣어서 보내줍니다, 그 토큰의 쌍따옴표를 제거합니다
  let token = (
    req.headers['x-access-token'] ||
    req.query.token ||
    req.body.token
  ).replace(/"/g, '');

  // 토큰이 존재하지 않는다면
  if (!token) {
    return res.status(403).json({
      success: false,
      message: 'Not Logged In',
    });
  }

  // 토큰 조회
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

  // 토큰 맞지 않는다 => 잘못된 접근 OR 토큰 변조
  const onError = error => {
    res.status(403).json({
      success: false,
      message: error.message,
    });
  };

  // process the promise
  p
    .then(decoded => {
      req.decoded = decoded;
      next();
    })
    .catch(onError);
};

module.exports = authMiddleware;
