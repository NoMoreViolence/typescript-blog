import * as React from 'react'

import Basic from 'components/Templates/Basic'

import { LoginActions, AutoLoginInterface } from 'store/modules/Login'
import { CategoryActions } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  autoLogin: (value: AutoLoginInterface) => never
  loadCategory: () => never
  loginLogined: boolean
}

const BasicContainer: React.SFC<Props> = Props => (
  <Basic loginLogined={Props.loginLogined} getLogin={Props.autoLogin} loadCategory={Props.loadCategory} />
)

export default connect(
  ({ Login, Category }: StoreState) => ({
    loginLogined: Login.loginLogined
  }),
  dispatch => ({
    autoLogin: bindActionCreators(LoginActions.autoLogin, dispatch),
    loadCategory: bindActionCreators(CategoryActions.getCategory, dispatch)
  })
)(BasicContainer)
