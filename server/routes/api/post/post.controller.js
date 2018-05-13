const Post = require('./../../../models/Post')
const Category = require('./../../../models/Category')

/*
    GET /api/categories/posts
    {}
*/
// 모든 포스트의 정보 가져오기
exports.allPostsTitleAndSubTitle = (req, res) => {
  const respond = result => {
    if (result) {
      // 포스트가 한개라도 존재할 때
      res.json({
        success: true,
        result
      })
    } else {
      // 포스트가 존재하지 않을 때
      throw new Error('포스트가 존재하지 않습니다')
    }
  }

  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message,
      result: []
    })
  }

  Post.viewMainPage()
    .then(respond)
    .catch(onError)
}

/*
    GET /api/post/:postName
    {}
*/
// 특정 포스트의 정보 가져오기
exports.post = (req, res) => {
  const { title } = req.params

  // 타이틀 값 받아서 응답하는 부분
  const respond = result => {
    if (result) {
      res.json({
        success: true,
        message: 'search post success',
        result
      })
    } else {
      res.json({
        success: false,
        message: "can't find title",
        result: {
          _id: '',
          title: '',
          subTitle: '',
          mainText: '',
          comment: []
        }
      })
    }
  }

  // 에러
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    })
  }

  // 응답
  Post.checkTitle(title)
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
exports.create = (req, res) => {
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
      throw new Error(`${title}' 포스트가 이미 존재합니다, 다른 title명을 선택해 주세요 !`)
    }
    return Post.createPost()
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
    .then(respond)
    .catch(onError)
}

/*
    PUT /api/post/change
    {
        token,
        category,
        title,
        subTitle,
        mainText
    }
*/
// 포스트 수정
exports.change = (req, res) => {
  const {
    category, title, oldTitle, subTitle, mainText
  } = req.body

  // 옛날 타이틀로 조회해서 수정할 포스트가 있는지 확인
  const findSamePost = exists => {
    if (exists) {
      return Post.checkTitle(oldTitle)
    }
    throw new Error(`"${category}" 라는 카테고리 이름이 없습니다.`)
  }

  // 포스트 변경
  const motify = async exists => {
    if (exists) {
      await Post.Motify(category, title, oldTitle, subTitle, mainText)
      return exists
    }
    throw new Error(`"${title}" 포스트가 존재하지 않습니다`)
  }

  // 카테고리의 Ref 변경
  const update = async post => {
    // 옛날 카테고리의 post 상속을 변경
    await Category.update(
      await Post.find(
        { category: post.category },
        {
          title: 0,
          subTitle: 0,
          mainText: 0,
          category: 0,
          comment: 0,
          date: 0
        }
      ).exec(),
      post.category
    )
    // 현재 카테고리의 post 상속을 변경
    await Category.update(
      await Post.find(
        { category },
        {
          title: 0,
          subTitle: 0,
          mainText: 0,
          category: 0,
          comment: 0,
          date: 0
        }
      ).exec(),
      category
    )
    return true
  }

  const respond = () => {
    res.json({
      success: true,
      message: 'Motify Post Success'
    })
  }

  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    })
  }

  Category.findSameCategory(category)
    .then(findSamePost)
    .then(motify)
    .then(update)
    .then(respond)
    .catch(onError)
}

/*
    DELETE /api/post/delete
    {
        token,
        title,
    }
*/
// 포스트 삭제
exports.delete = (req, res) => {
  const { title } = req.body
  console.log(title)
  // 포스트 삭제
  const remove = async exists => {
    if (exists) {
      // 포스트는 삭제하고
      await Post.deletePost(title)
      // 그 포스트의 카테고리값을 전송
      return exists.category
    }
    throw new Error(`"${title}" 이라는 포스트가 존재하지 않습니다`)
  }

  // 카테고리 Ref 업데이트
  const update = async category =>
    // 현재 카테고리의 post 상속을 변경
    await Category.update(
      await Post.find(
        { category },
        {
          title: 0,
          subTitle: 0,
          mainText: 0,
          category: 0,
          comment: 0,
          date: 0
        }
      ).exec(),
      category
    )

  const respond = () => {
    res.json({
      success: true,
      message: `"${title}" 포스트의 삭제 성공`
    })
  }

  // 에러 상황일 때
  const onError = error => {
    res.status(409).json({
      success: false,
      message: error.message
    })
  }

  Post.checkTitle(title) // 존재하는 타이틀인지 체크
    .then(remove) // 진짜 있는 타이틀이면 삭제
    .then(update) // 삭제했기 때문에 없어진 카테고리의 포스트 Ref 재정의
    .then(respond) // 서버에 응답
    .catch(onError) // 에러 시
}
