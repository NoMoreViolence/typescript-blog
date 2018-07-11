import * as React from 'react'

import CategoryDelete from 'components/Templates/Admin/CategoryDelete'

import { CategoryActions, CategoryStateInside, DeleteCategoryDeleteAPIInterface } from 'store/modules/Category'
import { PostActions } from 'store/modules/Post'
import { LoginActions } from 'store/modules/Login'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginLogined: boolean
  category: CategoryStateInside[]
  deleteCategoryInputValue: string
  deleteCategoryCategoryValue: string
  deleteCategoryPending: boolean
  // Category action
  getCategory: () => never
  deleteCategoryInputChange: (value: string) => never
  deleteCategorySelectChange: (value: string) => never
  deleteCategory: (value: DeleteCategoryDeleteAPIInterface) => never
  categoryDone: () => never
  // Post action
  postDone: () => never
  // Login action
  logout: () => never
}

const CategoryDeleteContainer: React.SFC<Props> = Props => (
  <CategoryDelete
    loginLogined={Props.loginLogined}
    category={Props.category}
    categoryLoad={Props.getCategory}
    deleteCategoryInputValue={Props.deleteCategoryInputValue}
    deleteCategoryInputChange={Props.deleteCategoryInputChange}
    deleteCategorySelectValue={Props.deleteCategoryCategoryValue}
    deleteCategorySelectChange={Props.deleteCategorySelectChange}
    deleteCategoryPending={Props.deleteCategoryPending}
    deleteCategory={Props.deleteCategory}
    logout={Props.logout}
    categoryDone={Props.categoryDone}
    postDone={Props.postDone}
  />
)

export default connect(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    category: Category.categoryCategory,
    deleteCategoryInputValue: Category.deleteCategoryInputValue,
    deleteCategoryCategoryValue: Category.deleteCategoryCategoryValue,
    deleteCategoryPending: Category.deleteCategoryPending
  }),
  dispatch => ({
    getCategory: bindActionCreators(CategoryActions.getCategory, dispatch),
    deleteCategoryInputChange: bindActionCreators(CategoryActions.deleteCategoryInputChange, dispatch),
    deleteCategorySelectChange: bindActionCreators(CategoryActions.deleteCategorySelectChange, dispatch),
    deleteCategory: bindActionCreators(CategoryActions.deleteCategory, dispatch),
    categoryDone: bindActionCreators(CategoryActions.categoryDone, dispatch),
    postDone: bindActionCreators(PostActions.postDone, dispatch),
    logout: bindActionCreators(LoginActions.logout, dispatch)
  })
)(CategoryDeleteContainer)
