const Category = require('./../../../models/Category')
const Post = require('./../../../models/Post')
const Ripple = require('./../../../models/Ripple')

const crypto = require('crypto')

/*
    GET /api/:category/:title/ripple/all/all
    {}
*/
// Show all ripple of /:category/:title
exports.showAllRippleInSelectTitle = (req, res) => {
  const { category, title } = req.params

  // Find Post & Check post is exist or not
  const postExistCheck = async data => {
    console.log(data.category)
    console.log('clear')
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
    console.log('clear')
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

  // Find ripple
  const topRippleBring = async data => {
    console.log('clear')
    const ripples = await Ripple.searchTopRipple(data.categoryID, data.postID, 0)

    return Promise.resolve({ ...data, ripples })
  }

  // Respond to client
  const respondToClient = data => {
    res.json({
      success: true,
      message: `'${data.category}' 카테고리의 '${data.title}' 포스트의 댓글 불러오기 성공 !`,
      value: data.ripples
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
    ripples: []
  })
    .then(postCategoryExistCheck)
    .then(topRippleBring)
    .then(respondToClient)
    .catch(onError)
}

/*
    GET /api/:category/:title/:writer/all
    {}
*/
exports.showAllRipple = (req, res) => {
  const { category, title, writer } = req.params
}

/*
    GET /api/:category/:title/:writer
    {}
*/
// Show ripple
exports.showRipple = (req, res) => {
  const { category, title, writer } = req.params

  // Find ripple
  const writerExistCheck = async data => {
    const ripple = await Ripple.searchOneRipple(data.category, data.title, data.writer, 0)

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
      parentID: ObjectID
    }
*/
exports.addRipple = (req, res) => {
  // Params & Category
  const { category, title, writer } = req.params
  const { ripple, password, parentID } = req.body

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

  // Check params.writer.toLowerCase() is ('admin' or 'nomoreviolence) or not
  const writerAdminCheck = data => {
    if (data.writer.toLowerCase() !== ('admin' || 'nomoreviolence')) {
      return Promise.resolve({ ...data, admin: false })
    }
    // Throw error
    return Promise.reject(new Error('관리자 이름은 댓글 작성자 이름이 될 수 없습니다 !'))
  }
  // Check body.ripple exist or not
  const rippleExistCheck = data => {
    // Check ripple exist or not
    if (data.ripple !== undefined) {
      // Check with trim()
      if (data.ripple.trim() !== '') {
        return Promise.resolve({ ...data, ripple: data.ripple.trim() })
      }
      return Promise.reject(new Error('추가할 댓글이 없습니다 !'))
    }
    return Promise.reject(new Error('추가할 댓글이 없습니다 !'))
  }
  // Check body.password is exist or not
  const passwordExistCheck = data => {
    // Check password exist or not
    if (data.password !== undefined) {
      // Check with trim()
      if (data.password.trim() !== '') {
        return Promise.resolve({ ...data, password: data.password.trim() })
      }
      return Promise.reject(new Error('댓글 비밀번호가 존재하지 않습니다 !'))
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
  const parentIDCheck = async data => {
    if (data.parentID !== undefined) {
      // Find parentRipple
      const parentRippleData = await Ripple.searchOneRippleByID(data.parentID)

      return parentRippleData !== null
        ? Promise.resolve({ ...data, parentRippleData })
        : Promise.reject(new Error('대댓글을 할 댓글이 존재하지 않습니다 !'))
    }

    console.log('awefawef')
    return Promise.resolve(data)
  }
  // Check data.parentRippleData
  const parentRippleCheck = async data => {
    if (data.parentRippleData !== null) {
      if (
        data.parentRippleData.categoryID.toString() === data.categoryID.toString() &&
        data.parentRippleData.postID.toString() === data.postID.toString()
      ) {
        return Promise.resolve({ ...data, parentRippleID: data.parentRippleData.id, top: false })
      }

      return Promise.reject(new Error('대댓글을 달려고 하는 댓글의 카테고리와 포스트가 일치하지 않습니다 !'))
    }

    return Promise.resolve({ ...data, top: true })
  }

  // Ripple create
  const rippleCreate = async data => {
    // Top class ripple
    if (data.top === true) {
      console.log('TOP')
      // Create ripple
      const addedRipple = await Ripple.createRipple(data.categoryID, data.postID, data.writer, data.ripple, data.password, data.top)

      console.log(data.postID)
      // add ripple to title
      await Post.rippleRefPush(data.postID, addedRipple.id)
    }

    // Child class ripple
    if (data.top === false) {
      console.log('CHILD')
      // Create Ripple
      const addedRipple = await Ripple.createRipple(data.categoryID, data.postID, data.writer, data.ripple, data.password, data.top)

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
    .then(parentIDCheck)
    .then(parentRippleCheck)
    .then(rippleCreate)
    .then(respondToClient)
    .catch(onError)
}
