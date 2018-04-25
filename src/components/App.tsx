import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 로그인 페이지 컴포넌트
import Login from 'components/Pages/Login';
import Header from 'components/Pages/Header';

class App extends React.Component {
  // 토큰이 존재할 때 자동 로그인 실현

  public render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Header />
        <Switch>
          <Route exact={true} path="/admin/login" component={Login} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
