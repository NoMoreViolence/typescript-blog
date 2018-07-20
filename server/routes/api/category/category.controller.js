const Category = require('./../../../models/Category')
const Post = require('./../../../models/Post')
const Ripple = require('./../../../models/Ripple')

/*
    public
    GET /api/categories
    GET /api/:category
*/
// Print All category
exports.showTitleAndSubTitle = (req, res) => {
  const { category } = req.params

  // Category Check, if data is 'admin' throw error, because 'admin' is can't be a category Name
  const categoryNameAdminCheck = data => {
    // Right value
    if (data.requestCategory.toLowerCase() === 'admin') {
      // 'admin' throw error
      return Promise.reject(new Error(`'${data.requestCategory}' 는 관리자 이름의 카테고리라 존재할 수 없습니다 !`))
    }
    return Promise.resolve(data)
  }

  // Find Category
  const bringCategoryData = async data => {
    // If the request is all category
    if (data.requestCategory === 'categories') {
      const CategoryData = await Category.findAllCategoriesTitleAndSubTitle()
      return Promise.resolve({ ...data, category: CategoryData, type: 'ALL' })
    }

    // If the request is select category
    const CategoryData = await Category.findSomeCategorysTitleAndSubTitle(data.requestCategory)
    return Promise.resolve({ ...data, category: CategoryData, type: 'Select' })
  }

  // Check the category data is null or not
  const checkBringedCategoryData = data => {
    // Select
    if (data.type === 'Select' && data.category) {
      return Promise.resolve(data)
    }

    // All
    if (data.type === 'ALL') {
      return Promise.resolve(data)
    }

    return Promise.reject(new Error('검색하신 카테고리가 존재하지 않습니다 !'))
  }

  // Respond to client
  // All category Search data === data
  const respondToClient = data => {
    // Respond to client with all category and all category data ( title, subTitle )
    res.json({
      success: true,
      message: `'${data.requestCategory}' 카테고리 정보 가져오기 성공 !`,
      value: data.category
    })
  }

  // Error handler
  const onError = err => {
    res.status(403).json({
      success: false,
      message: err.message,
      value: []
    })
  }

  // Promise
  categoryNameAdminCheck({ requestCategory: category.trim(), category: null, type: null })
    .then(bringCategoryData)
    .then(checkBringedCategoryData)
    .then(respondToClient)
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
// Category create
exports.categoryCreate = (req, res) => {
  const { category } = req.params

  // Category name admin check
  const categoryNameAdminCheck = data => {
    // Right value
    if (data.category.toLowerCase() === 'admin') {
      // 'admin' throw error
      return Promise.reject(new Error(`'${data.category}' 이름의 카테고리는 생성이 불가능 합니다 !`))
    }
    return Promise.resolve(data)
  }

  // Category same name check
  const categoryNameSameCheck = async data => {
    // If same category name exists, throw error
    if ((await Category.findSameCategoryRegex(data.category)) !== null) {
      return Promise.reject(new Error(`'${data.category}' 이름의 카테고리가 이미 존재합니다 !`))
    }
    return Promise.resolve(data)
  }

  // Create category
  const categoryCreate = async data => {
    await Category.createCategory(data.category)
    return Promise.resolve(data)
  }

  // RespondToClient
  const respondToClient = data => {
    res.json({
      success: true,
      message: `'${data.category}' 카테고리 생성 완료 !`,
      value: data.category
    })
  }

  // Respond error with err.message & none value
  const onError = err => {
    res.status(409).json({
      success: false,
      message: err.message,
      value: []
    })
  }

  // Promise
  categoryNameAdminCheck({ category: category.trim() })
    .then(categoryNameSameCheck)
    .then(categoryCreate)
    .then(respondToClient)
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
// Category change
exports.categoryChange = (req, res) => {
  const { category } = req.params
  const { changeCategory } = req.body

  /*
    data.category => category
    data.changeCategory => changeCategory
  */

  // Check data.category is real exist using mongo db
  const oldCategoryExistCheck = async data => {
    // Find category
    const dataCategory = await Category.findSameCategory(data.category)
    // Check data is exist or not
    if (dataCategory === null) {
      return Promise.reject(new Error('변경할 카테고리가 존재하지 않습니다 !'))
    }
    return Promise.resolve(data)
  }

  // Check data.chnageCategory is not null
  const newCategoryNullCheck = data => {
    if (data.changeCategory === undefined) {
      return Promise.reject(new Error('새로운 카테고리 값이 존재하지 않습니다 !'))
    }
    if (data.changeCategory.trim() === '') {
      return Promise.reject(new Error('새로운 카테고리 값이 존재하지 않습니다 !'))
    }
    return Promise.resolve({ ...data, changeCategory: data.changeCategory.trim() })
  }

  // Check data.changeCategory.toLowerCase() is not 'admin'
  const newCategoryAdminCheck = data => {
    if (data.changeCategory.toLowerCase() === 'admin') {
      return Promise.reject(new Error('관리자 이름으로의 카테고리 변경은 불가능 합니다 !'))
    }
    return Promise.resolve(data)
  }

  // Check between oldCategory and changeCategory
  const bothCategorySameCheck = data => {
    if (data.category === data.changeCategory) {
      return Promise.reject(new Error('같은 이름으로의 카테고리 변경은 필요 없습니다 !'))
    }
    return Promise.resolve(data)
  }

  // Check new category is real new Category
  const newCategoryExistCheck = async data => {
    // TODO: ReadME
    // The reason why I write this code, : data.category.toLowerCase() === data.changeCategory.toLowerCase()
    // Because data.changeCategory is already Verified in past function =>
    // => data.category is not same with data.changeCategory
    if (
      (await Category.findSameCategoryRegex(data.changeCategory)) !== null &&
      data.category.toLowerCase() !== data.changeCategory.toLowerCase()
    ) {
      return Promise.reject(new Error('새로운 카테고리의 이름이 기존 다른 카테고리와 중복됩니다 !'))
    }
    return Promise.resolve(data)
  }

  // Category chagne using mongo db
  const categoryChange = async data => {
    await Category.changeCategory(data.category, data.changeCategory)

    return Promise.resolve(data)
  }

  // Response to client
  const respondToClient = data => {
    res.json({
      success: true,
      message: `'${data.category}' 가 '${data.changeCategory}' 로 변경이 완료됨 !`,
      value: [data.category, data.changeCategory]
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
  oldCategoryExistCheck({ category: category.trim(), changeCategory })
    .then(newCategoryNullCheck)
    .then(newCategoryAdminCheck)
    .then(bothCategorySameCheck)
    .then(newCategoryExistCheck)
    .then(categoryChange)
    .then(respondToClient)
    .catch(onError)
}

/*
    DELETE /api/:category?doubleCheck='value'
    {

    },
    {
        'x-access-token': sessionStorage.getItem('token')
    }
*/
// Category delete
exports.categoryDelete = (req, res) => {
  // The category to delete
  const { category } = req.params
  const { doubleCheck } = req.query

  // Check data.category is exist using mongo DB
  const categoryExistCheck = async data => {
    // Find category
    const dataCategory = await Category.findSameCategory(data.category)
    // Check req.params.category is exist or not
    if (dataCategory === null) {
      return Promise.reject(new Error('삭제할 카테고리가 존재하지 않습니다 !'))
    }

    return Promise.resolve({ ...data, categoryData: dataCategory })
  }

  // Compare between data.category and data.doubleCheck
  const categoryDoubleCheck = data => {
    if (data.category !== data.doubleCheck) {
      return Promise.reject(new Error('카테고리 중복 확인 실패 !'))
    }

    return Promise.resolve(data)
  }

  // Category delete using mongo db
  const categoryDelete = async data => {
    // TODO: ReadME
    // First, delete Category, and delete posts of categorys
    // Last, delete Ripple that has deleted categoryID
    await Category.deleteCategory(data.category)
    await Post.deletePostsOfDeletedCategory(data.categoryData.id)
    await Ripple.deleteAllByCategoryID(data.categoryData.id)

    return Promise.resolve(data)
  }

  // Response to client
  const respondToClient = data => {
    res.json({
      success: true,
      message: `'${data.category}' 카테고리가 삭제 되었습니다 !`,
      value: data.category
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
  categoryExistCheck({ category: category.trim(), doubleCheck: doubleCheck.trim(), categoryData: null })
    .then(categoryDoubleCheck)
    .then(categoryDelete)
    .then(respondToClient)
    .catch(onError)
}
