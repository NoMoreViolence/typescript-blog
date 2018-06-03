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
  const categoryNameAdminCheck = data => {
    // right value
    if (data.toLowerCase() !== 'admin') {
      return Promise.resolve(data)
    }
    // 'admin' throw error
    return Promise.reject(new Error(`'${data}' 는 관리자 이름의 카테고리라 존재할 수 없습니다 !`))
  }

  // find Category
  const bringCategoryData = data => {
    if (data === 'categories') return Category.findAllCategoriesTitleAndSubTitle()
    return Category.findSomeCategorysTitleAndSubTitle(data)
  }

  // check the category data is null or not
  const checkBringedCategoryData = data => {
    // if the data is null throw error
    if (data.length !== 0) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('검색하신 카테고리가 존재하지 않습니다 !'))
  }

  // All category Search data === data
  const responseToServer = data => {
    // respond to client with all category and all category data ( title, subTitle )
    res.json({
      success: true,
      message: `'${category}' 카테고리 정보 가져오기 성공 !`,
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
  categoryNameAdminCheck(category.trim())
    .then(bringCategoryData)
    .then(checkBringedCategoryData)
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

  // category text null check
  const categoryNullCheck = data => {
    if (data !== '') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('추가할 카테고리 값이 없습니다 !'))
  }

  // category name admin check
  const categoryNameAdminCheck = data => {
    // right value
    if (data.toLowerCase() !== 'admin') {
      return Promise.resolve(data)
    }
    // 'admin' throw error
    return Promise.reject(new Error(`'${data}' 이름의 카테고리는 생성이 불가능 합니다 !`))
  }

  // category same name check
  const categoryNameSameCheck = async data => {
    // if same category name exists, throw error
    if ((await Category.findSameCategoryRegex(data)) === null) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error(`'${data}' 이름의 카테고리가 이미 존재합니다 !`))
  }

  // create category
  const addNewCategory = async data => {
    await Category.createCategory(data)
    return Promise.resolve(data)
  }

  // respondToServer
  const respondToServer = data => {
    res.json({
      success: true,
      message: `'${data}' 카테고리 생성 완료 !`,
      value: data
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
  categoryNullCheck(category.trim())
    .then(categoryNameAdminCheck)
    .then(categoryNameSameCheck)
    .then(addNewCategory)
    .then(respondToServer)
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
  const { category } = req.params
  const { changeCategory } = req.body

  /*
    data[0] ==> oldCategory
    data[1] ==> newCategory
  */

  // check categoryOld is eixst
  const oldCategoryCheck = async data => {
    // if the categoryOld doesn't exist, throw error
    if ((await Category.findSameCategory(data[0])) !== null) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('변경하려는 카테고리가 존재하지 않습니다 !'))
  }

  // check categoryNew not exist
  const newCategoryCheck = async data => {
    // if categoryNew already exist, throw error
    if ((await Category.findSameCategory(data[1])) === null) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error(`'${data[1]}' 카테고리가 이미 존재하여 변경이 불가능 합니다 !`))
  }

  // if the category & changeCategory is same, doesn't need to change
  const categorySameCheck = async data => {
    // if category & changeCategory is same, throw error
    if (data[0] !== data[1]) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('현재 카테고리와 변경하려는 카테고리의 값이 같습니다 !'))
  }

  // change category
  const categoryChange = async data => {
    await Category.changeCategory(data[0], data[1])
    return Promise.resolve(data)
  }

  // respond to server
  const respondToServer = data => {
    res.json({
      success: true,
      message: `'${data[0]}' 카테고리가 '${data[1]}' 카테고리로 변경 되었습니다 !`,
      value: [data[0], data[1]]
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

  oldCategoryCheck([category, changeCategory])
    .then(newCategoryCheck)
    .then(categorySameCheck)
    .then(categoryChange)
    .then(respondToServer)
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
