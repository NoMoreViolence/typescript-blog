import * as React from 'react'

import HeaderCategory from 'components/Templates/Header/HeaderCategory'

import { LoginActions } from 'store/modules/Login'
import { CategoryStateInside } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  Category: CategoryStateInside[]
  loginActions: typeof LoginActions
  loginLogined: boolean
}

const HeaderCategoryContainer: React.SFC<Props> = Props => (
  <HeaderCategory Category={Props.Category} Logout={Props.loginActions.logout} Logined={Props.loginLogined} />
)

export default connect(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    Category: Category.categoryCategory
  }),
  dispatch => ({
    loginActions: bindActionCreators(LoginActions, dispatch)
  })
)(HeaderCategoryContainer)
