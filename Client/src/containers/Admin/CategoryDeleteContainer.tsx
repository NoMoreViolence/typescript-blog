import * as React from 'react'

import CategoryDelete from 'components/Templates/Admin/CategoryDelete'

import { LoginActions } from 'store/modules/Login'
import { CategoryActions, CategoryStateInside } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginLogined: boolean
  category: CategoryStateInside[]
  deleteCategoryInputValue: string
  deleteCategoryCategoryValue: string
  CategoryActions: typeof CategoryActions
  LoginActions: typeof LoginActions
}

const CategoryDeleteContainer = (Props: Props) => {
  return (
    <CategoryDelete
      loginLogined={Props.loginLogined}
      category={Props.category}
      categoryLoad={Props.CategoryActions.getCategory}
      deleteCategoryInputValue={Props.deleteCategoryInputValue}
      deleteCategoryInputChange={Props.CategoryActions.deleteCategoryInputChange}
      deleteCategoryCategoryValue={Props.deleteCategoryCategoryValue}
      deleteCategoryCategoryChange={Props.CategoryActions.deleteCategoryCategoryChange}
      deleteCategory={Props.CategoryActions.deleteCategory}
      logout={Props.LoginActions.logout}
      categoryDone={Props.CategoryActions.categoryDone}
    />
  )
}

export default connect(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    category: Category.categoryCategory,
    deleteCategoryInputValue: Category.deleteCategoryInputValue,
    deleteCategoryCategoryValue: Category.deleteCategoryCategoryValue
  }),
  dispatch => ({
    CategoryActions: bindActionCreators(CategoryActions, dispatch),
    LoginActions: bindActionCreators(LoginActions, dispatch)
  })
)(CategoryDeleteContainer)
