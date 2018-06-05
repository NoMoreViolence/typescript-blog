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

  // error handler
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
  const categoryCreate = async data => {
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
    .then(categoryCreate)
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
    data.category => category
    data.changeCategory => changeCategory
  */

  // check data.category is real exist using mongo db
  const oldCategoryExistCheck = async data => {
    if ((await Category.findSameCategory(data.category)) !== null) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('변경할 카테고리가 존재하지 않습니다 !'))
  }

  // check data.chnageCategory is not null
  const newCategoryNullCheck = data => {
    if (data.changeCategory !== '') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('새로운 카테고리 값이 존재하지 않습니다 !'))
  }

  // check data.changeCategory.toLowerCase() is not 'admin'
  const newCategoryAdminCheck = data => {
    if (data.changeCategory.toLowerCase() !== 'admin') {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('관리자 이름으로의 카테고리 변경은 불가능 합니다 !'))
  }

  // check between oldCategory and changeCategory
  const bothCategorySameCheck = data => {
    if (data.category !== data.changeCategory) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('같은 이름으로의 카테고리 변경은 필요 없습니다 !'))
  }

  // check new category is real new Category
  const newCategoryExistCheck = async data => {
    // TODO: ReadME
    // the reason why I write this code, : data.category.toLowerCase() === data.changeCategory.toLowerCase()
    // because data.changeCategory is already Verified in past function =>
    // => data.category is not same with data.changeCategory
    if (
      (await Category.findSameCategoryRegex(data.changeCategory)) === null ||
      data.category.toLowerCase() === data.changeCategory.toLowerCase()
    ) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('새로운 카테고리의 이름이 기존 다른 카테고리와 중복됩니다 !'))
  }

  // category chagne using mongo db
  const categoryChange = async data => {
    await Category.changeCategory(data.category, data.changeCategory)
    return Promise.resolve(data)
  }

  // response
  const respondToServer = data => {
    res.json({
      success: true,
      message: `'${data.category}' 가 '${data.changeCategory}' 로 변경이 완료됨 !`,
      value: [data.category, data.changeCategory]
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
  oldCategoryExistCheck({ category, changeCategory })
    .then(newCategoryNullCheck)
    .then(newCategoryAdminCheck)
    .then(bothCategorySameCheck)
    .then(newCategoryExistCheck)
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

  // check data.category is exist using mongo DB
  const categoryExistCheck = async data => {
    if ((await Category.findSameCategory(data.category)) !== null) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('삭제할 카테고리가 존재하지 않습니다 !'))
  }

  // compare between data.category and data.doubleCheck
  const categoryDoubleCheck = data => {
    if (data.category === data.doubleCheck) {
      return Promise.resolve(data)
    }
    return Promise.reject(new Error('카테고리 중복 확인 실패 !'))
  }

  // category delete using mongo db
  const categoryDelete = async data => {
    // TODO: ReadME
    // First, delete Category, and delete Posts that has deleted categorys ID
    await Post.deletePostsOfDeletedCategory(await Category.deleteCategory(data.category))
    return Promise.resolve(data)
  }

  // response
  const respondToServer = data => {
    res.json({
      success: true,
      message: `'${data}' 카테고리가 삭제 되었습니다 !`,
      value: [data.category]
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
  categoryExistCheck({ category: category.trim(), doubleCheck: doubleCheck.trim() })
    .then(categoryDoubleCheck)
    .then(categoryDelete)
    .then(respondToServer)
    .catch(onError)
}
