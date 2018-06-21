const Category = require('./../../../models/Category')
const Post = require('./../../../models/Post')
const Ripple = require('./../../../models/Ripple')

const crypto = require('crypto')

/*
    GET /api/:category/:title/:writer
    {}
*/

// Show ripple
exports.showRipple = (req, res) => {
  const { category, title, writer } = req.params

  // Find ripple
  const writerExistCheck = async data => {
    const ripple = await Ripple.searchRipple(data.category, data.title, data.writer)

    if (ripple !== null) {
      return Promise.resolve({ ...data, ripple })
    }

    return Promise.reject(new Error(`'${data.writer}' 가 쓴 댓글을 찾을 수 없습니다 !`))
  }

  // Check data.ripple.category is exist or not
  const categoryExistCheck = async data => {
    // Check the ripple have category or not
    if (data.ripple.category !== null) {
      return Promise.resolve(data)
    }

    // Find category
    const paramsCategory = await Category.findSameCategory(data.category)
    // If category is exist
    if (paramsCategory !== null) {
      return Promise.reject(new Error(`'${data.category}' 카테고리 에는 '${data.writer}' 가 쓴 댓글이 없습니다 !`))
    }

    // Throw error
    return Promise.reject(new Error(`'${data.category}' 카테고리는 존재하지 않습니다 !`))
  }

  // Check data.ripple.post is exist or not
  const postExistCheck = async data => {
    // Check the ripple have post or not
    if (data.ripple.post !== null) {
      return Promise.resolve(data)
    }

    // Find post
    const paramsTitle = await Post.findPost(data.category, data.title)
    if (paramsTitle !== null) {
      return Promise.reject(new Error(`'${data.title}' 포스트에는 '${data.writer}' 가 쓴 댓글이 없습니다 !`))
    }

    // Throw error
    return Promise.reject(new Error(`'${data.title}' 포스트는 존재하지 않습니다 !`))
  }

  //  Respond to client
  const respondToClient = data => {
    res.json({
      success: true,
      message: `'${data.writer}' 댓글 불러오기 성공`,
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
  writerExistCheck({
    category: category.trim(),
    title: title.trim(),
    writer: writer.trim(),
    ripple: null
  })
    .then(categoryExistCheck)
    .then(postExistCheck)
    .then(respondToClient)
    .catch(onError)
}

/*
    POST /api/:category/:title/:writer
    {
      ripple: string,
      password: string,
      parent: ObjectID
    }
*/
exports.addRipple = (req, res) => {
  const { category, title, writer } = req.params
  const { ripple, password, parentID } = req.body

  // Check data.title is exist or not
  const postExistCheck = async data => {
    console.log('postExistCheck')
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
    console.log('categoryExistCheck')
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

  // Check params.writer.toLowerCase() is ('admin' or 'nomoreviolence) or not
  const writerAdminCheck = data => {
    console.log('writerAdminCheck')
    if (data.writer.toLowerCase() !== 'admin' || 'nomoreviolence') {
      return Promise.resolve({ ...data, admin: false })
    }

    return Promise.reject(new Error('관리자 이름은 댓글 작성자 이름이 될 수 없습니다 !'))
  }

  // Check body.ripple exist or not
  const rippleExistCheck = data => {
    console.log('reippleExistCheck')
    console.log(data.ripple)
    if (data.ripple !== undefined) {
      return Promise.resolve({ ...data, ripple: data.ripple.trim() })
    }

    return Promise.reject(new Error('추가할 댓글이 없습니다 !'))
  }

  // Check body.password is exist or not
  const passwordExistCheck = data => {
    console.log('passwordExistCheck')
    if (data.password !== undefined) {
      return Promise.resolve({ ...data, password: data.password.trim() })
    }
    return Promise.reject(new Error('댓글 비빌번호가 존재하지 않습니다 !'))
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

  // Check data.parentID
  const parentIDCheckOne = async data => {
    // Find parentRipple
    const parentRippleData = await Ripple.searchOneRippleByID(data.parentID)

    // If data exist
    if (parentRippleData !== null) {
      // Check right value in parentRippleData
      if (parentRippleData.categoryID === data.categoryID && parentRippleData.postID === data.postID) {
        return Promise.resolve({ ...data, parentRippleData, parentRippleID: parentRippleData.id })
      }
      return Promise.reject(new Error('맞지 않는 포스트 입니다 !'))
    }

    return Promise.resolve(data)
  }
  // Check data.parentID
  const parentIDCheckTwo = data => {
    // Reverify
    if (data.parentRippleData !== null) {
      // Check Top or Child
      if (data.parentRippleData.top === true) {
        return Promise.resolve({ ...data, top: false })
      }

      // Throw error
      return Promise.reject(new Error('더 이상의 대댓글은 불가능 합니다 !'))
    }

    return Promise.resolve({ ...data, top: true })
  }

  // Ripple create
  const rippleCreate = async data => {
    // Top class ripple
    if (data.top === true) {
      // Create ripple
      const addedRipple = await Ripple.createRipple(data.categoryID, data.postID, data.writer, data.text, data.password, data.top)

      // add ripple to title
      await Post.rippleRefPush(data.postID, addedRipple.id)
    }

    // Child class ripple
    if (data.top === false) {
      // Create Ripple
      const addedRipple = await Ripple.createRipple(data.categoryID, data.postID, data.writer, data.text, data.password, data.top)

      await Ripple.rippleRefPush(data.parentRippleID, addedRipple.id)
    }

    return Promise.resolve({ ...data, password: '!!!' })
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
    admin: false,
    category: category.trim(),
    title: title.trim(),
    writer: writer.trim(),
    ripple,
    password,
    parentID,
    postData: null,
    postID: null,
    categoryID: null,
    parentRippleData: null,
    parentRippleID: null,
    top: null
  })
    .then(categoryExistCheck)
    .then(writerAdminCheck)
    .then(rippleExistCheck)
    .then(passwordExistCheck)
    .then(passwordEncryption)
    .then(parentIDCheckOne)
    .then(parentIDCheckTwo)
    .then(rippleCreate)
    .then(respondToClient)
    .catch(onError)
}
