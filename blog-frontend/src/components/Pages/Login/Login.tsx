import * as React from 'react'
import LoginContainer from 'containers/Login/LoginContainer'
import { LoadingComponentProps } from 'react-loadable'

class Login extends React.Component<LoadingComponentProps> {
  public render() {
    return <LoginContainer />
  }
}

export default Login
