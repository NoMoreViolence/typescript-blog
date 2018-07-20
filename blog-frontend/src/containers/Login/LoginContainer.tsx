import * as React from 'react'
import Login from 'components/Templates/Login'

import { LoginActions, LoginInterface } from 'store/modules/Login'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginStatusCode: number
  loginType: string
  loginLogined: boolean
  loginUsername: string
  loginPassword: string
  handleChangeUsername: (value: string) => never
  handleChangePassword: (value: string) => never
  postLogin: (value: LoginInterface) => never
}

const LoginContainer: React.SFC<Props> = Props => {
  return (
    <Login
      handleChangeUsername={Props.handleChangeUsername}
      loginUsername={Props.loginUsername}
      handleChangePassword={Props.handleChangePassword}
      loginPassword={Props.loginPassword}
      postLogin={Props.postLogin}
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
    handleChangeUsername: bindActionCreators(LoginActions.handleChangeUsername, dispatch),
    handleChangePassword: bindActionCreators(LoginActions.handleChangePassword, dispatch),
    postLogin: bindActionCreators(LoginActions.login, dispatch)
  })
)(LoginContainer)
