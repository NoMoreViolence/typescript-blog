import * as React from 'react'

import HeaderCategory from 'components/Templates/Header/HeaderCategory'

import { LoginActions } from 'store/modules/Login'
import { CategoryStateInside } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { StoreState } from 'store/modules'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface Props {
  Category: CategoryStateInside[]
  loginLogined: boolean
}

interface Method {
  logout: () => any
}

const HeaderCategoryContainer: React.SFC<Props & Method & RouteComponentProps<any>> = Props => (
  <HeaderCategory Category={Props.Category} Logout={Props.logout} Logined={Props.loginLogined} />
)

export default withRouter(
  connect<Props, Method, void>(
    ({ Category, Login }: StoreState) => ({
      loginLogined: Login.loginLogined,
      Category: Category.categoryCategory
    }),
    (dispatch: Dispatch) => ({
      logout: bindActionCreators(LoginActions.logout, dispatch)
    })
  )(HeaderCategoryContainer)
)
