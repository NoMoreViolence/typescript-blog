import * as React from 'react'
// 헤더 카테고리
import CategoryAdd from 'components/Templates/Admin/CategoryAdd'

// 카테고리 액션 & 로그인 액션
import { CategoryActions } from 'store/modules/Category'
import { LoginActions } from 'store/modules/Login'
import { PostActions } from 'store/modules/Post'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginLogined: boolean
  addCategoryInputValue: string
  CategoryActions: typeof CategoryActions
  PostActions: typeof PostActions
  LoginActions: typeof LoginActions
}

const CategoryAddContainer = (Props: Props) => {
  return (
    <CategoryAdd
      loginLogined={Props.loginLogined}
      categoryLoad={Props.CategoryActions.getCategory}
      addCategoryInputValue={Props.addCategoryInputValue}
      addCategoryInputChange={Props.CategoryActions.addCategoryInputChange}
      addCategory={Props.CategoryActions.addCategory}
      logout={Props.LoginActions.logout}
      categoryDone={Props.CategoryActions.categoryDone}
      postDone={Props.PostActions.postDone}
    />
  )
}

export default connect(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    addCategoryInputValue: Category.addCategoryInputValue
  }),
  dispatch => ({
    // 디스패치
    CategoryActions: bindActionCreators(CategoryActions, dispatch),
    LoginActions: bindActionCreators(LoginActions, dispatch),
    PostActions: bindActionCreators(PostActions, dispatch)
  })
)(CategoryAddContainer)
