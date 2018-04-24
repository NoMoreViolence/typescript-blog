import * as React from 'react';
import App from 'components/App';

// 운영자에게 보내는 메시지
import { LoginActions } from 'store/modules/Login';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StoreState } from 'store/modules';

type Props = {
  // 메시지
  loginLogined: boolean;
  loginPending: boolean;
  loginError: boolean;
  LoginActions: typeof LoginActions;
  loginUsername: string;
  loginPassword: string;
};

class AppContainer extends React.Component<Props> {
  public render() {
    return (
      <App
        Logined={this.props.loginLogined}
        loginPending={this.props.loginPending}
        loginError={this.props.loginError}
        postLogin={this.props.LoginActions.postLogin}
        getLoginCheck={this.props.LoginActions.getLoginCheck}
        handleChangeUsername={this.props.LoginActions.handleChangeUsername}
        loginUsername={this.props.loginUsername}
        handleChangePassword={this.props.LoginActions.handleChangePassword}
        loginPassword={this.props.loginPassword}
      />
    );
  }
}

export default connect(
  ({ Login }: StoreState) => ({
    loginPending: Login.loginPending,
    loginError: Login.loginPending,
    loginLogined: Login.loginLogined,
    loginUsername: Login.loginUsername,
    loginPassword: Login.loginPassword
  }),
  dispatch => ({
    LoginActions: bindActionCreators(LoginActions, dispatch)
  })
)(AppContainer);
