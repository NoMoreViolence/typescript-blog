import * as React from 'react'
// 헤더 카테고리
import CategoryAdd from 'components/Templates/Admin/CategoryAdd'

import { CategoryActions } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginLogined: boolean
  CategoryActions: typeof CategoryActions
}

class CategoryAddContainer extends React.Component<Props> {
  public render() {
    return (
      <CategoryAdd
        loginLogined={this.props.loginLogined}
        categoryLoad={this.props.CategoryActions.getCategory}
        addCategorySuccess={this.props.CategoryActions.addCategorySuccess}
        addCategoryFailure={this.props.CategoryActions.addCategoryFailure}
      />
    )
  }
}

export default connect(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined
  }),
  dispatch => ({
    // 디스패치
    CategoryActions: bindActionCreators(CategoryActions, dispatch)
  })
)(CategoryAddContainer)
