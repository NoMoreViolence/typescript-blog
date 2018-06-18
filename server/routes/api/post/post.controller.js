const Post = require('./../../../models/Post')
const Category = require('./../../../models/Category')

/*
    GET /api/categories/posts
    {}
*/
// Return all posts data
exports.allPostsTitleAndSubTitle = (req, res) => {
  // Activate find all post method
  const findAllPostsTitleAndSubTitle = async () => {
    // Find data
    const PostsData = await Post.findAllPostsTitleAndSubTitle()
    // Return
    return Promise.resolve(PostsData)
  }

  // Respond to client
  const respondToClient = data => {
    // Return post data to client
    res.json({
      success: true,
      message: '모든 포스트의 타이틀과 서브 타이틀 불러오기에 성공 !',
      value: data
    })
  }

  // Error handler
  const onError = err => {
    // Return error
    res.status(409).json({
      success: false,
      message: err.message,
      value: []
    })
  }

  // Promise
  findAllPostsTitleAndSubTitle(null)
    .then(respondToClient)
    .catch(onError)
}

/*
    GET /api/:category/:title
    {}
*/
// Bring the data of :title
exports.showPost = (req, res) => {
  const { category, title } = req.params
  const { type } = req.query

  // Check req.params.category is '' or not
  const reqCatagoryValueCheck = data => {
    if (data.category.toLowerCase() !== 'admin') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error("'admin' 카테고리는 존재하지 않습니다 !"))
  }

  // Check req.params.title is '' or not
  const reqTitleValueCheck = data => {
    if (data.title.toLowerCase() !== 'admin') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error("'admin' 포스트는 존재하지 않습니다 !"))
  }

  // Excute Category.showPost() & return data
  const findPost = async data => {
    const postData = await Category.showPost(data.category, data.title)
    return Promise.resolve({ ...data, postData })
  }

  // Check categoryData is exist => right category value
  const checkPostCategoryExist = data => {
    if (data.postData) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error(`'${data.category}' 카테고리가 존재하지 않습니다 !`))
  }

  // If the postData is exist => right title value
  const checkPostExist = data => {
    if (data.postData.posts.length !== 0) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error(`'${data.title}' 포스트가 존재하지 않습니다 !`))
  }

  // Respond to client
  const respondToClient = data => {
    res.json({
      success: true,
      message: '포스트 불러오기 성공 !',
      value: {
        type,
        posts: data.postData.posts,
        category: data.postData.category
      }
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
  reqCatagoryValueCheck({
    category: category.trim(),
    title: title.trim(),
    postData: null
  })
    .then(reqTitleValueCheck)
    .then(findPost)
    .then(checkPostCategoryExist)
    .then(checkPostExist)
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
    const uniquePost = await Post.findPostRegex(data.title)

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
    if (data.subTitle !== '') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('추가할 포스트의 부제목이 존재하지 않습니다 !'))
  }

  // Check mainText data exsit or not
  const mainTextExistCheck = data => {
    if (data.mainText !== '') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('추가할 포스트의 본문이 존재하지 않습니다 !'))
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
    subTitle: subTitle.trim(),
    mainText: mainText.trim(),
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

  // Check oldCategory is exist or not
  const oldCategoryExistCheck = async data => {
    // Find category
    const paramsCategory = await Category.findSameCategory(data.oldCategory)

    // If category is exist
    if (paramsCategory !== null) {
      // Return with oldCategory _id
      return Promise.resolve({ ...data, oldCategoryID: paramsCategory.id })
    }
    return Promise.reject(new Error(`'${data.oldCategory}' 카테고리는 존재하지 않습니다 !`))
  }

  // Check oldTitle is exist or not
  const oldTitleExistCheck = async data => {
    // Find post
    const paramsTitle = await Post.findPost(data.oldTitle)

    // If post is exist
    if (paramsTitle !== null) {
      // Return with post _id
      return Promise.resolve({ ...data, postID: paramsTitle.id })
    }
    return Promise.reject(new Error(`'${data.oldTitle}' 포스트가 존재하지 않습니다 !`))
  }

  // Check newCategory is exist or not
  const newCategoryExistCheck = async data => {
    // Find category
    const bodyCategory = await Category.findSameCategory(data.newCategory)

    // If newCategory is exist
    if (bodyCategory !== null) {
      // Return with newCategory _id
      return Promise.resolve({ ...data, newCategoryID: bodyCategory.id })
    }
    return Promise.reject(new Error(`'${data.newCategory}' 카테고리는 존재하지 않습니다 !`))
  }

  // Check newTitle is exist or not
  const newTitleExistCheck = async data => {
    // Find post
    const bodyTitle = await Post.findPostRegex(data.newTitle)

    // Considering user doesn't change title
    if (bodyTitle === null || data.oldTitle.toLowerCase() === data.newTitle.toLowerCase()) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error(`'${data.newTitle}' 포스트 제목은은 다른 포스트의 제목과 중복됩니다 !`))
  }

  // Check newTitle is 'admin' or not
  const newTitleAdminCheck = data => {
    if (data.newTitle.toLowerCase() !== 'admin') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error("포스트 이름은 'admin' 이 될 수 없습니다 !"))
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
  oldCategoryExistCheck({
    oldCategory: category.trim(),
    oldTitle: title.trim(),
    newCategory: changeCategory.trim(),
    newTitle: changeTitle.trim(),
    newSubTitle: changeSubTitle.trim(),
    newMainText: changeMainText.trim(),
    oldCategoryID: null,
    newCategoryID: null,
    postID: null
  })
    .then(oldTitleExistCheck)
    .then(newCategoryExistCheck)
    .then(newTitleExistCheck)
    .then(newTitleAdminCheck)
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
exports.delete = (req, res) => {
  const { category, title } = req.params

  // Check req.params.category is exist or not
  const categoryExistCheck = async data => {
    // Category data
    const categoryData = await Category.findSameCategory(data.category)

    if (categoryData !== null) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error(`'${data.category}' 카테고리는 존재하지 않습니다 !`))
  }

  // Check req.params.title is exist or not
  const titleExistCheck = async data => {
    // Title data
    const postData = await Post.findPost(data.title)

    if (postData !== null) {
      // Return with postID
      return Promise.resolve({ ...data, postID: postData.id })
    }
    return Promise.reject(new Error(`'${data.title}' 타이틀이 존재하지 않습니다 !`))
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
  categoryExistCheck({ category: category.trim(), title: title.trim(), postID: null })
    .then(titleExistCheck)
    .then(postDelete)
    .then(respondToClient)
    .catch(onError)
}
