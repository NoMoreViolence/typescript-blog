const Category = require('./../../../models/Category')
const Post = require('./../../../models/Post')
/*
    public
    GET /api/categories
    GET /api/:category
*/
// print All category
exports.showTitleAndSubTitle = (req, res) => {
  const { category } = req.params

  // All category Search data === data
  const response = data => {
    // respond to client with all category and all category data ( title, subTitle )
    if (category === 'categories') {
      res.json({
        success: true,
        message: '모든 카테고리 정보 불러오는 작업 성공 !',
        value: data
      })
      return
    }

    // if the category is fake or none
    if (data.length === 0) {
      throw new Error(`'${category}' 카테고리가 존재하지 않습니다 !`)
    }

    if (category !== 'categories') {
      // respond to client with category and category data ( title, subTitle )
      res.json({
        success: true,
        message: `'${category}' 카테고리 정보 불러오는 작업 성공 !`,
        value: data
      })
    }
  }

  // if Error
  const onError = err => {
    res.status(403).json({
      success: false,
      message: err.message,
      value: []
    })
  }

  // find Category
  Category.findCategoryOrCategories(category)
    .then(response)
    .catch(onError)
}

/*
    private
    POST /api/:category
    {

    },
    {
      'x-access-token':  sessionStorage.getItem('token')
    }
*/
// Create category
exports.categoryCreate = (req, res) => {
  const { category } = req.params

  console.log(category)

  // if there is same category, throws error.
  const create = value => {
    if (value) {
      throw new Error(`이미 '${category}' 가 존재합니다 !`)
    } else {
      return Category.createCategory(category)
    }
  }

  // respond to client with message & value
  const respond = value => {
    res.json({
      success: true,
      message: `'${category}' 카테고리가 생성 되었습니다 !`,
      value
    })
  }

  // respond error with err.message & none value
  const onError = err => {
    res.status(409).json({
      success: false,
      message: err.message,
      value: []
    })
  }

  // Promise
  Category.findSameCategory(category)
    .then(create)
    .then(respond)
    .catch(onError)
}

/*
    private
    PATCH /api/:category
    {
      'changeCategory': string
    },
    {
      'x-access-token': seesionStorage.getItem('token')
    }
*/
// change Category
exports.categoryChange = (req, res) => {
  // params.category, body.changeCategory
  const { category } = req.params
  const { changeCategory } = req.body

  // if changeCategory value is none, throw Error
  const trimCheck = exists => {
    if (changeCategory.trim() === '') {
      // there is no input body.changeCategory data
      throw new Error('입력값이 없습니다 !')
    }
    return exists
  }

  // category change Part
  const change = exists => {
    // if there is category to change
    if (exists) {
      console.log(`'${exists.category}' 카테고리가 '${changeCategory}' 로 변경 되었습니다 !`)
      // change Category
      return Category.changeCategory(category, changeCategory)
    }
    // there is no category to change
    throw new Error('변경할 카테고리가 존재하지 않습니다 !')
  }

  // response to client
  const respond = result => {
    res.json({
      success: true,
      message: `'${category}' 카테고리가 '${changeCategory}' 로 변경 되었습니다 !`,
      value: result
    })
  }

  // reponse error to client
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message,
      value: []
    })
  }

  // Promise
  Category.findSameCategory(category)
    .then(trimCheck)
    .then(change)
    .then(respond)
    .catch(onError)
}

/*
    DELETE /api/:category
    {

    },
    {
        'x-access-token': sessionStorage.getItem('token')
    }
*/
// delete Category
exports.categoryDelete = (req, res) => {
  // the category to delete
  const { category } = req.params

  // delete category
  const removeCategory = async exists => {
    if (exists) {
      // category delete
      console.log(`'${exists.category}' 카테고리가 삭제 되었습니다 !`)
      return await Category.deleteCategory(exists.category) // delete Category
    }
    // if there is no category to delete
    throw new Error('삭제할 카테고리가 존재하지 않습니다 !')
  }

  // delete posts
  const removePosts = categoryID =>
    // delte posts that has deleted category's _id
    Post.deletePostsOfDeletedCategory(categoryID)

  // respond to client
  const respond = data => {
    res.json({
      success: true,
      message: `'${category}' 카테고리가 삭제 되었습니다 !`,
      value: data
    })
  }

  // respond error to client
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message,
      value: []
    })
  }

  // Promise
  Category.findSameCategory(category)
    .then(removeCategory)
    .then(removePosts)
    .then(respond)
    .catch(onError)
}
