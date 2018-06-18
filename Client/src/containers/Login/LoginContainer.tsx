import * as React from 'react'
import Login from 'components/Templates/Login'

// 운영자에게 보내는 메시지
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

class LoginContainer extends React.Component<Props> {
  public render() {
    return (
      <Login
        handleChangeUsername={this.props.LoginActions.handleChangeUsername}
        loginUsername={this.props.loginUsername}
        handleChangePassword={this.props.LoginActions.handleChangePassword}
        loginPassword={this.props.loginPassword}
        postLogin={this.props.LoginActions.login}
        loginStatusCode={this.props.loginStatusCode}
        loginType={this.props.loginType}
        loginLogined={this.props.loginLogined}
      />
    )
  }
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
