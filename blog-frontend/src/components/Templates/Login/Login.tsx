import * as React from 'react'

import { LoginInterface } from 'store/modules/Login'

import { AxiosPromise } from 'axios'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import './Login.css'
import { toast } from 'react-toastify'

// LoginContainer Props
interface Props {
  // username, password
  loginUsername: string
  loginPassword: string
  // logined = true, notLogined = false
  loginStatusCode: number
  loginType: string
  loginLogined: boolean
}

interface Method {
  handleChangeUsername: (value: string) => void
  handleChangePassword: (value: string) => void
  postLogin: (value: LoginInterface) => AxiosPromise<any>
}

// onChange Input Element
interface InputTarget {
  target: HTMLInputElement
}

const Login = withRouter<Props & Method & RouteComponentProps<any>>(
  class Login extends React.PureComponent<Props & Method & RouteComponentProps<any>> {
    // Ref
    public ID: any = null
    public PW: any = null

    // Login Submit
    public handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      // stopping form event
      e.preventDefault()

      const { loginUsername, loginPassword, postLogin, history } = this.props

      // Value check function, if the data is null or '', return 0
      //                       if the data is exit, return 1
      const stringNullCheck = (data: string): boolean => {
        if (data.trim() === '') {
          return false
        }
        return true
      }

      // username & password check
      const valueCheck = (data: LoginInterface): Promise<object> => {
        const usernameCheck = stringNullCheck(data.username)
        const passwordCheck = stringNullCheck(data.password)

        if (!usernameCheck) {
          return Promise.reject(new Error('ID'))
        }

        if (!passwordCheck) {
          return Promise.reject(new Error('PW'))
        }

        return Promise.resolve({ username: data.username, password: data.password })
      }

      // Request
      const requestToServer = (data: LoginInterface): void => {
        postLogin({ username: data.username, password: data.password })
          .then((res: any) => {
            toast('관리자님 환영합니다 !', { type: 'success' })
            sessionStorage.setItem('token', res.value.data.token)
            history.push('/')
          })
          .catch((err: any) => {
            if (err.response.status === 500) {
              toast('서버가 응답하지 않습니다 !', { type: 'error' })
            }
            toast(err.response.data.message, { type: 'error' })
          })
      }

      // Error handler
      const onError = (err: Error): void => {
        if (err.message === 'ID') {
          toast('ID를 입력해 주세요 !', { type: 'error' })
          this.ID.focus()
        }

        if (err.message === 'PW') {
          toast('비밀번호를 입력해 주세요 !', { type: 'error' })
          this.PW.focus()
        }
      }

      // Promise
      valueCheck({ username: loginUsername, password: loginPassword })
        .then(requestToServer)
        .catch(onError)
    }

    // Handle change
    public handleChange = (e: InputTarget): void => {
      this.props['handleChange' + e.target.name](e.target.value)
    }

    public render(): JSX.Element {
      return (
        <div className="login-container">
          <form onSubmit={this.handleSubmit}>
            <div className="login-form">
              <input
                type="text"
                placeholder="Username"
                name="Username"
                className="primary-input login-input"
                value={this.props.loginUsername}
                onChange={this.handleChange}
                ref={ref => (this.ID = ref)}
              />
              <input
                type="password"
                placeholder="Password"
                name="Password"
                className="primary-input login-input"
                value={this.props.loginPassword}
                onChange={this.handleChange}
                ref={ref => (this.PW = ref)}
              />
              <button className="primary login-button">Login</button>
            </div>
          </form>
        </div>
      )
    }
  }
)

export default Login
