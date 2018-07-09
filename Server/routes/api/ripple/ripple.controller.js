const Category = require('./../../../models/Category')
const Post = require('./../../../models/Post')
const Ripple = require('./../../../models/Ripple')

const crypto = require('crypto')

/*
    GET /api/:category/:title/ripples/:toporchild?topID='value'
    {}
*/
// Show all ripple of /:category/:title
exports.showRipples = (req, res) => {
  const { category, title, toporchild } = req.params
  const { topID } = req.query

  // Find Post & Check post is exist or not
  const postExistCheck = async data => {
    // Find post
    const post = await Post.findPost(data.category, data.title)

    // Check post is exist or not
    if (post !== null) {
      return Promise.resolve({ ...data, post, postID: post.id })
    }
    return Promise.reject(new Error(`${data.title} 포스트가 존재하지 않습니다 !`))
  }

  // Check category exist or not
  const postCategoryExistCheck = async data => {
    // Check post has category or not
    if (data.post.category !== null) {
      return Promise.resolve({ ...data, categoryID: data.post.category.id })
    }

    // Check paramsCategory is exist or not
    const paramsCategory = await Category.findSameCategory(data.category)
    if (paramsCategory !== null) {
      return Promise.reject(new Error(`'${data.title}'포스트는 '${data.category}' 카테고리가 아닙니다 !`))
    }

    return Promise.reject(new Error(`'${data.category}' 카테고리는 존재하지 않습니다 !`))
  }

  // Find Ripple
  const topOrChildBring = async data => {
    // Top Ripple
    if (data.topOrChild === 'top') {
      const ripples = await Ripple.searchTopRipple(data.categoryID, data.postID, 0)
      return Promise.resolve({ ...data, ripples })
    }

    // Child Ripple
    if (data.topOrChild === 'child' && data.topID !== undefined) {
      // Check data.topID is ObjectID
      const topIDValidCheck = await Ripple.checkObjectID(data.topID)
      if (topIDValidCheck !== true) {
        return Promise.reject(new Error('댓글의 ID 형식이 올바르지 않습니다 !'))
      }

      // Find Top Ripple
      // Top ripple is exist or not
      const topRipples = await Ripple.searchOneRippleByID(data.topID, 0)
      if (topRipples === null) {
        return Promise.reject(new Error('찾고자 하는 대댓글의 댓글이 존재하지 않습니다 !'))
      }
      // Check founded Top Ripple is top or not
      if (topRipples.top !== true) {
        return Promise.reject(new Error('대댓글의 대댓글은 존재하지 않습니다 !'))
      }
      // Check founded Top Ripple categoryID & postID === req.params.category & post's ID
      if (
        topRipples.categoryID.toString() !== data.categoryID.toString() &&
        topRipples.postID.toString() !== data.postID.toString()
      ) {
        return Promise.reject(new Error('대댓글과 댓글의 카테고리와 포스트가 일치하지 않습니다 !'))
      }

      // Find Child Ripple
      // Child ripple is exist or not
      const childRipples = await Ripple.searchChildRipple(topRipples.childRipple, 0)
      // if (childRipples.length === 0) {
      //  return Promise.reject(new Error('가져올 댓글 데이터가 없습니다 !'))
      // }

      return Promise.resolve({ ...data, ripples: childRipples })
    }

    return Promise.reject(new Error('잘못된 요청입니다 !'))
  }

  // Respond to client
  const respondToClient = data => {
    res.json({
      success: true,
      message: `'${data.category}' 카테고리의 '${data.title}' 포스트의 댓글 불러오기 성공 !`,
      value: data
    })
  }

  // Error handler
  const onError = err => {
    res.status(409).json({
      success: false,
      message: err.message,
      value: []
    })
  }

  // Promise
  postExistCheck({
    category: category.trim(),
    title: title.trim(),
    categoryID: '',
    postID: '',
    ripples: [],
    topOrChild: toporchild,
    topID
  })
    .then(postCategoryExistCheck)
    .then(topOrChildBring)
    .then(respondToClient)
    .catch(onError)
}

/*
    POST /api/:category/:title/:writer/:toporchild?topID='value'
    {}
    {
      ripple: string,
      password: string
    }
*/
exports.addRipple = (req, res) => {
  // Params & query & body
  const {
    category, title, writer, toporchild
  } = req.params
  const { topID } = req.query
  const { ripple, password } = req.body

  // Check data.title is exist or not
  const postExistCheck = async data => {
    // Find
    const postData = await Post.findPost(data.category, data.title)
    // Cehck postData is exist or not
    if (postData !== null) {
      return Promise.resolve({ ...data, postData, postID: postData.id })
    }

    // Throw error
    return Promise.reject(new Error(`'${data.title}' 포스트는 존재하지 않습니다 !`))
  }
  // Check data.post.category is exist or not
  const categoryExistCheck = async data => {
    // Check data.post.category
    if (data.postData.category !== null) {
      return Promise.resolve({ ...data, categoryID: data.postData.category.id })
    }

    // Check data.category is exist or not
    const categoryData = await Category.findSameCategory(data.category)
    if (categoryData !== null) {
      return Promise.reject(new Error(`'${data.title}'포스트는 '${data.category}' 카테고리가 아닙니다 !`))
    }
    // Throw error
    return Promise.reject(new Error(`'${data.category}' 카테고리는 존재하지 않습니다 !`))
  }

  // Check body.ripple exist or not
  const rippleExistCheck = data => {
    // Check body.ripple exist or not
    if (data.ripple === undefined) {
      return Promise.reject(new Error('추가할 댓글이 없습니다 !'))
    }
    // Check body.ripple.trim().length() is 0 or not
    if (data.ripple.trim() === '') {
      return Promise.reject(new Error('추가할 댓글이 없습니다 ! '))
    }

    return Promise.resolve({ ...data, ripple: data.ripple.trim() })
  }
  // Check body.passowrd is exist or not
  const passwordExistCheck = data => {
    // Check body.password exist or not
    if (data.password === undefined) {
      return Promise.reject(new Error('추가할 댓글이 없습니다 !'))
    }
    // Check body.password.trim().length() is 0 or not
    if (data.password.trim() === '') {
      return Promise.reject(new Error('추가할 댓글이 없습니다 ! '))
    }

    return Promise.resolve({ ...data, password: data.password.trim() })
  }
  // Encrypt data.password
  const passwordEncryption = async data => {
    // Encryption
    const encryptedPassword = await crypto
      .createHash('sha512')
      .update(req.body.password)
      .digest('base64')

    return Promise.resolve({ ...data, password: encryptedPassword })
  }

  // Ripple create
  const rippleCreate = async data => {
    // Top class ripple
    if (data.topOrChild === 'top') {
      // Create ripple
      const addedRipple = await Ripple.createRipple(data.categoryID, data.postID, data.writer, data.ripple, data.password, true)

      // add ripple to title
      await Post.rippleRefPush(data.postID, addedRipple.id)

      return Promise.resolve({ ...data, addedRipple, password: '!!!' })
    }

    // Child class ripple
    if (data.topOrChild === 'child' && data.topID !== undefined) {
      // Check data.topID is ObjectID
      const topIDValidCheck = await Ripple.checkObjectID(data.topID)
      if (topIDValidCheck === false) {
        return Promise.reject(new Error('댓글의 데이터가 올바르지 않습니다 !'))
      }

      // Check parentRipple data === add Ripple data
      const parentRipple = await Ripple.searchOneRippleByID(data.topID, 0)
      if (parentRipple === null) {
        return Promise.reject(new Error('대댓글을 달아야 할 댓글이 존재하지 않습니다 !'))
      }
      // Check founded parentRipple is top or not
      if (parentRipple.top !== true) {
        return Promise.reject(new Error('대댓글에 대댓글을 다는 것은 불가능 합니다 !'))
      }
      // Check categoryID & postID is same with childripple value
      if (
        parentRipple.categoryID.toString() !== data.categoryID.toString() &&
        parentRipple.postID.toString() !== data.postID.toString()
      ) {
        return Promise.reject(new Error('대댓글을 달려고 하는 댓글의 카테고리와 포스트가 일치하지 않습니다 !'))
      }

      // Create Ripple
      const addedRipple = await Ripple.createRipple(data.categoryID, data.postID, data.writer, data.ripple, data.password, false)
      await Ripple.rippleRefPush(data.topID, addedRipple.id)

      return Promise.resolve({ ...data, password: '!!!', topData: parentRipple })
    }

    return Promise.reject(new Error('잘못된 요청입니다 !'))
  }

  // Respond to client
  const respondToClient = data => {
    res.json({
      success: true,
      message: `'${data.writer}' 의 댓글 추가 성공 !`,
      value: data
    })
  }

  // Error handler
  const onError = err => {
    res.status(409).json({
      success: false,
      message: err.message,
      value: []
    })
  }

  // Promise
  postExistCheck({
    category: category.trim(),
    title: title.trim(),
    writer: writer.trim(),
    ripple,
    password,
    postData: null,
    postID: null,
    categoryID: null,
    topOrChild: toporchild,
    topData: null,
    topID
  })
    .then(categoryExistCheck)
    .then(rippleExistCheck)
    .then(passwordExistCheck)
    .then(passwordEncryption)
    .then(rippleCreate)
    .then(respondToClient)
    .catch(onError)
}

/*
    PATCH /api/:category/:title/:writer/:toporchild
    {}
    {
      password: string
    }
*/
exports.changeRipple = (req, res) => {}
