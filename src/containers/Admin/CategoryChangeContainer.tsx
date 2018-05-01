import * as React from 'react'

import CategoryChange from 'components/Templates/Admin/CategoryChange'

import { CategoryActions, CategoryStateInside } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginLogined: boolean
  category: [CategoryStateInside]
  changeCategoryValue: string
  CategoryActions: typeof CategoryActions
}

const CategoryChangeContainer = (Props: Props) => {
  return (
    <CategoryChange
      loginLogined={Props.loginLogined}
      category={Props.category}
      categoryLoad={Props.CategoryActions.getCategory}
      changeCategoryValue={Props.changeCategoryValue}
      changeCategorySelect={Props.CategoryActions.changeCategorySelect}
      changeCategoryPending={Props.CategoryActions.changeCategoryPending}
      changeCategorySuccess={Props.CategoryActions.changeCategorySuccess}
      changeCategoryFailure={Props.CategoryActions.changeCategoryFailure}
    />
  )
}

export default connect(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    category: Category.categoryCategory,
    changeCategoryValue: Category.changeCategoryValue
  }),
  dispatch => ({
    CategoryActions: bindActionCreators(CategoryActions, dispatch)
  })
)(CategoryChangeContainer)
