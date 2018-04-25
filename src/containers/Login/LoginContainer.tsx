import * as React from 'react';
import Login from 'components/Templates/Login';

// 운영자에게 보내는 메시지
import { LoginActions } from 'store/modules/Login';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StoreState } from 'store/modules';

interface Push {
  push: Function;
}

interface Props {
  loginLogined: boolean;
  loginUsername: string;
  loginPassword: string;
  LoginActions: typeof LoginActions;
  history: Push;
}

class LoginContainer extends React.Component<Props> {
  public render() {
    return (
      <Login
        handleChangeUsername={this.props.LoginActions.handleChangeUsername}
        loginUsername={this.props.loginUsername}
        handleChangePassword={this.props.LoginActions.handleChangePassword}
        loginPassword={this.props.loginPassword}
        postLogined={this.props.LoginActions.postLogined}
        postLoginFailed={this.props.LoginActions.postLoginFailed}
        getLoginCheck={this.props.LoginActions.getLoginCheck}
        Logined={this.props.loginLogined}
        history={this.props.history}
      />
    );
  }
}

export default connect(
  ({ Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    loginUsername: Login.loginUsername,
    loginPassword: Login.loginPassword
  }),
  dispatch => ({
    // 디스패치
    LoginActions: bindActionCreators(LoginActions, dispatch)
  })
)(LoginContainer);
