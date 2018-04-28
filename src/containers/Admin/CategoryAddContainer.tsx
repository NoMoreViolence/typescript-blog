import * as React from 'react'
// 헤더 카테고리
import CategoryAdd from 'components/Templates/Admin/CategoryAdd'

import { CategoryStateInside, CategoryActions } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  Category: [CategoryStateInside]
  loginLogined: boolean
  CategoryActions: typeof CategoryActions
}

class CategoryAddContainer extends React.Component<Props> {
  public render() {
    return (
      <CategoryAdd
        Category={this.props.Category}
        loginLogined={this.props.loginLogined}
      />
    )
  }
}

export default connect(
  ({ Category, Login }: StoreState) => ({
    Category: Category.categoryCategory,
    loginLogined: Login.loginLogined
  }),
  dispatch => ({
    // 디스패치
    CategoryActions: bindActionCreators(CategoryActions, dispatch)
  })
)(CategoryAddContainer)
