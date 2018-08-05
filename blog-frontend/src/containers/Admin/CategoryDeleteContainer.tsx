import * as React from 'react'

import CategoryDelete from 'components/Templates/Admin/CategoryDelete'

import { CategoryActions, CategoryStateInside, DeleteCategoryDeleteAPIInterface } from 'store/modules/Category'
import { PostActions } from 'store/modules/Post'
import { LoginActions } from 'store/modules/Login'

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginLogined: boolean
  category: CategoryStateInside[]
  deleteCategoryInputValue: string
  deleteCategoryCategoryValue: string
  deleteCategoryPending: boolean
}

interface Method {
  // Category action
  getCategory: () => any
  deleteCategoryInputChange: (value: string) => void
  deleteCategorySelectChange: (value: string) => void
  deleteCategory: (value: DeleteCategoryDeleteAPIInterface) => any
  categoryDone: () => void
  // Post action
  postDone: () => void
  // Login action
  logout: () => void
}

const CategoryDeleteContainer: React.SFC<Props & Method> = Props => (
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

export default connect<Props, Method, void>(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    category: Category.categoryCategory,
    deleteCategoryInputValue: Category.deleteCategoryInputValue,
    deleteCategoryCategoryValue: Category.deleteCategorySelectValue,
    deleteCategoryPending: Category.deleteCategoryPending
  }),
  (dispatch: Dispatch) => ({
    getCategory: bindActionCreators(CategoryActions.getCategory, dispatch),
    deleteCategoryInputChange: bindActionCreators(CategoryActions.deleteCategoryInputChange, dispatch),
    deleteCategorySelectChange: bindActionCreators(CategoryActions.deleteCategorySelectChange, dispatch),
    deleteCategory: bindActionCreators(CategoryActions.deleteCategory, dispatch),
    categoryDone: bindActionCreators(CategoryActions.categoryDone, dispatch),
    postDone: bindActionCreators(PostActions.postDone, dispatch),
    logout: bindActionCreators(LoginActions.logout, dispatch)
  })
)(CategoryDeleteContainer)
