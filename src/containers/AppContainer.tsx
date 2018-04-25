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
  loginToken: string;
  LoginActions: typeof LoginActions;
};

class AppContainer extends React.Component<Props> {
  public render() {
    return (
      <App
        Logined={this.props.loginLogined}
        getLoginCheck={this.props.LoginActions.getLoginCheck}
        loginToken={this.props.loginToken}
      />
    );
  }
}

export default connect(
  ({ Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    loginToken: Login.loginToken
  }),
  dispatch => ({
    LoginActions: bindActionCreators(LoginActions, dispatch)
  })
)(AppContainer);
