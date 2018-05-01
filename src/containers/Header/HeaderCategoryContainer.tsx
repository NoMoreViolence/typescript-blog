import * as React from 'react'
// 헤더 카테고리
import HeaderCategory from 'components/Templates/Header/HeaderCategory'

import { LoginActions } from 'store/modules/Login'
import { CategoryStateInside } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

type Props = {
  // 메시지
  Category: [CategoryStateInside]
  loginActions: typeof LoginActions
  loginLogined: boolean
}

const HeaderCategoryContainer = (Props: Props) => {
  return (
    <HeaderCategory
      Category={Props.Category}
      Logout={Props.loginActions.logout}
      Logined={Props.loginLogined}
    />
  )
}

export default connect(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    Category: Category.categoryCategory
  }),
  dispatch => ({
    // 디스패치
    loginActions: bindActionCreators(LoginActions, dispatch)
  })
)(HeaderCategoryContainer)
