// require jwt token
const jwt = require('jsonwebtoken')
// require user schema
const User = require('./../../../models/User')
// crypto module
const crypto = require('crypto')

/*
    POST /api/auth/register
    {
        username,
        password
    }
*/
exports.register = (req, res) => {
  console.log(`회원가입 비밀번호: ${req.body.password}`)

  // crypto password
  req.body.password = crypto
    .createHash('sha512')
    .update(req.body.password)
    .digest('base64')

  // request value
  const { username, password } = req.body
  // user database data
  let newUser = null

  // create a new user if does not exist
  const create = user => {
    if (user) {
      throw new Error('유저네임 중복 - 회원가입 실패')
    } else {
      return User.create(username, password)
    }
  }

  // count the number of the user
  const count = user => {
    // the create DB data
    newUser = user
    // user number
    console.log(User.count({}).exec())
    // return user count
    return User.count({}).exec()
  }

  // assign admin if count is 1
  const assign = adminCount => {
    if (adminCount === 1) {
      // Upgrade to Admin
      return newUser.assignAdmin()
    }
    // if not, return a promise that returns false
    return Promise.resolve(false)
  }

  // respond to the client
  const respond = isAdmin => {
    res.json({
      message: '정상적인 작업 - 회원가입 성공',
      admin: !!isAdmin
    })
  }

  // run when there is an error (username exists)
  const onError = error => {
    res.status(409).json({
      message: error.message
    })
  }

  // check username duplication
  User.findOneByUsername(username)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError)
}

/*
    POST /api/auth/login
    {
        username,
        password
    }
*/
exports.login = (req, res) => {
  // if compare to DB password, password have to cryptoed, DB has only hash data
  req.body.password = crypto
    .createHash('sha512')
    .update(req.body.password)
    .digest('base64')
  const { username, password } = req.body

  // require jwt secret Value
  const secret = req.app.get('jwt-secret')

  // if user is not admin, can't login
  const adminCheck = user => {
    console.log(user)
    if (user.admin === true) return user
    throw new Error('관리자가 아닙니다 !')
  }

  // 유저를 체크하고 JWT 토큰을 발급합니다
  const check = user => {
    if (!user) {
      // user does not exist
      console.log("login failed, user doesn't exists ")
      throw new Error('유저가 존재하지 않습니다 !')
    } else {
      // user exists, check the password
      if (user.verify(password)) {
        // create a promise that generates jwt asynchronously
        const p = new Promise((resolve, reject) => {
          jwt.sign(
            {
              _id: user._id,
              username: user.username,
              admin: user.admin
            },
            secret,
            {
              expiresIn: '1d',
              issuer: 'Leejihoon',
              subject: "Lee's Blog"
            },
            (err, token) => {
              if (err) reject(err)
              resolve(token)
            }
          )
        })
        return p
      }
      throw new Error('아이디 비밀번호 오류입니다 !')
    }
  }

  // respond the token
  const respond = token => {
    console.log('로그인 성공 !')
    res.json({
      success: true,
      message: 'login success',
      token
    })
  }

  // error occured
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    })
  }

  // find the user
  User.findOneByUsername(username)
    .then(adminCheck)
    .then(check)
    .then(respond)
    .catch(onError)
}

/*
    GET /api/auth/check
*/

exports.check = (req, res) => {
  console.log('토큰이 인증 되었습니다')
  res.json({
    success: true,
    message: '환영합니다 !',
    info: req.decoded
  })
}
