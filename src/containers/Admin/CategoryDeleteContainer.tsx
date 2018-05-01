import * as React from 'react'

import CategoryDelete from 'components/Templates/Admin/CategoryDelete'

import { CategoryActions, CategoryStateInside } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginLogined: boolean
  category: [CategoryStateInside]
  deleteCategoryValue: string
  CategoryActions: typeof CategoryActions
}

const CategoryDeleteContainer = (Props: Props) => {
  return (
    <CategoryDelete
      loginLogined={Props.loginLogined}
      category={Props.category}
      categoryLoad={Props.CategoryActions.getCategory}
      deleteCategoryValue={Props.deleteCategoryValue}
      deleteCategorySelect={Props.CategoryActions.deleteCategorySelect}
      deleteCategoryPending={Props.CategoryActions.deleteCategoryPending}
      deleteCategorySuccess={Props.CategoryActions.deleteCategorySuccess}
      deleteCategoryFailure={Props.CategoryActions.deleteCategoryFailure}
    />
  )
}

export default connect(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    category: Category.categoryCategory,
    deleteCategoryValue: Category.deleteCategoryValue
  }),
  dispatch => ({
    CategoryActions: bindActionCreators(CategoryActions, dispatch)
  })
)(CategoryDeleteContainer)
