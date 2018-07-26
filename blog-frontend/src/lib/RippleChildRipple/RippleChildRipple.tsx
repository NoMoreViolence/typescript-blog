import * as React from 'react'

import { toast } from 'react-toastify'

import { PatchChildRipple, ChildMode, DeleteChildRipple } from 'store/modules/Ripple'

interface Props {
  // Top Ripple data
  writer: string
  text: string
  date: number
  topNumber: number
  childNumber: number
  topID: string
  rippleID: string
  // URL
  category: string
  title: string
  // ripple mode key & child Ripples number
  // Ripple mode
  childChangeMode: boolean
  childDeleteMode: boolean
  childMoreRippleView: boolean
  childMoreRippleViewMessage: string
  // Mode change
  changeChildChangeMode: (value: ChildMode) => boolean
  changeChildDeleteMode: (value: ChildMode) => boolean
  changeChildMoreViewMode: (value: ChildMode) => boolean
  // Action
  changeChildRipple: (value: PatchChildRipple) => Promise<object>
  changeRippleStatePending: boolean
  deleteChildRipple: (value: DeleteChildRipple) => Promise<object>
  deleteRippleStatePending: boolean
}

interface State {
  text?: string
  passwordToChange?: string
  passwordToDelete?: string
}

interface ChangeRipple {
  category: string
  title: string
  writer: string
  text: string
  password: string
  topID: string
  rippleID: string
  pending: boolean
}

interface DeleteRipple {
  category: string
  title: string
  writer: string
  password: string
  topID: string
  rippleID: string
  pending: boolean
}

class RippleChildRipple extends React.Component<Props, State> {
  // State
  public state = {
    // Child Text
    text: this.props.text,
    passwordToChange: '',
    passwordToDelete: ''
  }

  // Handle ripple change value
  public handleChange = (e: { target: HTMLInputElement }): void => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // Handle ripple change value
  public handleChangeTextarea = (e: { target: HTMLTextAreaElement }): void => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // Handle ripple action button
  public handleButtonActionChange = (e: { currentTarget: HTMLButtonElement }) => {
    this.props[e.currentTarget.name]({ top: this.props.topNumber, child: this.props.childNumber })
  }

  // Change Ripple
  public handleRippleChange = () => {
    const { changeChildRipple, category, title, writer, topID, rippleID, changeRippleStatePending } = this.props
    const { text, passwordToChange } = this.state

    // Pending check
    const pendingCheck = (data: ChangeRipple): Promise<object> => {
      if (data.pending === true) {
        return Promise.reject(new Error('Pending'))
      }

      return Promise.resolve(data)
    }

    // Change ripple
    const rippleChange = (data: ChangeRipple): void => {
      changeChildRipple({
        category: data.category,
        title: data.title,
        writer: data.writer,
        text: data.text,
        password: data.password,
        topID: data.topID,
        rippleID: data.rippleID
      })
        .then((res: any) => {
          toast(res.action.payload.data.message, { type: 'success' })
        })
        .catch((err: any) => {
          toast(err.response.data.message, { type: 'error' })
        })
    }

    // Error handler
    const onError = (err: Error) => {
      if (err.message === 'Pending') {
        toast('댓글이 변경 중입니다. 잠시 후에 다시 시도해 주세요 !', { type: 'error' })
      }
    }

    // Promise
    pendingCheck({
      category,
      title,
      writer,
      text,
      topID,
      rippleID,
      password: passwordToChange,
      pending: changeRippleStatePending
    })
      .then(rippleChange)
      .catch(onError)
  }
  // Delte Ripple
  public handleRippleDelete = () => {
    const { deleteChildRipple, category, title, writer, topID, rippleID, deleteRippleStatePending } = this.props
    const { passwordToDelete } = this.state

    // Pending check
    const pendingCheck = (data: DeleteRipple): Promise<object> => {
      if (data.pending === true) {
        return Promise.reject(new Error('Pending'))
      }

      return Promise.resolve(data)
    }

    // Delete ripple
    const rippleDelete = (data: DeleteRipple): void => {
      deleteChildRipple({
        category: data.category,
        title: data.title,
        writer: data.writer,
        password: data.password,
        topID: data.topID,
        rippleID: data.rippleID
      })
        .then((res: any) => {
          toast(res.action.payload.data.message, { type: 'error' })
        })
        .catch((err: any) => {
          toast(err.response.data.message, { type: 'error' })
        })
    }

    // Error handler
    const onError = (err: Error): void => {
      if (err.message === 'Pending') {
        toast('댓글이 삭제 중입니다. 잠시 후에 다시 시도해 주세요 !', { type: 'error' })
      }
    }

    // Promise
    pendingCheck({
      category,
      title,
      writer,
      password: passwordToDelete,
      topID,
      rippleID,
      pending: deleteRippleStatePending
    })
      .then(rippleDelete)
      .catch(onError)
  }

  // Optimization rendering problem
  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextProps !== this.props || nextState !== this.state) {
      return true
    }
    return false
  }

  public render() {
    const { writer, date, childChangeMode, childDeleteMode, childMoreRippleView, text } = this.props
    // Show one ripple text
    const showMoreRipple = (text: string, moreView: boolean): JSX.Element[] | JSX.Element => {
      // Enter config
      const enterConfigedData = text.split('\n').map((line, i) => {
        return (
          <span key={i}>
            {line}
            <br />
          </span>
        )
      })

      // If more ripple view mode is not activated
      if (moreView === false && enterConfigedData.length > 15) {
        enterConfigedData.length = 10
        return (
          <React.Fragment>
            {enterConfigedData.map((object: JSX.Element, i: number) => {
              return <React.Fragment key={i}>{object}</React.Fragment>
            })}
            <button
              className="ripple-more-view primary-half"
              name="changeChildMoreViewMode"
              onClick={this.handleButtonActionChange}
            >
              {this.props.childMoreRippleViewMessage}
            </button>
          </React.Fragment>
        )
      }
      // If more ripple view mode is not activated
      if (moreView === true && enterConfigedData.length > 15) {
        return (
          <React.Fragment>
            {enterConfigedData.map((object: JSX.Element, i: number) => {
              return <React.Fragment key={i}>{object}</React.Fragment>
            })}
            <button
              className="ripple-more-view primary-half"
              name="changeChildMoreViewMode"
              onClick={this.handleButtonActionChange}
            >
              {this.props.childMoreRippleViewMessage}
            </button>
          </React.Fragment>
        )
      }

      // More view mode
      return enterConfigedData.map((object: JSX.Element, i: number) => {
        return <React.Fragment key={i}>{object}</React.Fragment>
      })
    }

    // Print just text or change form
    const printTextOrTextArea = (changeMode: boolean, moreView: boolean, text: string): JSX.Element[] | JSX.Element => {
      if (changeMode === true) {
        return (
          <div className="ripple-input-form">
            <input
              type="password"
              placeholder="작성할 때 입력한 비밀번호를 입력해 주세요"
              name="passwordToChange"
              className="info-input"
              value={this.state.passwordToChange}
              onChange={this.handleChange}
            />
            <textarea
              placeholder="수정할 댓글 내용을 입력해 주세요"
              name="text"
              className="ripple-change-text info-input"
              value={this.state.text}
              onChange={this.handleChangeTextarea}
            />
          </div>
        )
      }

      return showMoreRipple(text, moreView)
    }

    // Ripple change mode
    const rippleChangeMode = (childChangeMode: boolean): JSX.Element | null => {
      if (childChangeMode) {
        return (
          <div className="ripple-flex">
            <button className="info-half" name="changeChildChangeMode" onClick={this.handleButtonActionChange}>
              수정 취소
            </button>
            <button className="info-half" onClick={this.handleRippleChange}>
              수정 확인
            </button>
          </div>
        )
      }

      return (
        <button className="info" name="changeChildChangeMode" onClick={this.handleButtonActionChange}>
          댓글 수정
        </button>
      )
    }

    // Ripple delete mode
    const rippleDeleteMode = (childDeleteMode: boolean): JSX.Element | null => {
      if (childDeleteMode) {
        return (
          <div className="ripple-flex">
            <button className="danger-half" name="changeChildDeleteMode" onClick={this.handleButtonActionChange}>
              삭제 취소
            </button>
            <button className="danger-half" onClick={this.handleRippleDelete}>
              삭제 확인
            </button>
          </div>
        )
      }
      return (
        <button className="danger" name="changeChildDeleteMode" onClick={this.handleButtonActionChange}>
          댓글 삭제
        </button>
      )
    }
    const showRippleDeleteMode = (childDeleteMode: boolean): JSX.Element | null => {
      if (childDeleteMode === true) {
        return (
          <div className="child-ripple-input-form">
            <input
              type="password"
              placeholder="작성할 때 입력한 비밀번호를 입력해 주세요"
              name="passwordToDelete"
              className="danger-input"
              value={this.state.passwordToDelete}
              onChange={this.handleChange}
            />
          </div>
        )
      }
      return null
    }

    return (
      <div className="ripple-unit">
        <div className="ripple-writer-and-date">
          <div className="ripple-writer">{writer}</div>
          <div className="ripple-date">{date.toString().slice(0, 10)}</div>
        </div>
        <div className="ripple-text">{printTextOrTextArea(childChangeMode, childMoreRippleView, text)}</div>
        <div className="ripple-password-confirm">{showRippleDeleteMode(childDeleteMode)}</div>
        <div className="ripple-action-buttons">
          {rippleChangeMode(childChangeMode)}
          {rippleDeleteMode(childDeleteMode)}
        </div>
      </div>
    )
  }
}

export default RippleChildRipple
