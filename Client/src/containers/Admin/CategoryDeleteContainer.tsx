import * as React from 'react'

import CategoryDelete from 'components/Templates/Admin/CategoryDelete'

import { CategoryActions, CategoryStateInside } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginLogined: boolean
  category: [CategoryStateInside]
  deleteCategoryInputValue: string
  deleteCategorySelectValue: string
  CategoryActions: typeof CategoryActions
}

const CategoryDeleteContainer = (Props: Props) => {
  return (
    <CategoryDelete
      loginLogined={Props.loginLogined}
      category={Props.category}
      categoryLoad={Props.CategoryActions.getCategory}
      deleteCategoryInputValue={Props.deleteCategoryInputValue}
      deleteCategoryInputChange={Props.CategoryActions.deleteCategoryInputChange}
      deleteCategorySelectValue={Props.deleteCategorySelectValue}
      deleteCategorySelectChange={Props.CategoryActions.deleteCategorySelectChange}
      deleteCategoryPending={Props.CategoryActions.deleteCategoryPending}
      deleteCategorySuccess={Props.CategoryActions.deleteCategorySuccess}
      deleteCategoryFailure={Props.CategoryActions.deleteCategoryFailure}
      categoryDone={Props.CategoryActions.categoryDone}
    />
  )
}

export default connect(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    category: Category.categoryCategory,
    deleteCategoryInputValue: Category.deleteCategoryInputValue,
    deleteCategorySelectValue: Category.deleteCategorySelectValue
  }),
  dispatch => ({
    CategoryActions: bindActionCreators(CategoryActions, dispatch)
  })
)(CategoryDeleteContainer)
