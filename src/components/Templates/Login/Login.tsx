import * as React from 'react'
import { Container, Row, Col, Button, Form, Input } from 'reactstrap'
import './Login.css'
import { toast } from 'react-toastify'
import { withRouter, RouteComponentProps } from 'react-router'

// onChange Input Element
interface InputTarget {
  target: HTMLInputElement
}

// LoginContainer Props
interface Props {
  // username, password, onchange
  handleChangeUsername: Function
  loginUsername: string
  handleChangePassword: Function
  loginPassword: string
  // login success method
  postLogined: Function
  postLoginFailed: Function
  // loginCheck
  getLoginCheck: Function
  // logined = true, notLogined = false
  Logined: boolean
}

const Login = withRouter<Props & RouteComponentProps<any>>(
  class Login extends React.Component<Props & RouteComponentProps<any>> {
    // Login Submit
    public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      // stopping form event
      e.preventDefault()

      const { loginUsername, loginPassword } = this.props

      if (loginUsername !== '' && loginPassword !== '') {
        fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: loginUsername,
            password: loginPassword
          }),
          mode: 'cors'
        })
          .then(res => res.json())
          .then(res => {
            if (res.message === true) {
              // 로그인 성공
              sessionStorage.setItem('token', res.token)
              this.props.postLogined()
              // tslint:disable-next-line:no-console
              console.log('로그인 성공 - Login.tsx')
              toast('환영합니다 관리자님 !')
              // URL 이동
              this.props.history.push('/')
            } else {
              toast('아이디와 비밀번호가 일치하지 않습니다')
              this.props.postLoginFailed()
            }
          })
          .catch(error => {
            // tslint:disable-next-line:no-console
            console.log(error.message)
            this.props.postLoginFailed()
            toast('서버의 오류로 로그인에 실패했습니다')
          })
      } else {
        toast('아이디와 비밀번호를 모두 입력해 주세요')
      }
    }

    // 글자 변경 메소드
    public handleChange = (e: InputTarget) => {
      if (e.target.name === 'username') {
        this.props.handleChangeUsername(e.target.value)
      } else if (e.target.name === 'password') {
        this.props.handleChangePassword(e.target.value)
      }
    }

    public render() {
      return (
        <Container className="login-form">
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Button outline={true} color="primary" size="lg" disabled={true}>
                Admin Login
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Form onSubmit={this.handleSubmit}>
                <Input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={this.props.loginUsername}
                  onChange={this.handleChange}
                />
                <Input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.props.loginPassword}
                  onChange={this.handleChange}
                />
                <Button color="primary" size="lg" block={true}>
                  Login
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )
    }
  }
)

export default Login
