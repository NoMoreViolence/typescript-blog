import * as React from 'react'

import CategoryAdd from 'components/Templates/Admin/CategoryAdd'

// category, post, login actions
import { CategoryActions } from 'store/modules/Category'
import { PostActions } from 'store/modules/Post'
import { LoginActions } from 'store/modules/Login'

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

const CategoryAddContainer: React.SFC<Props> = Props => (
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

export default connect(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    addCategoryInputValue: Category.addCategoryInputValue
  }),
  dispatch => ({
    CategoryActions: bindActionCreators(CategoryActions, dispatch),
    LoginActions: bindActionCreators(LoginActions, dispatch),
    PostActions: bindActionCreators(PostActions, dispatch)
  })
)(CategoryAddContainer)
