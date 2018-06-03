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
  categoryNameAdminCheck(category)
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

  // category text null check
  const categoryNullCheck = data => {
    if (data !== '') {
      return new Promise(resolve => {
        resolve(data)
      })
    }
    return new Promise((resolve, reject) => {
      reject(new Error('추가할 카테고리 값이 없습니다 !'))
    })
  }

  // category name admin check
  const categoryNameAdminCheck = data => {
    // right value
    if (data.toLowerCase() !== 'admin') {
      return new Promise(resolve => {
        resolve(data)
      })
    }
    // 'admin' throw error
    return new Promise((resolve, reject) => {
      reject(new Error(`'${data}' 이름의 카테고리는 생성이 불가능 합니다 !`))
    })
  }

  // category same name check
  const categoryNameSameCheck = async data => {
    // if same category name exists, throw error
    if ((await Category.findSameCategory(data)) === null) {
      return new Promise(resolve => {
        resolve(data)
      })
    }
    return new Promise((resolve, reject) => {
      reject(new Error(`'${data}' 이름의 카테고리가 이미 존재합니다 !`))
    })
  }

  // create category
  const addNewCategory = async data => {
    await Category.createCategory(data)
    return new Promise(resolve => {
      resolve(data)
    })
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

  // check categoryOld is eixst
  const oldCategoryCheck = async (categoryOld, categoryNew) => {
    // if the categoryOld doesn't exist, throw error
    if ((await Category.findSameCategory(categoryOld)) !== null) {
      return new Promise(resolve => {
        resolve(categoryOld, categoryNew)
      })
    }
    return new Promise((resolve, reject) => {
      reject(new Error('변경하려는 카테고리가 존재하지 않습니다 !'))
    })
  }

  // check categoryNew not exist
  const newCategoryCheck = async (categoryOld, categoryNew) => {
    // if the categoryNew exist, throw error
    if ((await Category.findSameCategory(categoryNew)) === null) {
      return new Promise(resolve => {
        resolve(categoryOld, categoryNew)
      })
    }
    return new Promise((resolve, reject) => {
      reject(new Error(`'${categoryNew}' 카테고리가 이미 존재하여 변경이 불가능 합니다 !`))
    })
  }

  // if the category & changeCategory is same, doesn't need to change
  const categorySameCheck = async (categoryOld, categoryNew) => {
    // if category & changeCategory is same, throw error
    if (categoryOld !== categoryNew) {
      return new Promise(resolve => {
        resolve(categoryOld, categoryNew)
      })
    }
    return new Promise((resolve, reject) => {
      reject(new Error('현재 카테고리와 변경하려는 카테고리의 값이 같습니다 !'))
    })
  }

  // change category
  const categoryChange = async (categoryOld, categoryNew) => {
    await Category.changeCategory(categoryOld, categoryNew)
    return new Promise(resolve => {
      resolve(categoryOld, categoryNew)
    })
  }

  // respond to server
  const respondToServer = (categoryOld, categoryNew) => {
    res.json({
      success: true,
      message: `'${categoryOld}' 카테고리가 '${categoryNew}' 카테고리로 변경 되었습니다 !`,
      value: [categoryOld, categoryNew]
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

  oldCategoryCheck(category.trim(), changeCategory.trim())
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
