import * as React from 'react'
// 헤더 카테고리
import CategoryAdd from 'components/Templates/Admin/CategoryAdd'

import { CategoryActions } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginLogined: boolean
  addCategoryInputValue: string
  CategoryActions: typeof CategoryActions
}

const CategoryAddContainer = (Props: Props) => {
  return (
    <CategoryAdd
      loginLogined={Props.loginLogined}
      categoryLoad={Props.CategoryActions.getCategory}
      addCategoryInputValue={Props.addCategoryInputValue}
      addCategoryInputChange={Props.CategoryActions.addCategoryInputChange}
      addCategoryPending={Props.CategoryActions.addCategoryPending}
      addCategorySuccess={Props.CategoryActions.addCategorySuccess}
      addCategoryFailure={Props.CategoryActions.addCategoryFailure}
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
    CategoryActions: bindActionCreators(CategoryActions, dispatch)
  })
)(CategoryAddContainer)
