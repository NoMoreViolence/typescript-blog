import * as React from 'react';
import { Row, Col, Button, Form, Input } from 'reactstrap';
import './Login.css';
import { toast } from 'react-toastify';

interface Push {
  push: Function;
}

interface Props {
  handleChangeUsername: (username: string) => void;
  loginUsername: string;
  handleChangePassword: (password: string) => void;
  loginPassword: string;
  postLogined: (token: string | null) => void;
  postLoginFailed: () => void;
  getLoginCheck: (token: string | null) => void;
  Logined: boolean;
  loginToken: string;
  history: Push;
}

interface InputTarget {
  target: HTMLInputElement;
}

class Login extends React.Component<Props> {
  public handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.props.loginUsername,
        password: this.props.loginPassword
      }),
      mode: 'cors'
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === true) {
          // 로그인 성공을 알림
          toast('관리자님 환영합니다');
          sessionStorage.setItem('token', res.token);
          this.props.postLogined(sessionStorage.getItem('token'));
          this.props.history.push('/');
        } else {
          // 로그인 실패
          toast('로그인 실패');
        }
      })
      .catch(error => {
        throw error;
      });
  };

  // 글씨 변경 메소드
  public handleChange = (e: InputTarget) => {
    if (e.target.name === 'username') {
      this.props.handleChangeUsername(e.target.value);
    } else if (e.target.name === 'password') {
      this.props.handleChangePassword(e.target.value);
    }
  };

  public render() {
    const { loginUsername, loginPassword } = this.props;
    return (
      <div className="login-container">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button outline={true} color="primary" size="lg" disabled={true}>
              Admin Login
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form onSubmit={this.handleLogin}>
              <Input
                type="text"
                placeholder="Username"
                name="username"
                value={loginUsername}
                onChange={this.handleChange}
              />
              <Input
                type="password"
                placeholder="Password"
                name="password"
                value={loginPassword}
                onChange={this.handleChange}
              />
              <Button color="primary" size="lg" block={true}>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
