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
}

interface Method {
  handleChangeUsername: (value: string) => void
  handleChangePassword: (value: string) => void
  postLogin: (value: LoginInterface) => any
}

class LoginContainer extends React.PureComponent<Props & Method> {
  public render() {
    return (
      <Login
        handleChangeUsername={this.props.handleChangeUsername}
        loginUsername={this.props.loginUsername}
        handleChangePassword={this.props.handleChangePassword}
        loginPassword={this.props.loginPassword}
        postLogin={this.props.postLogin}
        loginStatusCode={this.props.loginStatusCode}
        loginType={this.props.loginType}
        loginLogined={this.props.loginLogined}
      />
    )
  }
}

export default connect<Props, Method, void>(
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
