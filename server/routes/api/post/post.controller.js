const Post = require('./../../../models/Post')
const Category = require('./../../../models/Category')

/*
    GET /api/:category/:title?type='value'
    {}
*/
// Bring the data of :title
exports.postShow = (req, res) => {
  console.log(req.params)
  const { category, title } = req.params
  const { type } = req.query

  // Find Post & Check post is exist or not
  const postExistCheck = async data => {
    // Find post
    const post = await Post.findPost(data.category, data.title)

    // Check post is exist or not
    if (post !== null) {
      return Promise.resolve({ ...data, post })
    }
    return Promise.reject(new Error(`${data.title} 포스트가 존재하지 않습니다 !`))
  }

  // Check category exist or not
  const postCategoryExistCheck = async data => {
    // Check post has category or not
    if (data.post.category !== null) {
      return Promise.resolve(data)
    }

    // Check paramsCategory is exist or not
    const paramsCategory = await Category.findSameCategory(data.category)
    if (paramsCategory !== null) {
      return Promise.reject(new Error(`'${data.title}'포스트는 '${data.category}' 카테고리가 아닙니다 !`))
    }

    return Promise.reject(new Error(`'${data.category}' 카테고리는 존재하지 않습니다 !`))
  }

  // Respond to client
  const respondToClient = data => {
    res.json({
      success: true,
      message: `'${data.category}' 의 '${data.title}' 포스트 불러오기 성공 !`,
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
  postExistCheck({ category: category.trim(), title: title.trim(), type })
    .then(postCategoryExistCheck)
    .then(respondToClient)
    .catch(onError)
}

/*
    POST /api/:category/:title
    {
      subTitle: string,
      mainText: string,
    }
    {
      'x-access-token': sessionStorage.getItem('token')
    }
*/
// Post create
exports.postCreate = (req, res) => {
  // Category, post's title, subTitle, and mainText of the post
  const { category, title } = req.params
  const { subTitle, mainText } = req.body

  // Check category is exist or not
  const categoryExistCheck = async data => {
    // find category
    const categoryData = await Category.findSameCategory(data.category)

    // if the category is real
    if (categoryData !== null) {
      // return promise adding category's _id
      return Promise.resolve({ ...data, CategoryID: categoryData.id })
    }
    return Promise.reject(new Error('추가할 포스트의 카테고리가 존재하지 않습니다 !'))
  }

  // Double check title
  const titleDoubleCheck = async data => {
    // Find Post
    const uniquePost = await Post.findPostRegex(data.category, data.title)

    // If the title is unique
    if (uniquePost === null) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('추가할 포스트의 제목이 중복되어 추가가 불가능 합니다 !'))
  }

  // Check title is 'admin'
  const titleAdminCheck = data => {
    if (data.title.toLowerCase() !== 'admin') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('포스트의 제목은 admin이 될 수 없습니다 !'))
  }

  // Check subTitle data exist or not
  const subTitleExistCheck = data => {
    if (data.subTitle === undefined) {
      return Promise.reject(new Error('추가할 포스트의 부제목이 존재하지 않습니다 !'))
    }
    if (data.subTitle.trim() === '') {
      return Promise.reject(new Error('추가할 포스트의 부제목이 존재하지 않습니다 !'))
    }

    return Promise.resolve({ ...data, subTitle: data.subTitle.trim() })
  }

  // Check mainText data exsit or not
  const mainTextExistCheck = data => {
    if (data.mainText === undefined) {
      return Promise.reject(new Error('추가할 포스트의 본문이 존재하지 않습니다 !'))
    }
    if (data.mainText.trim() === '') {
      return Promise.reject(new Error('추가할 포스트의 본문이 존재하지 않습니다 !'))
    }

    return Promise.resolve({ ...data, mainText: data.mainText.trim() })
  }

  // Create post method
  const postCreate = async data => {
    // Create Post
    const newPostData = await Post.createPost(data.CategoryID, data.title, data.subTitle, data.mainText)
    return Promise.resolve({ ...data, PostID: newPostData.id })
  }

  // Ref push to category's post's_id container / new posts _id
  const categoryRefPush = async data => {
    await Category.PostsRefPush(data.category, data.PostID)
    return Promise.resolve(data)
  }

  // Respond to client
  const respondToClient = data => {
    res.json({
      success: true,
      message: `'${data.title}' 포스트 추가 성공 ! `,
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
  categoryExistCheck({
    category: category.trim(),
    title: title.trim(),
    subTitle,
    mainText,
    CategoryID: null,
    PostID: null
  })
    .then(titleDoubleCheck)
    .then(titleAdminCheck)
    .then(subTitleExistCheck)
    .then(mainTextExistCheck)
    .then(postCreate)
    .then(categoryRefPush)
    .then(respondToClient)
    .catch(onError)
}

/*
    PUT /api/:category/:title
    {
      changeCategory: category
      changeTitle: string,
      changeSubTitle: string,
      changeMainText: string
    },
    {
      'x-access-token': sessionStorage.getItem('token')
    }
*/
// Post change
exports.postChange = async (req, res) => {
  // Params
  const { category, title } = req.params
  // Body
  const {
    changeCategory, changeTitle, changeSubTitle, changeMainText
  } = req.body

  // Check oldTitle is exist or not
  const oldTitleExistCheck = async data => {
    // Find post
    const paramsPostData = await Post.findPost(data.oldCategory, data.oldTitle)

    // If paramsPostData is exist
    if (paramsPostData !== null) {
      return Promise.resolve({ ...data, postData: paramsPostData, postID: paramsPostData.id })
    }

    return Promise.reject(new Error(`'${data.oldTitle}' 포스트가 존재하지 않아 변경이 불가능 합니다 !`))
  }

  // Check oldCategory is exist, or category of data.oldTitle
  const oldCategoryExistCheck = async data => {
    // If oldCategory is the category of data.postData
    if (data.postData.category !== null) {
      return Promise.resolve({ ...data, oldCategoryID: data.postData.category.id })
    }

    // Check paramsCategory is exist or not
    const paramsCategory = await Category.findSameCategory(data.oldCategory)
    if (paramsCategory !== null) {
      return Promise.reject(new Error(`'${data.oldCategory}' 카테고리에는 '${data.oldTitle}' 포스트가 없습니다 !`))
    }

    return Promise.reject(new Error(`'${data.oldCategory}' 는 존재하지 않는 카테고리 입니다 !`))
  }

  // Check new values is exist or not
  const bodyValueExistCheck = data => {
    const newCategory = data.newCategory !== undefined
    const newTitle = data.newTitle !== undefined
    const newSubTitle = data.newSubTitle !== undefined
    const newMainText = data.newMainText !== undefined

    if (newCategory && newTitle && newSubTitle && newMainText) {
      return Promise.reject(new Error('포스트 변경에 필요한 값이 불충분 합니다 !'))
    }

    if (
      data.newCategory.trim() === '' &&
      data.newTitle.trim() === '' &&
      data.newSubTitle.trim() === '' &&
      data.newMainText.trim() === ''
    ) {
      return Promise.reject(new Error('포스트 변경에 필요한 값이 불충분 합니다 !'))
    }

    return Promise.resolve(data)
  }

  // Check newTitle is exist or not
  const newTitleExistCheck = async data => {
    // Find title with Regex
    const bodyPostData = await Post.findPostRegex(data.newCategory, data.newTitle)

    // If the result is null or oldTitle.toLowerCase === newTitle.toLowerCase()
    if (bodyPostData === null || data.oldTitle.toLowerCase() === data.newTitle.toLowerCase()) {
      return Promise.resolve(data)
    }

    return Promise.reject(new Error(`'${data.newTitle}' 포스트 제목은 다른 포스트의 제목과 중복됩니다 !`))
  }

  // Check newTitle is 'admin' or not
  const newTitleAdminCheck = data => {
    // Check admin
    if (data.newTitle.toLowerCase() === 'admin') {
      return Promise.reject(new Error("포스트 이름은 'admin' 이 될 수 없습니다 !"))
    }

    return Promise.resolve(data)
  }

  // Check newCategory is exst or not
  const newCategoryExistCheck = async data => {
    // Find category
    const bodyCategoryData = await Category.findSameCategory(data.newCategory)

    // If newCategory is exist
    if (bodyCategoryData !== null) {
      // Return with newCategory _id
      return Promise.resolve({ ...data, newCategoryID: bodyCategoryData.id })
    }
    return Promise.reject(new Error(`'${data.newCategory}' 카테고리는 존재하지 않습니다 !`))
  }

  // check newSubTitle is exist or not
  const newSubTitleCheck = async data => {
    if (data.newSubTitle !== '') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('부제목 데이터가 없습니다 !'))
  }

  // Check newMainText is exist or not
  const newMainTextCheck = async data => {
    if (data.newMainText !== '') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error(' 텍스트가 없습니다 !'))
  }

  // Change post info
  const postChange = async data => {
    // Change post data
    // Push & Pop to category.posts []
    await Post.changePost(data.newCategoryID, data.oldTitle, data.newTitle, data.newSubTitle, data.newMainText)
    await Category.PostsRefPop(data.oldCategory, data.postID)
    await Category.PostsRefPush(data.newCategory, data.postID)

    return Promise.resolve(data)
  }

  // Respond to clicent
  const respondToClient = data => {
    res.json({
      success: true,
      message: `'${data.oldTitle}' 포스트가 '${data.newTitle}' 로 변경 되었습니다 !`,
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
  oldTitleExistCheck({
    oldCategory: category.trim(),
    oldTitle: title.trim(),
    newCategory: changeCategory,
    newTitle: changeTitle,
    newSubTitle: changeSubTitle,
    newMainText: changeMainText,
    oldCategoryID: null,
    newCategoryID: null,
    postID: null,
    postData: null
  })
    .then(oldCategoryExistCheck)
    .then(bodyValueExistCheck)
    .then(newTitleExistCheck)
    .then(newTitleAdminCheck)
    .then(newCategoryExistCheck)
    .then(newSubTitleCheck)
    .then(newMainTextCheck)
    .then(postChange)
    .then(respondToClient)
    .catch(onError)
}

/*
    DELETE /api/:category/:title
    {
        token,
        title,
    }
*/
// Post delete
exports.postDelete = (req, res) => {
  const { category, title } = req.params

  // Check data.title(req.params.title) is exist or not
  const postExistCheck = async data => {
    // Title data
    const postData = await Post.findPost(data.category, data.title)

    if (postData !== null) {
      // Return with postID
      return Promise.resolve({ ...data, post: postData, postID: postData.id })
    }
    return Promise.reject(new Error(`'${data.title}' 타이틀이 존재하지 않습니다 !`))
  }

  // Check data.category(req.params.category) exist, and have req.params.title(data.title)
  const categoryExistCheck = async data => {
    // if category has post
    if (data.post.category !== null) {
      return Promise.resolve(data)
    }

    // Check paramsCategory is exist or not
    const paramsCategory = await Category.findSameCategory(data.category)
    if (paramsCategory !== null) {
      return Promise.reject(new Error(`'${data.category}' 카테고리에는 '${data.title}' 포스트가 없습니다 !`))
    }

    // data.category is not category
    return Promise.reject(new Error(`'${data.category}' 카테고리는 존재하지 않는 카테고리 입니다 !`))
  }

  // Delete Post
  const postDelete = async data => {
    await Post.deletePost(data.title)
    await Category.PostsRefPop(data.category, data.postID)

    return Promise.resolve(data)
  }

  // Respond to client
  const respondToClient = data => {
    res.json({
      success: true,
      message: `'${data.title}' 포스트 삭제 성공 !`,
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
  postExistCheck({ category: category.trim(), title: title.trim(), postID: null })
    .then(categoryExistCheck)
    .then(postDelete)
    .then(respondToClient)
    .catch(onError)
}
