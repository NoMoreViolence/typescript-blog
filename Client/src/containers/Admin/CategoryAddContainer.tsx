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
  addCategoryPending: boolean
  // Category Actions
  getCategory: () => never
  addCategoryInputChange: (value: string) => never
  addCategory: (value: string) => never
  categoryDone: () => never
  // Post Actions
  postDone: () => never
  // Login Actions
  logout: () => never
}

const CategoryAddContainer: React.SFC<Props> = Props => (
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

export default connect(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    addCategoryInputValue: Category.addCategoryInputValue,
    addCategoryPending: Category.addCategoryPending
  }),
  dispatch => ({
    getCategory: bindActionCreators(CategoryActions.getCategory, dispatch),
    addCategoryInputChange: bindActionCreators(CategoryActions.addCategoryInputChange, dispatch),
    addCategory: bindActionCreators(CategoryActions.addCategory, dispatch),
    categoryDone: bindActionCreators(CategoryActions.categoryDone, dispatch),
    postDone: bindActionCreators(PostActions.postDone, dispatch),
    logout: bindActionCreators(LoginActions.logout, dispatch)
  })
)(CategoryAddContainer)
