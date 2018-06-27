import * as React from 'react'
import Login from 'components/Templates/Login'

import { LoginActions } from 'store/modules/Login'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginStatusCode: number
  loginType: string
  loginLogined: boolean
  loginUsername: string
  loginPassword: string
  LoginActions: typeof LoginActions
}

const LoginContainer: React.SFC<Props> = Props => {
  return (
    <Login
      handleChangeUsername={Props.LoginActions.handleChangeUsername}
      loginUsername={Props.loginUsername}
      handleChangePassword={Props.LoginActions.handleChangePassword}
      loginPassword={Props.loginPassword}
      postLogin={Props.LoginActions.login}
      loginStatusCode={Props.loginStatusCode}
      loginType={Props.loginType}
      loginLogined={Props.loginLogined}
    />
  )
}

export default connect(
  ({ Login }: StoreState) => ({
    loginStatusCode: Login.loginStatusCode,
    loginType: Login.loginType,
    loginLogined: Login.loginLogined,
    loginUsername: Login.loginUsername,
    loginPassword: Login.loginPassword
  }),
  dispatch => ({
    // 디스패치
    LoginActions: bindActionCreators(LoginActions, dispatch)
  })
)(LoginContainer)
