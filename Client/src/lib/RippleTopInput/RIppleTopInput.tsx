import * as React from 'react'

import './RippleTopInput.css'
import { Input, Button } from 'reactstrap'
import { PostTopRipple } from 'store/modules/Ripple'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import { toast } from 'react-toastify'

import regExp from 'lib/RegExp'

interface Props {
  postTopRipple: (value: PostTopRipple) => Promise<any>
  addRippleStatePending: boolean
}

interface State {
  text?: string
  password?: string
  writer?: string
}

interface SubmitINFO {
  category: string
  title: string
  writer: string
  text: string
  password: string
  pending: boolean
}

class RippleInput extends React.Component<Props & RouteComponentProps<any>, State> {
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

    // If request is pending, return false
    const pendingCheck = (data: SubmitINFO) => {
      if (data.pending === true) {
        return Promise.reject(new Error(''))
      }

      return Promise.resolve(data)
    }

    // Value check function, if the data is null or '', return 0
    //                       if the data is exit, return 1
    const stringNullCheck = (data: string, ECode: string): { result: boolean; ECode: string } => {
      if (data.trim() === '') {
        return { result: false, ECode }
      }
      return { result: true, ECode }
    }

    // Value check function, by regExp
    // If data is right, return true
    // If data is not right, return false
    const stringRegExpCheck = (data: string, ECode: string): { result: boolean; ECode: string } => {
      if (regExp.test(data) === true) {
        return { result: false, ECode }
      }
      return { result: true, ECode }
    }

    // Writer name check
    const valueCheck = async (data: SubmitINFO): Promise<object> => {
      // Origin data
      const testArray = [
        { value: data.writer, type: 'regExp', errorM: '/_?_&_#' },
        { value: data.writer, type: 'null', errorM: 'Name' },
        { value: data.password, type: 'null', errorM: 'Password' },
        { value: data.text, type: 'null', errorM: 'Text' }
      ]

      // Contain test array
      const resultTestArray = testArray.map((object, i) => {
        if (object.type === 'regExp') {
          return stringRegExpCheck(object.value, object.errorM)
        }
        return stringNullCheck(object.value, object.errorM)
      })

      // If there is error, throw error
      for (const result of resultTestArray) {
        if (result.result === false) {
          return Promise.reject(new Error(result.ECode))
        }
      }

      return Promise.resolve(data)
    }

    // Request to server
    const requestToServer = (data: SubmitINFO): Promise<any> => {
      // Top ripple add
      return this.props
        .postTopRipple({
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
        })
        .catch((err: any) => {
          toast(err.response.data.message)
        })
    }

    // Error handler
    const onError = (err: Error): void => {
      if (err.message === 'Undefined') {
        toast('알 수 없는 에러 입니다 !')
      } else if (err.message === '/_?_&_#') {
        this.setState({
          writer: ''
        })
        this.userName.focus()
        toast("댓글 작성자의 이름에는 '/', '?', '&', '#' 특수기호 사용이 블가능 합니다")
      } else if (err.message === 'Name') {
        this.setState({
          writer: ''
        })
        this.userName.focus()
        toast('댓글 작성자의 이름을 입력해 주세요 !')
      } else if (err.message === 'Password') {
        this.setState({
          password: ''
        })
        this.userPassword.focus()
        toast('댓글의 비밀번호를 입력해 주세요 !')
      } else if (err.message === 'Text') {
        this.setState({
          text: ''
        })
        this.userText.focus()
        toast('댓글 내용을 입력해 주세요 !')
      }
    }

    // Url category title
    const categoryAndTitle = this.props.match.url.split('/')
    // Name type & (admin or user)

    // Promise
    pendingCheck({
      category: categoryAndTitle[1],
      title: categoryAndTitle[2],
      writer: this.state.writer,
      text: this.state.text,
      password: this.state.password,
      pending: this.props.addRippleStatePending
    })
      .then(valueCheck)
      .then(requestToServer)
      .catch(onError)
  }

  // Optimization rendering problem
  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextProps !== this.props || nextState !== this.state) {
      return true
    }
    return false
  }

  // Component Remove action
  public componentWillUnmount() {
    this.userName = null
    this.userPassword = null
    this.userText = null
  }

  public render() {
    return (
      <form onSubmit={this.handleSubmit} className="ripple-form">
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
}

export default withRouter(RippleInput)
