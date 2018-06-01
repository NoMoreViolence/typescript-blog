const Post = require('./../../../models/Post')
const Category = require('./../../../models/Category')

/*
    GET /api/categories/posts
    {}
*/
// return all posts data
exports.allPostsTitleAndSubTitle = (req, res) => {
  const respond = result => {
    // return post data to client
    if (result) {
      res.json({
        success: true,
        value: result
      })
    } else {
      // if post data is not exists
      throw new Error('포스트가 존재하지 않습니다')
    }
  }

  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message,
      value: []
    })
  }

  // Promise
  Post.findAllPostsTitleAndSubTitle()
    .then(respond)
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

  const dummyData = {
    posts: [],
    category: ''
  }

  // return to client with post value
  const respond = result => {
    // there is post data
    if (result) {
      // there is title
      if (result.posts.length !== 0) {
        res.json({
          success: true,
          message: '포스트 불러오기 성공',
          value: { type, posts: result.posts, category: result.category }
        })
      } else {
        // title is not real
        throw new Error(`'${title}' 포스트가 존재하지 않습니다`)
      }
    } else {
      // if there is no data
      res.json({
        success: false,
        message: `'${category}' 카테고리가 존재하지 않습니다`,
        value: { dummyData, type }
      })
    }
  }

  // error, I dont' know
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message,
      value: { dummyData, type }
    })
  }

  // Promise
  Category.showPost(category, title)
    .then(respond)
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
  // this is the category's _id
  let categoryID = null

  // category double check
  const titleDoubleCheck = exists => {
    // if the category is real
    if (exists) {
      // confirm the category's _id
      categoryID = exists.id
      // return the title for check title double check
      return Post.checkTitle(title)
    }
    // if there is no ${category}
    throw new Error(`'${category}' 카테고리가 존재하지 않습니다 !`)
  }

  // create part
  const create = exists => {
    if (exists) {
      throw new Error(`'${title}' 포스트가 이미 존재합니다, 다른 타이틀명을 선택해 주세요 !`)
    }
    return Post.createPost(categoryID, title, subTitle, mainText)
  }

  // category Ref Update
  const categoryRefPush = data => {
    // if the post data is exist
    if (data) {
      // update category posts _id
      return Category.PostsRefPush(category, data.id)
    }
    throw new Error('포스트 생성 과정 중 에러 발생 !')
  }

  const respond = data => {
    res.json({
      success: true,
      message: `'${title}' 포스트가 생성 되었습니다 !`,
      value: data
    })
  }

  const onError = err => {
    res.status(409).json({
      success: false,
      message: err.message,
      value: []
    })
  }

  Category.findSameCategory(category)
    .then(titleDoubleCheck)
    .then(create)
    .then(categoryRefPush)
    .then(respond)
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
