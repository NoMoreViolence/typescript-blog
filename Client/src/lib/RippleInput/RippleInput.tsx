import * as React from 'react'

import './RippleInput.css'
import { Input, Button } from 'reactstrap'
import { PostTopRipple, PostChildRipple, GetChildRipples, GetTopRipples } from 'store/modules/Ripple'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'

import regExp from 'lib/RegExp'

interface Props {
  type: string
  ObjectID: string
  loginLogined: boolean
  submitTopRipple: (value: PostTopRipple) => Promise<any>
  submitChildRipple: (value: PostChildRipple) => Promise<any>
  topRippleLoad: (value: GetTopRipples) => Promise<any>
  childRippleLoad: (value: GetChildRipples) => Promise<any>
}

interface SubmitINFO {
  adminOrUser: string
  topOrChild: string
  category: string
  title: string
  writer: string
  text: string
  password: string
  topID: string
}

class RippleInput extends React.Component<Props & RouteComponentProps<any>> {
  public adminText: any = null
  public userName: any = null
  public userPassword: any = null
  public userText: any = null

  public state = {
    text: '',
    password: '',
    writer: ''
  }

  // Input change
  public handleChange = (e: { target: HTMLInputElement }) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // Handle submit
  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Writer name check
    const valueCheck = (data: SubmitINFO): Promise<object> => {
      if (data.adminOrUser === 'admin') {
        //
      } else if (data.adminOrUser === 'user') {
        // If data.writer has '/' or '&' or '?', return true
        if (regExp.test(data.writer) === true) {
          return Promise.reject(new Error('User_Name_/_?_&'))
        }
        // Trim check
        if (data.writer.trim() === '') {
          return Promise.reject(new Error('User_Name'))
        }
        if (data.password.trim() === '') {
          return Promise.reject(new Error('User_Password'))
        }
        if (data.text.trim() === '') {
          return Promise.reject(new Error('User_Text'))
        }
        return Promise.resolve(data)
      }

      return Promise.reject(new Error('Undefined'))
    }

    // Request to server
    const requestToServer = (data: SubmitINFO): void => {
      // Admin
      if (data.adminOrUser === 'admin') {
        //
      }
      // User
      if (data.topOrChild === 'top') {
        // Top ripple add
        this.props
          .submitTopRipple({
            category: this.props.match.url.split('/')[1],
            title: this.props.match.url.split('/')[2],
            writer: this.state.writer,
            ripple: this.state.text,
            password: this.state.password
          })
          .then((res: any) => {
            toast(res.action.payload.data.message)

            // Data clear
            this.setState({
              text: '',
              password: '',
              writer: ''
            })

            // Top Ripple reload
            this.props.topRippleLoad({
              category: this.props.match.url.split('/')[1],
              title: this.props.match.url.split('/')[2]
            })
          })
          .catch((err: any) => {
            toast(err.response.data.message)
          })
      } else if (data.topOrChild === 'child') {
        // Child ripple add
        this.props
          .submitChildRipple({
            category: data.category,
            title: data.title,
            writer: data.writer,
            ripple: data.text,
            password: data.password,
            topID: this.props.ObjectID
          })
          .then((res: any) => {
            toast(res.action.payload.data.message)

            // Data clear
            this.setState({
              text: '',
              password: '',
              writer: ''
            })

            // Child Ripple reload
            this.props.childRippleLoad({
              category: this.props.match.url.split('/')[1],
              title: this.props.match.url.split('/')[2],
              topID: this.props.ObjectID
            })
          })
          .catch((err: any) => {
            toast(err.response.data.message)
          })
      }
    }

    // Error handler
    const onError = (err: Error): void => {
      if (err.message === 'Undefined') {
        toast('알 수 없는 에러 입니다 !')
      } else if (err.message === 'User_Name_/_?_&') {
        this.setState({
          text: ''
        })
        this.userName.focus()
        toast("댓글 작성자의 이름에는 '/', '?', '&' 특수기호 사용이 블가능 합니다")
      } else if (err.message === 'User_Name') {
        this.setState({
          writer: ''
        })
        this.userName.focus()
        toast('댓글 작성자의 이름을 입력해 주세요 !')
      } else if (err.message === 'User_Password') {
        this.setState({
          password: ''
        })
        this.userPassword.focus()
        toast('댓글의 비밀번호를 입력해 주세요 !')
      } else if (err.message === 'User_Text') {
        this.setState({
          text: ''
        })
        this.userText.focus()
        toast('댓글 내용을 입력해 주세요 !')
      }
    }

    // Url category title
    const categoryAndTitle = this.props.match.url.split('/')
    // name type & (admin or user)
    const AdminAndTopOrChild = e.currentTarget.name.split('/')

    // Promise
    valueCheck({
      adminOrUser: AdminAndTopOrChild[1],
      topOrChild: AdminAndTopOrChild[0],
      category: categoryAndTitle[1],
      title: categoryAndTitle[2],
      writer: this.state.writer,
      text: this.state.text,
      password: this.state.password,
      topID: this.props.ObjectID
    })
      .then(requestToServer)
      .catch(onError)
  }

  // Component Remove action
  public componentWillUnmount() {
    this.adminText = null
    this.userName = null
    this.userPassword = null
    this.userText = null
  }

  public render() {
    const adminCheck = (data: boolean): JSX.Element => {
      if (data === true) {
        return (
          <form onSubmit={this.handleSubmit} name={`${this.props.type}/admin`} className="ripple-form`">
            <div className="ripple-text-info">
              <Input
                name="text"
                type="textarea"
                className="ripple-textarea"
                placeholder="댓글의 내용을 입력해 주세요"
                value={this.state.text}
                onChange={this.handleChange}
                innerRef={ref => (this.adminText = ref)}
              />
              <Button color="danger" className="ripple-submit-button">
                댓글 작성하기 !
              </Button>
            </div>
          </form>
        )
      }
      return (
        <form onSubmit={this.handleSubmit} name={`${this.props.type}/user`} className="ripple-form">
          <div className="ripple-personal-info">
            <Input
              name="writer"
              type="text"
              className="ripple-input"
              placeholder="유저 이름을 입력해 주세요"
              value={this.state.writer}
              onChange={this.handleChange}
              innerRef={ref => (this.userName = ref)}
            />
            <Input
              name="password"
              type="password"
              className="ripple-password"
              placeholder="비밀번호를 입력해 주세요 - 수정, 삭제 시 사용"
              value={this.state.password}
              onChange={this.handleChange}
              innerRef={ref => (this.userPassword = ref)}
            />
          </div>

          <div className="ripple-text-info">
            <Input
              name="text"
              type="textarea"
              className="ripple-textarea"
              placeholder="댓글의 내용을 입력해 주세요"
              value={this.state.text}
              onChange={this.handleChange}
              innerRef={ref => (this.userText = ref)}
            />
            <Button color="primary" className="ripple-submit-button">
              댓글 작성하기 !
            </Button>
          </div>
        </form>
      )
    }
    return <React.Fragment>{adminCheck(this.props.loginLogined)}</React.Fragment>
  }
}

export default withRouter(RippleInput)
