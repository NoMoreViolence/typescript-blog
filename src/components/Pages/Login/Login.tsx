import * as React from 'react';
import LoginContainer from 'containers/Login/LoginContainer';

interface Push {
  push: Function;
}

interface Props {
  history: Push;
}

class Login extends React.Component<Props> {
  public render() {
    return <LoginContainer history={this.props.history} />;
  }
}

export default Login;
