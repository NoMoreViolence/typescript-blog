const Post = require('./../../../models/Post')
const Category = require('./../../../models/Category')

/*
    GET /api/categories/posts
    {}
*/
// return all posts data
exports.allPostsTitleAndSubTitle = (req, res) => {
  // activate find all post method
  const findAllPostsTitleAndSubTitle = async data => {
    // find data
    const PostsData = await Post.findAllPostsTitleAndSubTitle()
    // return
    return Promise.resolve({ ...data, data: PostsData })
  }

  // check the post value is exist or not
  const allPostsDataCheck = data => {
    // if data exist
    if (data) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('모든 포스트가 존재하지 않습니다 !'))
  }

  // respond
  const respondToClient = data => {
    // return post data to client
    res.json({
      success: true,
      message: '모든 포스트의 타이틀과 서브 타이틀 불러오기에 성공 !',
      value: data
    })
  }

  // error handler
  const onError = err => {
    // return error
    res.status(409).json({
      success: false,
      message: err.message,
      value: []
    })
  }

  // Promise
  findAllPostsTitleAndSubTitle({ data: null })
    .then(allPostsDataCheck)
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

  // check req.params.category is '' or not
  const reqCatagoryValueCheck = data => {
    if (data.category !== '') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('카테고리 입력 데이터가 없습니다 !'))
  }

  // check req.params.title is '' or not
  const reqTitleValueCheck = data => {
    if (data.title !== '') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('포스트 입력 데이터가 없습니다 !'))
  }

  // excute Category.showPost() & return data
  const findPost = async data => {
    const postData = await Category.showPost(data.category, data.title)
    return Promise.resolve({ ...data, postData })
  }

  // check categoryData is exist => right category value
  const checkPostCategoryExist = data => {
    if (data.postData) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error(`'${data.category}' 카테고리가 존재하지 않습니다 !`))
  }

  // if the postData is exist => right title value
  const checkPostExist = data => {
    if (data.postData.posts.length !== 0) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error(`'${data.title}' 포스트가 존재하지 않습니다 !`))
  }

  // respond
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

  // error handler
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
// create Post
exports.postCreate = (req, res) => {
  // category, post's title, subTitle, and mainText of the post
  const { category, title } = req.params
  const { subTitle, mainText } = req.body

  // check category is exist or not
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

  // double check title
  const titleDoubleCheck = async data => {
    // if the title is unique
    if ((await Post.findPostRegex(data.title)) === null) {
      return Promise.resolve(data)
    }
    console.log('여기서 오류가 났네요')
    return Promise.reject(new Error('추가할 포스트의 제목이 중복되어 추가가 불가능 합니다 !'))
  }

  // check subTitle data exist or not
  const subTitleExistCheck = data => {
    if (data.subTitle !== '') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('추가할 포스트의 부제목이 존재하지 않습니다 !'))
  }

  // check mainText data exsit or not
  const mainTextExistCheck = data => {
    if (data.mainText !== '') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('추가할 포스트의 본문이 존재하지 않습니다 !'))
  }

  // create post method
  const postCreate = async data => {
    const newPostData = await Post.createPost(data.CategoryID, data.title, data.subTitle, data.mainText)
    return Promise.resolve({ ...data, PostID: newPostData.id })
  }

  // ref push to category's post's_id container / new posts _id
  const categoryRefPush = async data => {
    await Category.PostsRefPush(data.category, data.PostID)
    return Promise.resolve(data)
  }

  // respond
  const respondToClient = data => {
    res.json({
      success: true,
      message: `'${data.title}' 포스트 추가 성공 ! `,
      value: data
    })
  }

  // error handler
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
  const checkOldCategoryExist = async data => {
    // Find category
    const paramsCategory = await Category.findSameCategory(data.oldCategory)
    console.log(paramsCategory.id)
    // If category is exist
    if (paramsCategory !== null) {
      // Return with oldCategory _id
      return Promise.resolve({ ...data, oldCategoryID: paramsCategory.id })
    }
    return Promise.reject(new Error(`'${data.oldCategory}' 카테고리는 존재하지 않습니다 !`))
  }

  // Check oldTitle is exist or not
  const checkOldTitleExist = async data => {
    // Find post
    const paramsTitle = await Post.findPost(data.oldTitle)
    console.log(paramsTitle.id)
    // If post is exist
    if (paramsTitle !== null) {
      // Return with post _id
      return Promise.resolve({ ...data, postID: paramsTitle.id })
    }
    return Promise.reject(new Error(`'${data.oldTitle}' 포스트가 존재하지 않습니다 !`))
  }

  // Check newCategory is exist or not
  const checkNewCategoryExist = async data => {
    // Find category
    const bodyCategory = await Category.findSameCategory(data.newCategory)
    console.log(bodyCategory.id)
    if (bodyCategory !== null) {
      // Return with newCategory _id
      return Promise.resolve({ ...data, newCategoryID: bodyCategory.id })
    }
    return Promise.reject(new Error(`'${data.newCategory}' 카테고리는 존재하지 않습니다 !`))
  }

  // Check newTitle is exist or not
  const checkNewTitleExist = async data => {
    // Find post
    const bodyTitle = await Post.findPostRegex(data.newTitle)

    // Considering user doesn't change title
    if (bodyTitle === null || data.oldTitle.toLowerCase() === data.newTitle.toLowerCase()) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error(`'${data.newTitle}' 포스트 제목은은 다른 포스트의 제목과 중복됩니다 !`))
  }

  // check newSubTitle is exist or not
  const checkNewSubTitle = async data => {
    if (data.newSubTitle !== '') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('부제목 데이터가 없습니다 !'))
  }

  // Check newMainText is exist or not
  const checkNewMainText = async data => {
    if (data.newMainText !== '') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error(' 텍스트가 없습니다 !'))
  }

  // Change post info
  const changePost = async data => {
    // Change post data
    await Post.changePost(data.newCategoryID, data.oldTitle, data.newTitle, data.newSubTitle, data.newMainText)

    return Promise.resolve(data)
  }

  const categoryRefPushAndPop = async data => {
    await Category.PostsRefPop(data.oldCategory, data.PostID)

    return Promise.resolve(data)
  }

  // Respond to Clicent
  const respondToClient = data => {
    res.json({
      success: true,
      message: `'${data.oldTitle}' 포스트가 '${data.newTitle}' 로 변경 되었습니다 !`,
      value: [data]
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
  checkOldCategoryExist({
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
    .then(checkOldTitleExist)
    .then(checkNewCategoryExist)
    .then(checkNewTitleExist)
    .then(checkNewSubTitle)
    .then(checkNewMainText)
    .then(changePost)
    .then(categoryRefPushAndPop)
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
// 포스트 삭제
exports.delete = (req, res) => {
  const { category, title } = req.params
  // req.params.title._id
  let postID = null

  const deletePost = exists => {
    // there is category data
    if (exists) {
      // there is category & title datea
      if (exists.posts.length !== 0) {
        // return changeCategory's existence
        postID = exists.posts[0].id
        return Post.deletePost(title)
      }
      // title none
      throw new Error(`'${title}' 포스트가 존재하지 않습니다 !`)
    } else {
      // category none
      throw new Error(`'${category}' 카테고리가 존재하지 않습니다 !`)
    }
  }

  // pop deleted posts id
  const categoryRefPop = exists => {
    if (exists) {
      return Category.PostsRefPop(category, postID)
    }
    throw new Error(`${category} 삭제되지 않았습니다 !`)
  }

  const respond = () => {
    res.json({
      success: true,
      message: `'${title}' 포스트 삭제 성공 !`,
      value: `category: ${category}, title: ${title}`
    })
  }

  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message,
      value: []
    })
  }

  Category.showPost(category, title)
    .then(deletePost)
    .then(categoryRefPop)
    .then(respond)
    .catch(onError)
}
