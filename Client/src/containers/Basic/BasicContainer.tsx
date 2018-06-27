import * as React from 'react'

import Basic from 'components/Templates/Basic'

import { LoginActions } from 'store/modules/Login'
import { CategoryActions } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  CategoryActions: typeof CategoryActions
  LoginActions: typeof LoginActions
  loginLogined: boolean
}

const BasicContainer: React.SFC<Props> = Props => (
  <Basic
    loginLogined={Props.loginLogined}
    getLogin={Props.LoginActions.autoLogin}
    loadCategory={Props.CategoryActions.getCategory}
  />
)

export default connect(
  ({ Login, Category }: StoreState) => ({
    loginLogined: Login.loginLogined
  }),
  dispatch => ({
    LoginActions: bindActionCreators(LoginActions, dispatch),
    CategoryActions: bindActionCreators(CategoryActions, dispatch)
  })
)(BasicContainer)
