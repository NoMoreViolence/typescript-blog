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
  const respondToServer = data => {
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
    .then(respondToServer)
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
    return Promise.reject(new Error('카테고리가 존재하지 않습니다 !'))
  }

  // if the postData is exist => right title value
  const checkPostExist = data => {
    if (data.postData.posts.length !== 0) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('포스트가 존재하지 않습니다 !'))
  }

  // respond
  const respondToServer = data => {
    res.json({
      success: true,
      message: '포스트 불러오기 성공 !',
      value: { type, posts: data.postData.posts, category: data.postData.category }
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
  reqCatagoryValueCheck({ category: category.trim(), title: title.trim(), postData: null })
    .then(reqTitleValueCheck)
    .then(findPost)
    .then(checkPostCategoryExist)
    .then(checkPostExist)
    .then(respondToServer)
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
    return Promise.reject(new Error('추가할 포스트의 제목이 중복되어 삭제가 불가능 합니다 !'))
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
  const respondToServer = data => {
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
    .then(respondToServer)
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
// 포스트 수정
exports.postChange = async (req, res) => {
  // :category, :title
  const { category, title } = req.params
  // body data
  const {
    changeCategory, changeTitle, subTitle, mainText
  } = req.body

  let postID = null
  let changeCategoryID = null

  const dummyData = {}

  // check category & title is exist
  const categoryAndTitleCheck = exists => {
    // there is category data
    if (exists) {
      // there is category & title datea
      if (exists.posts.length !== 0) {
        // return changeCategory's existence
        postID = exists.posts[0].id
        return Category.findSameCategory(changeCategory)
      }
      // title none
      throw new Error(`'${title}' 포스트가 존재하지 않습니다`)
    } else {
      // category none
      throw new Error(`'${category}' 카테고리가 존재하지 않습니다`)
    }
  }

  // check changeCategory is exist
  const changeCategoryCheck = exists => {
    // if changeCategory is exist
    if (exists) {
      changeCategoryID = exists.id
      // return changeTitle's existence
      return Post.findPost(changeTitle)
    }
    // changeCategory none
    throw new Error(`'${changeCategory}' 가 존재하지 않아 변경이 불가능 합니다 !`)
  }

  // check changeTitle is exist
  const changeTitleCheckAndChangePost = exists => {
    // if changeTitle is exist
    if (exists) {
      // Duplicate changeTitle
      throw new Error(`'${changeTitle}' 타이틀은 이미 존재하는 타이틀이라 변경이 불가능 합니다 !`)
    } else if (subTitle === '') {
      throw new Error('SubTitle 란이 비어 있습니다 !')
    } else if (mainText === '') {
      throw new Error('MainText 란이 비어 있습니다 !')
    }

    // return changePost()
    return Post.changePost(changeCategoryID, title, changeTitle, subTitle, mainText)
  }

  // category & changeCategory Ref Update
  const categoryRefUpdate = async () => {
    await Category.PostsRefPop(category, postID)
    await Category.PostsRefPush(changeCategory, postID)
    return Category.showPost(changeCategory, changeTitle)
  }

  // Post change Success
  const respond = data => {
    res.json({
      success: true,
      message: `'${title}' 포스트 변경 성공 !`,
      value: data
    })
  }

  // error, I dont' know
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message,
      value: dummyData
    })
  }

  // Promise
  Category.showPost(category, title)
    .then(categoryAndTitleCheck)
    .then(changeCategoryCheck)
    .then(changeTitleCheckAndChangePost)
    .then(categoryRefUpdate)
    .then(respond)
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
