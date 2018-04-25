import * as React from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'reactstrap';
import HeaderContainer from 'containers/Header/HeaderContainer';
import LoginContainer from 'containers/Login/LoginContainer';

interface Props {
  getLoginCheck: Function;
  Logined: boolean;
  loginToken: string;
}
class App extends React.Component<Props> {
  // 토큰이 존재할 때 자동 로그인 실현
  public componentDidMount() {
    // 일단 토큰 값이존재할 때만
    if (sessionStorage.getItem('token') !== null) {
      fetch('/api/auth/check', {
        method: 'GET',
        headers: {
          'x-access-token': `${sessionStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(res => {
          if (res.success === true) {
            // tslint:disable-next-line:no-console
            console.log('현재 관리자 상태 - App.tsx');
            toast('관리자 권한 획득, 환영합니다');
          } else {
            // tslint:disable-next-line:no-console
            console.log('비 정상적인 토큰 감지 - App.tsx');
            toast('올바른 방법을 통해 로그인해 주세요');
          }
        })
        .catch((error: string) => {
          // tslint:disable-next-line:no-console
          console.log('서버 오류로 인해 인증 실패');
          toast('서버의 오류로 인해서 로그인 실패');
          throw error;
        });
    } else {
      toast('환영합니다!');
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
