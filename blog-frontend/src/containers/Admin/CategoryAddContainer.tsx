import * as React from 'react'

import CategoryAdd from 'components/Templates/Admin/CategoryAdd'

// category, post, login actions
import { CategoryActions } from 'store/modules/Category'
import { PostActions } from 'store/modules/Post'
import { LoginActions } from 'store/modules/Login'

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginLogined: boolean
  addCategoryInputValue: string
  addCategoryPending: boolean
}

interface Method {
  // Category Actions
  getCategory: () => any
  addCategoryInputChange: (value: string) => void
  addCategory: (value: string) => any
  categoryDone: () => void
  // Post Actions
  postDone: () => void
  // Login Actions
  logout: () => void
}

const CategoryAddContainer: React.SFC<Props & Method> = Props => (
  <CategoryAdd
    loginLogined={Props.loginLogined}
    categoryLoad={Props.getCategory}
    addCategoryInputValue={Props.addCategoryInputValue}
    addCategoryInputChange={Props.addCategoryInputChange}
    addCategory={Props.addCategory}
    logout={Props.logout}
    categoryDone={Props.categoryDone}
    postDone={Props.postDone}
    pending={Props.addCategoryPending}
  />
)

export default connect<Props, Method, void>(
  ({ Login, Category }: StoreState) => ({
    loginLogined: Login.loginLogined,
    addCategoryInputValue: Category.addCategoryInputValue,
    addCategoryPending: Category.addCategoryPending
  }),
  (dispatch: Dispatch) => ({
    getCategory: bindActionCreators(CategoryActions.getCategory, dispatch),
    addCategoryInputChange: bindActionCreators(CategoryActions.addCategoryInputChange, dispatch),
    addCategory: bindActionCreators(CategoryActions.addCategory, dispatch),
    categoryDone: bindActionCreators(CategoryActions.categoryDone, dispatch),
    postDone: bindActionCreators(PostActions.postDone, dispatch),
    logout: bindActionCreators(LoginActions.logout, dispatch)
  })
)(CategoryAddContainer)
