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

  // category Check, if data is 'admin' throw error, because 'admin' is can't be a category Name
  const categoryNameCheck = data => {
    // right value
    if (data !== 'admin') {
      return new Promise(resolve => {
        resolve(data)
      })
    }
    // 'admin' throw error
    return new Promise((resolve, reject) => {
      reject(new Error(`there is no ${data} category`))
    })
  }

  // find Category
  const bringCategoryData = data => {
    if (data === 'categories') return Category.findAllCategoriesTitleAndSubTitle()
    return Category.findSomeCategorysTitleAndSubTitle(data)
  }

  // All category Search data === data
  const responseToServer = data => {
    // respond to client with all category and all category data ( title, subTitle )
    res.json({
      success: true,
      message: `call '${category}' success`,
      value: data
    })
  }

  // if Error
  const onError = err => {
    res.status(403).json({
      success: false,
      message: err.message,
      value: []
    })
  }

  // Promise
  categoryNameCheck(category)
    .then(bringCategoryData)
    .then(responseToServer)
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
  const changeCategoryCheck = exists => {
    if (exists) {
      return Category.findSameCategory(changeCategory)
    }
    throw new Error(`'${category}' 카테고리가 존재하지 않습니다 !`)
  }

  // category change Part
  const change = exists => {
    // if there is category to change
    if (exists) {
      // there is no category to change
      throw new Error(`'${changeCategory}' 카테고리가 이미 존재해서 변경이 불가능 합니다 !`)
    }
    // change Category
    return Category.changeCategory(category, changeCategory)
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
    .then(changeCategoryCheck)
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
  const { doubleCheck } = req.query

  // delete category
  const removeCategory = exists => {
    console.log(exists.category)
    if (exists) {
      // category Double Check Success
      if (exists.category === doubleCheck) {
        // category delete
        console.log(`'${exists.category}' 카테고리가 삭제 되었습니다 !`)
        return Category.deleteCategory(exists.category) // delete Category
      }
      // category Double Check Failed
      throw new Error('카테고리 중복 체크 실패 !')
    }
    // if there is no category to delete
    throw new Error('삭제할 카테고리가 존재하지 않습니다 !')
  }

  // delete posts
  const removePosts = categoryID =>
    // delte posts that has deleted category's _id
    Post.deletePostsOfDeletedCategory(categoryID)

  // respond to client
  const respond = data =>
    res.json({
      success: true,
      message: `'${category}' 카테고리가 삭제 되었습니다 !`,
      value: data
    })

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
