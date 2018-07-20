// require jwt token
const jwt = require('jsonwebtoken')
// require user schema
const User = require('./../../../models/User')
// crypto module
const crypto = require('crypto')

/*
  common function
*/
const MakeNewJwtToken = (username, admin, secret) => {
  if (username && admin && secret) {
    return jwt.sign(
      {
        username,
        admin
      },
      secret
    )
  }
  return null
}

/*
    POST /api/auth/register
    {
        username,
        password
    }
*/
exports.register = (req, res) => {
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
      admin: true
    })
  }

  // run when there is an error (username exists)
  const onError = error => {
    res.status(409).json({
      message: error.message,
      admin: false
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
  // bring inpus
  const { username, password } = req.body

  // check req.body.username is real exist username
  const checkUsername = async data => {
    const usernameData = await User.findOneByUsername(data.username)

    if (usernameData) {
      return Promise.resolve({ ...data, user: usernameData })
    }
    return Promise.reject(new Error('유저가 존재하지 않습니다 !'))
  }

  // check founded user's account is admin or not
  // if the account is not admin, can't sign in23
  const checkUserIsAdminOrNot = data => {
    // if userData is admin account
    if (data.user.admin === true) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('관리자가 아닙니다 !'))
  }

  // encrypt password because of check the input password is same as db.password
  const encryptionPassword = async data => {
    // Encrypt password
    const encryptedPassword = crypto
      .createHash('sha512')
      .update(data.password)
      .digest('base64')

    return Promise.resolve({ ...data, password: encryptedPassword })
  }

  // check data.password === database.foundedUser.password
  const requestPasswordVerify = async data => {
    const verifyData = await data.user.verify(data.password)

    if (verifyData) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('비밀번호 오류입니다 !'))
  }

  // create JWT token
  const makeJwtToken = async data => {
    const secret = req.app.get('jwt-secret')
    const tokenValue = await MakeNewJwtToken(data.user.username, data.user.admin, secret)

    if (tokenValue !== null) {
      return Promise.resolve({ ...data, token: tokenValue })
    }
    return Promise.reject(new Error('토큰 생성 에러 발생 !'))
  }

  // respond to server
  const respondToClient = data => {
    res.json({
      success: true,
      message: '로그인 성공 !',
      token: data.token
    })
  }

  // error handler
  const onError = err => {
    res.status(409).json({
      success: false,
      message: err.message
    })
  }

  // Promise
  checkUsername({
    username: username.trim(),
    password: password.trim(),
    user: null,
    token: null
  })
    .then(checkUserIsAdminOrNot)
    .then(encryptionPassword)
    .then(requestPasswordVerify)
    .then(makeJwtToken)
    .then(respondToClient)
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
