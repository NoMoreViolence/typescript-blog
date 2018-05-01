const Category = require('./../../../models/Category')

/*
    GET /api/category/all
    {

    }
*/
// 모든 카테고리만 검색 후 출력
exports.all = (req, res) => {
  const show = () => {
    return Category.findAll()
  }

  // respond to the client
  const respond = result => {
    res.json({
      success: true,
      message: 'View All Categories',
      category: result
    })
  }

  // 에러가 생겼을 때
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    })
  }

  show() // 실행
    .then(respond) // 응답
    .catch(onError) // 에러
}

/*
    GET /api/post/postNames/:categoryName
    {}
*/
// 특정 카테고리를 선택했을 때의 그 카테고리의 포스트 이름만 가져오게 하는 함수: 오픈 API
exports.postNames = (req, res) => {
  const { categoryName } = req.params

  // 카테고리가 존재할 때 그에 맞는 포스트 찾기
  const search = exists => {
    if (exists) {
      return Category.findPostNames(categoryName)
    } else {
      throw new Error('없는 카테고리 값 입니다')
    }
  }

  const respond = result => {
    res.json({
      success: true,
      message: 'Succeeded in finding names of posts',
      result
    })
  }

  // 에러가 생겼을 때
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    })
  }

  Category.findSameCategory(categoryName)
    .then(search)
    .then(respond)
    .catch(onError)
}

/*
    POST /api/category/create
    {
        token,
        category
    }
*/
// 카테고리 생성
exports.create = (req, res) => {
  const { category } = req.body

  // 중복된 카테고리나, 입력값이 없을 때 오류를 보냄
  const create = exists => {
    if (exists) {
      throw new Error('입력값이 없거나 중복된 값 입니다')
    } else {
      return Category.createCategory(category) // 카테고리 생성
    }
  }

  // 응답
  const respond = () => {
    res.json({
      success: true,
      message: 'Create Category Success',
      category
    })
  }

  // 에러가 생겼을 때
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    })
  }

  Category.findSameCategory(category) // 중복 카테고리 찾기
    .then(create) // 중복 카테고리가 없으면 새 카테고리 생성 OR 만들지 않음
    .then(respond) // 상황에 따라 응답
    .catch(onError) // 오류 처리
}

/*
    PATCH /api/category/change
    {
        token,
        category,
        changeCategory
    }
*/
// 카테고리 변경
exports.change = (req, res) => {
  const { category, changeCategory } = req.body

  const trimCheck = exists => {
    if (changeCategory.trim() === '') {
      // 변경할 카테고리가 없음
      throw new Error('입력값이 없습니다')
    }
    return exists
  }

  // 카테고리 변경 부분
  const change = exists => {
    if (exists) {
      console.log(`${exists.category} will be changeed to ${changeCategory}`)
      // 카테고리 변경
      return Category.changeCategory(category, changeCategory) // 카테고리 삭제
    } else {
      // 변경할 카테고리가 없음
      throw new Error('바꿀 카테고리가 존재하지 않습니다')
    }
  }

  // 응답
  const respond = result => {
    res.json({
      success: true,
      message: `Change Category Success => ${category} to ${changeCategory}`,
      oldCategory: category,
      newCategory: changeCategory,
      result
    })
  }

  // 에러가 생겼을 때
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    })
  }

  Category.findSameCategory(category)
    .then(trimCheck)
    .then(change)
    .then(respond)
    .catch(onError)
}

/*
    DELETE /api/category/delete
    {
        token,
        category
    }
*/
// 카테고리 삭제
exports.delete = (req, res) => {
  const { category, categoryDoubleCheck } = req.body

  const doubleCheck = exist => {
    if (category === categoryDoubleCheck) return exist
    throw new Error('같은 입력값이 아닙니다')
  }

  // 카테고리 삭제 부분
  const remove = exists => {
    console.log(`${exists.category} will be deleted`)
    if (exists) {
      // 카테고리 삭제
      return Category.deleteCategory(category) // 카테고리 삭제
    } else {
      // 삭제할 카테고리가 없음
      throw new Error('삭제할 카테고리가 없습니다')
    }
  }

  // 응답
  const respond = () => {
    res.json({
      success: true,
      message: 'Delete Category Success',
      category
    })
  }

  // 에러가 생겼을 때
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    })
  }

  Category.findSameCategory(category)
    .then(doubleCheck)
    .then(remove)
    .then(respond)
    .catch(onError)
}
