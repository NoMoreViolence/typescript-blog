import * as React from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'reactstrap';
import HeaderContainer from 'containers/Header/HeaderContainer';
import LoginContainer from 'containers/Login/LoginContainer';

interface Props {
  handleChangeUsername: (username: string) => void;
  loginUsername: string;
  handleChangePassword: (password: string) => void;
  loginPassword: string;
  postLogin: (username: string, password: string) => void;
  getLoginCheck: (token: string | null) => void;
  Logined: boolean;
  loginPending: boolean;
  loginError: boolean;
}
class App extends React.Component<Props> {
  // 토큰이 존재할 때 자동 로그인 실현
  public componentDidMount() {
    const token = sessionStorage.getItem('token');

    if (token !== null) {
      this.props.getLoginCheck(token);
    }
  }

  public render() {
    return (
      <Container>
        <ToastContainer />
        <HeaderContainer />
        {this.props.Logined === false && (
          <Route exact={true} path="/admin/login" component={LoginContainer} />
        )}
      </Container>
    );
  }
}

export default App;
