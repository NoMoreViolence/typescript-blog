import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 페이지들
import Basic from 'components/Pages/Basic';
import Login from 'components/Pages/Login';
import Header from 'components/Pages/Header';
import Admin from 'components/Pages/Admin';

class App extends React.Component {
  // 토큰이 존재할 때 자동 로그인 실현

  public render() {
    return (
      <React.Fragment>
        <Basic />
        <ToastContainer />
        <Header />
        <Switch>
          <Route exact={true} path="/admin/login" component={Login} />
          <Route exact={true} path="/admin" component={Admin} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
