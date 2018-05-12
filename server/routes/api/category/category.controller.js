const Category = require('./../../../models/Category')

/*
    public
    GET /api/categories
*/
// 모든 카테고리만 검색 후 출력
exports.allCategories = (req, res) => {
  // 카테고리 검색
  const findAllCategories = () => Category.findAllCategories()

  const response = data => {
    res.json({
      success: true,
      message: '모든 카테고리 불러오는 작업 성공',
      value: data
    })
  }

  const onError = err => {
    res.status(403).json({
      success: false,
      message: err.message,
      value: []
    })
  }

  // 카테고리를 찾는다
  findAllCategories()
    .then(response)
    .catch(onError)
}

/*
    public
    GET /api/:category
*/
// Bring post names of req.params.category
exports.selectedPostNames = (req, res) => {
  // the value of url params  => /api/:category
  const { category } = req.params

  // if category exist
  const search = exists => {
    if (exists) {
      return Category.findPostNames(category)
    }
    throw new Error('없는 카테고리 값 입니다 !')
  }

  const respond = result => {
    res.json({
      success: true,
      message: '특정 카테고리의 포스트들의 이름 가져오는 작업 성공 !',
      value: result
    })
  }

  // 에러가 생겼을 때
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message,
      value: []
    })
  }

  Category.findSameCategory(category)
    .then(search)
    .then(respond)
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
exports.create = (req, res) => {
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
// 카테고리 변경
exports.change = (req, res) => {
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

  Category.findSameCategory(category)
    .then(trimCheck)
    .then(change)
    .then(respond)
    .catch(onError)
}

/*
    DELETE /api/:category
    {
        'x-access-token': sessionStorage.getItem('token')
    }
*/
// 카테고리 삭제
exports.delete = (req, res) => {
  // the category to delete
  const { category } = req.params

  // category delete Part
  const remove = exists => {
    // there is category to delete
    if (exists) {
      // category delete
      console.log(`'${category}' 카테고리가 삭제 되었습니다 !`)
      return Category.deleteCategory(category) // 카테고리 삭제
    }
    // if there is no category to delete
    throw new Error('삭제할 카테고리가 존재하지 않습니다 !')
  }

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

  Category.findSameCategory(category)
    .then(remove)
    .then(respond)
    .catch(onError)
}
