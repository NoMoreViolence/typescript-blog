// jwt 토큰 발급하기 위해서 토큰 불러옵니다 어허~
const jwt = require('jsonwebtoken');
// 디비 모델을 불러옵니다
const User = require('./../../../models/User');
// 암호화
const crypto = require('crypto');

/*
    POST /api/auth
    {
        username,
        password
    }
*/
exports.register = (req, res) => {
  console.log('회원가입 비밀번호: ' + req.body.password);
  req.body.password = crypto
    .createHash('sha512')
    .update(req.body.password)
    .digest('base64');
  const { username, password } = req.body;
  let newUser = null;

  // create a new user if does not exist
  const create = user => {
    if (user) {
      throw new Error('username exists');
    } else {
      return User.create(username, password);
    }
  };

  // count the number of the user
  const count = user => {
    newUser = user;
    console.log(User.count({}).exec());
    return User.count({}).exec();
  };

  // assign admin if count is 1
  const assign = count => {
    if (count === 1) {
      return newUser.assignAdmin();
    } else {
      // if not, return a promise that returns false
      return Promise.resolve(false);
    }
  };

  // respond to the client
  const respond = isAdmin => {
    res.json({
      message: 'registered successfully',
      admin: isAdmin ? true : false
    });
  };

  // run when there is an error (username exists)
  const onError = error => {
    res.status(409).json({
      message: error.message
    });
  };

  // check username duplication
  User.findOneByUsername(username)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError);
};

/*
    POST /api/auth/login
    {
        username,
        password
    }
*/
exports.login = (req, res) => {
  console.log('로그인 비밀번호: ' + req.body.password);
  req.body.password = crypto
    .createHash('sha512')
    .update(req.body.password)
    .digest('base64');
  const { username, password } = req.body;
  const secret = req.app.get('jwt-secret');

  const adminCheck = user => {
    if (user.admin === true) return user;
    throw new Error('Not Admin');
  };

  // 유저를 체크하고 JWT 토큰을 발급합니다
  const check = user => {
    if (!user) {
      // user does not exist
      throw new Error('login failed');
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
              subject: 'IHP'
            },
            (err, token) => {
              if (err) reject(err);
              resolve(token);
            }
          );
        });
        return p;
      } else {
        throw new Error('login failed');
      }
    }
  };

  // respond the token
  const respond = token => {
    console.log('로그인 성공');
    res.json({
      message: true,
      token
    });
  };

  // error occured
  const onError = error => {
    res.status(403).json({
      message: false
    });
  };

  // find the user
  User.findOneByUsername(username)
    .then(adminCheck)
    .then(check)
    .then(respond)
    .catch(onError);
};

/*
    GET /api/auth/check
*/

exports.check = (req, res) => {
  console.log('토큰이 인증 되었습니다');
  res.json({
    success: true,
    info: req.decoded
  });
};
