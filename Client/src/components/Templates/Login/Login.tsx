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
  // 로그인 메소드
  postLogin: Function
  // logined = true, notLogined = false
  loginStatusCode: number
  loginType: string
  loginLogined: boolean
}

const Login = withRouter<Props & RouteComponentProps<any>>(
  class Login extends React.Component<Props & RouteComponentProps<any>> {
    // Login Submit
    public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      // stopping form event
      e.preventDefault()

      const { loginUsername, loginPassword, postLogin, history } = this.props

      if (loginUsername !== '' && loginPassword !== '') {
        postLogin(loginUsername, loginPassword)
          .then((res: any) => {
            toast('관리자님 환영합니다 !')
            sessionStorage.setItem('token', res.value.data.token)
            history.push('/')
          })
          .catch((err: any) => {
            toast(err.response.data.message)
          })
      } else {
        if (loginUsername === '') {
          toast('아이디를 입력해 주세요')
        } else if (loginPassword === '') {
          toast('비밀번호를 입력해 주세요')
        }
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
