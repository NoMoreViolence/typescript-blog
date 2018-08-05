import * as React from 'react'

import Basic from 'components/Templates/Basic'

import { LoginActions, AutoLoginInterface } from 'store/modules/Login'
import { CategoryActions } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginLogined: boolean
}

interface Method {
  autoLogin: (value: AutoLoginInterface) => any
  loadCategory: () => any
}

const BasicContainer: React.SFC<Props & Method> = Props => (
  <Basic loginLogined={Props.loginLogined} getLogin={Props.autoLogin} loadCategory={Props.loadCategory} />
)

export default connect<Props, Method, void>(
  ({ Login }: StoreState) => ({
    loginLogined: Login.loginLogined
  }),
  (dispatch: Dispatch) => ({
    autoLogin: bindActionCreators(LoginActions.autoLogin, dispatch),
    loadCategory: bindActionCreators(CategoryActions.getCategory, dispatch)
  })
)(BasicContainer)
