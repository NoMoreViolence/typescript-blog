import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'reactstrap';

// 로그인 페이지 컴포넌트
import Login from 'components/Pages/Login';

class App extends React.Component {
  // 토큰이 존재할 때 자동 로그인 실현

  public render() {
    return (
      <Container>
        <ToastContainer />
        <Switch>
          <Route exact={true} path="/admin/login" component={Login} />
        </Switch>
      </Container>
    );
  }
}

export default App;
