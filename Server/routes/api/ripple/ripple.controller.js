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
    if (post === null) {
      return Promise.reject(new Error(`${data.title} 포스트가 존재하지 않습니다 !`))
    }

    return Promise.resolve({ ...data, post, postID: post.id })
  }

  // Check category exist or not
  const postCategoryExistCheck = async data => {
    // Check post has category or not
    if (data.post.category === null) {
      // Check paramsCategory is exist or not
      const paramsCategory = await Category.findSameCategory(data.category)
      if (paramsCategory !== null) {
        return Promise.reject(new Error(`'${data.title}'포스트는 '${data.category}' 카테고리가 아닙니다 !`))
      }

      return Promise.reject(new Error(`'${data.category}' 카테고리는 존재하지 않습니다 !`))
    }

    return Promise.resolve({ ...data, categoryID: data.post.category.id })
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
      if (topRipples.categoryID.toString() !== data.categoryID.toString() && topRipples.postID.toString() !== data.postID.toString()) {
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
  const { ripple, password, topID } = req.body

  // Check data.title is exist or not
  const postExistCheck = async data => {
    // Find
    const postData = await Post.findPost(data.category, data.title)
    // Cehck postData is exist or not
    if (postData === null) {
      // Throw error
      return Promise.reject(new Error(`'${data.title}' 포스트는 존재하지 않습니다 !`))
    }

    return Promise.resolve({ ...data, postData, postID: postData.id })
  }
  // Check data.post.category is exist or not
  const categoryExistCheck = async data => {
    // Check data.post.category
    if (data.postData.category === null) {
      // Check data.category is exist or not
      const categoryData = await Category.findSameCategory(data.category)
      if (categoryData !== null) {
        return Promise.reject(new Error(`'${data.title}'포스트는 '${data.category}' 카테고리가 아닙니다 !`))
      }
      // Throw error
      return Promise.reject(new Error(`'${data.category}' 카테고리는 존재하지 않습니다 !`))
    }

    return Promise.resolve({ ...data, categoryID: data.postData.category.id })
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
      const addedRipple = await Ripple.createRipple(
        data.categoryID,
        data.postID,
        data.writer,
        data.ripple,
        data.password,
        true,
        data.topID
      )
      // add ripple to title
      await Post.rippleRefPush(data.postID, addedRipple.id)

      // Data sort
      const AddedRipple = {
        _id: addedRipple.id,
        topID: addedRipple.id,
        text: addedRipple.text,
        writer: addedRipple.writer,
        password: '!!!',
        categoryID: addedRipple.categoryID,
        postID: addedRipple.postID,
        top: addedRipple.top,
        childRipple: [],
        date: addedRipple.date
      }

      return Promise.resolve({ ...data, addedRipple: AddedRipple, password: '!!!' })
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
      const addedRipple = await Ripple.createRipple(
        data.categoryID,
        data.postID,
        data.writer,
        data.ripple,
        data.password,
        false,
        data.topID
      )
      await Ripple.rippleRefPush(data.topID, addedRipple.id)

      // Data sort
      const AddedRipple = {
        _id: addedRipple.id,
        topID: data.topID,
        text: addedRipple.text,
        writer: addedRipple.writer,
        password: '!!!',
        categoryID: addedRipple.categoryID,
        postID: addedRipple.postID,
        top: addedRipple.top,
        childRipple: [],
        date: addedRipple.date
      }

      return Promise.resolve({
        ...data,
        addedRipple: AddedRipple,
        password: '!!!',
        topData: parentRipple
      })
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
    {
      text: string
      topID: string
      rippleID: objectID
      password: string
    }
*/
exports.changeRipple = (req, res) => {
  // Data
  const {
    category, title, writer, toporchild
  } = req.params
  const {
    text, topID, rippleID, password
  } = req.body

  // Check data.title is exist or not
  const postExistCheck = async data => {
    // Find
    const postData = await Post.findPost(data.category, data.title)
    // Cehck postData is exist or not
    if (postData === null) {
      // Throw error
      return Promise.reject(new Error(`'${data.title}' 포스트는 존재하지 않습니다 !`))
    }

    return Promise.resolve({ ...data, postData, postID: postData.id })
  }
  // Check data.post.category is exist or not
  const categoryExistCheck = async data => {
    // Check data.post.category
    if (data.postData.category === null) {
      // Check data.category is exist or not
      const categoryData = await Category.findSameCategory(data.category)
      if (categoryData !== null) {
        return Promise.reject(new Error(`'${data.title}'포스트는 '${data.category}' 카테고리가 아닙니다 !`))
      }
      // Throw error
      return Promise.reject(new Error(`'${data.category}' 카테고리는 존재하지 않습니다 !`))
    }

    return Promise.resolve({ ...data, categoryData: data.postData.category, categoryID: data.postData.category.id })
  }

  // Check objectID
  const rippleObjectIdCheck = async data => {
    // Check ripple ID
    const rippleIDchecked = await Ripple.checkObjectID(data.rippleID)

    if (rippleIDchecked !== true) {
      return Promise.reject(new Error('잘못된 요청입니다 !'))
    }

    return Promise.resolve(data)
  }

  // Find ripple by obj ID
  const rippleExistCheck = async data => {
    // Find rippl
    const ripple = await Ripple.searchOneRippleByID(data.rippleID, 1)

    if (ripple === null) {
      return Promise.reject(new Error('변경하고자 하는 댓글이 존재하지 않습니다 !'))
    }

    return Promise.resolve({ ...data, ripple })
  }

  // Check ripple data
  const rippleDataCheck = data => {
    if (data.ripple.categoryID.toString() !== data.categoryID.toString()) {
      return Promise.reject(new Error('댓글의 카테고리가 일치하지 않습니다 !'))
    }

    if (data.ripple.postID.toString() !== data.postID.toString()) {
      return Promise.reject(new Error('댓글의 포스트가 일치하지 않습니다 !'))
    }

    if (data.ripple.writer !== data.writer) {
      return Promise.reject(new Error('댓글 작성자의 이름이 일치하지 않습니다 !'))
    }

    if (data.ripple.top === true && data.toporchild === 'top') {
      return Promise.resolve(data)
    }

    if (data.ripple.top === false && data.toporchild === 'child') {
      if (data.ripple.topID === data.topID) {
        return Promise.resolve(data)
      }
    }

    return Promise.reject(new Error('잘못된 요청입니다 !'))
  }

  // Check req.body.password === data.ripple.password
  const passwordCheck = async data => {
    // Encryption
    const encryptedPassword = await crypto
      .createHash('sha512')
      .update(req.body.password)
      .digest('base64')

    if (encryptedPassword !== data.ripple.password) {
      return Promise.reject(new Error('비밀번호가 일치하지 않습니다 !'))
    }

    // Password hide
    const cleanedData = {
      topID: data.ripple.topID,
      childRipple: data.ripple.childRipple,
      date: data.ripple.date,
      _id: data.ripple.id,
      text: data.ripple.text,
      writer: data.ripple.writer,
      password: '!!!',
      categoryID: data.ripple.categoryID,
      postID: data.ripple.postID,
      top: data.ripple.top
    }

    return Promise.resolve({ ...data, ripple: cleanedData })
  }

  // Change ripple
  const rippleChange = async data => {
    if (data.toporchild !== 'top' && data.toporchild !== 'child') {
      return Promise.reject(new Error('잘못된 요청입니다 !'))
    }

    const changeRipple = await Ripple.changeRipple(data.rippleID, data.text, 0)

    return Promise.resolve({ ...data, changedRipple: changeRipple })
  }

  const dataCleaning = data => {
    const cleaningData = { ...data, password: '!!!' }

    return Promise.resolve(cleaningData)
  }

  // Respond
  const respondToClient = data => {
    res.json({
      success: true,
      message: `'${data.writer}' 의 댓글 변경 성공 !`,
      value: data
    })
  }

  // Error handler
  const onError = err => {
    res.status(409).json({
      message: err.message,
      value: []
    })
  }

  // Promise
  postExistCheck({
    category,
    title,
    writer,
    text,
    password,
    topID,
    rippleID,
    toporchild
  })
    .then(categoryExistCheck)
    .then(rippleObjectIdCheck)
    .then(rippleExistCheck)
    .then(rippleDataCheck)
    .then(passwordCheck)
    .then(rippleChange)
    .then(dataCleaning)
    .then(respondToClient)
    .catch(onError)
}

/*
   DELETE /api/:category/:title/:writer/:toporchild
    {
      topID: string
      rippleID: objectID
      password: string
    }
*/
exports.deleteRipple = (req, res) => {
  const {
    category, title, writer, toporchild
  } = req.params
  const { topID, rippleID, password } = req.body

  // Body data check
  const bodyDataCheck = data => {
    if (data.topID === undefined || !data.rippleID || !data.password) {
      return Promise.reject(new Error('잘못된 요청입니다 !'))
    }

    return Promise.resolve(data)
  }

  // Check data.title is exist or not
  const postExistCheck = async data => {
    // Find
    const postData = await Post.findPost(data.category, data.title)
    // Cehck postData is exist or not
    if (postData === null) {
      // Throw error
      return Promise.reject(new Error(`'${data.title}' 포스트는 존재하지 않습니다 !`))
    }

    return Promise.resolve({ ...data, postData, postID: postData.id })
  }
  // Check data.post.category is exist or not
  const categoryExistCheck = async data => {
    // Check data.post.category
    if (data.postData.category === null) {
      // Check data.category is exist or not
      const categoryData = await Category.findSameCategory(data.category)
      if (categoryData !== null) {
        return Promise.reject(new Error(`'${data.title}'포스트는 '${data.category}' 카테고리가 아닙니다 !`))
      }
      // Throw error
      return Promise.reject(new Error(`'${data.category}' 카테고리는 존재하지 않습니다 !`))
    }

    return Promise.resolve({ ...data, categoryData: data.postData.category, categoryID: data.postData.category.id })
  }

  // Check objectID
  const rippleObjectIdCheck = async data => {
    // Check ripple ID
    const rippleIDchecked = await Ripple.checkObjectID(data.rippleID)

    if (rippleIDchecked !== true) {
      return Promise.reject(new Error('잘못된 요청입니다 !'))
    }

    return Promise.resolve(data)
  }

  // Find ripple by obj ID
  const rippleExistCheck = async data => {
    // Find rippl
    const ripple = await Ripple.searchOneRippleByID(data.rippleID, 1)

    if (ripple === null) {
      return Promise.reject(new Error('변경하고자 하는 댓글이 존재하지 않습니다 !'))
    }

    return Promise.resolve({ ...data, ripple })
  }

  // Check ripple data
  const rippleDataCheck = data => {
    if (data.ripple.categoryID.toString() !== data.categoryID.toString()) {
      return Promise.reject(new Error('댓글의 카테고리가 일치하지 않습니다 !'))
    }

    if (data.ripple.postID.toString() !== data.postID.toString()) {
      return Promise.reject(new Error('댓글의 포스트가 일치하지 않습니다 !'))
    }

    if (data.ripple.writer !== data.writer) {
      return Promise.reject(new Error('댓글 작성자의 이름이 일치하지 않습니다 !'))
    }

    if (data.ripple.top === true && data.toporchild === 'top') {
      return Promise.resolve(data)
    }

    if (data.ripple.top === false && data.toporchild === 'child') {
      if (data.ripple.topID === data.topID) {
        return Promise.resolve(data)
      }
    }

    return Promise.reject(new Error('잘못된 요청입니다 !'))
  }

  // Check req.body.password === data.ripple.password
  const passwordCheck = async data => {
    // Encryption
    const encryptedPassword = await crypto
      .createHash('sha512')
      .update(data.password)
      .digest('base64')

    if (encryptedPassword !== data.ripple.password) {
      return Promise.reject(new Error('비밀번호가 일치하지 않습니다 !'))
    }

    // Password hide
    const cleanedData = {
      topID: data.ripple.topID,
      childRipple: data.ripple.childRipple,
      date: data.ripple.date,
      id: data.ripple.id,
      text: data.ripple.text,
      writer: data.ripple.writer,
      password: '!!!',
      categoryID: data.ripple.categoryID,
      postID: data.ripple.postID,
      top: data.ripple.top
    }

    return Promise.resolve({ ...data, ripple: cleanedData })
  }

  // Delete ripple
  const deleteRipple = async data => {
    if (data.toporchild === 'top') {
      const removedRipple = await Ripple.removeOne(data.rippleID)
      await Ripple.removeAllChildRipple(removedRipple.id)

      const cleanedData = {
        id: removedRipple.id,
        categoryID: removedRipple.categoryID,
        postID: removedRipple.postID,
        writer: removedRipple.writer,
        text: removedRipple.text,
        password: '!!!',
        top: removedRipple.top,
        childRipple: [],
        date: removedRipple.date
      }

      return Promise.resolve({ ...data, removedRipple: cleanedData })
    }

    if (data.toporchild === 'child') {
      const removedRipple = await Ripple.removeOne(data.ripple.id)
      await Ripple.pullRefInTopRipple(data.topID, data.rippleID)

      const cleanedData = {
        id: removedRipple.id,
        topID: data.topID,
        categoryID: removedRipple.categoryID,
        postID: removedRipple.postID,
        writer: removedRipple.writer,
        text: removedRipple.text,
        password: '!!!',
        top: removedRipple.top,
        childRipple: [],
        date: removedRipple.date
      }

      return Promise.resolve({ ...data, removedRipple: cleanedData })
    }

    return Promise.reject(new Error('잘못된 요청입니다 !'))
  }

  // Data cleaning
  const dataCleaning = data => {
    const cleaningData = { ...data, password: '!!!' }

    return Promise.resolve(cleaningData)
  }

  // Respond
  const respondToClient = data => {
    console.log('정상 작동 합니다')
    res.json({
      success: true,
      message: `'${data.writer}' 의 댓글 삭제 성공 !`,
      value: data
    })
  }

  // Error handler
  const onError = err => {
    console.log('에러 입니다')
    res.status(409).json({
      success: false,
      message: err.message,
      value: []
    })
  }

  // Promise
  bodyDataCheck({
    category,
    title,
    writer,
    password,
    topID,
    rippleID,
    toporchild
  })
    .then(postExistCheck)
    .then(categoryExistCheck)
    .then(rippleObjectIdCheck)
    .then(rippleExistCheck)
    .then(rippleDataCheck)
    .then(passwordCheck)
    .then(deleteRipple)
    .then(dataCleaning)
    .then(respondToClient)
    .catch(onError)
}
