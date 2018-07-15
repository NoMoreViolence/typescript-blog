import * as React from 'react'

import './RippleChildRipple.css'
import Input from 'reactstrap/lib/Input'

import { ChangeChildMode } from 'store/modules/Ripple'

interface Props {
  // Top Ripple data
  writer: string
  text: string
  date: number
  topID: string
  // URL
  category: string
  title: string
  // ripple mode key & child Ripples number
  topNumber: number
  childNumber: number
  // Ripple mode
  childChangeMode: boolean
  childDeleteMode: boolean
  childMoreRippleView: boolean
  childMoreRippleViewMessage: string
  // Mode change
  changeChildChangeMode: (value: ChangeChildMode) => boolean
  changeChildDeleteMode: (value: ChangeChildMode) => boolean
  changeChildMoreViewMode: (value: ChangeChildMode) => boolean
}

interface State {
  text?: string
  passwordToChange?: string
  passwordToDelete?: string
}

class RippleChildRipple extends React.Component<Props, State> {
  // State
  public state = {
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

  public handleButtonActionChange = (e: { currentTarget: HTMLButtonElement }) => {
    this.props[e.currentTarget.name]({ top: this.props.topNumber, child: this.props.childNumber })
  }

  // Change Ripple
  public handleRippleChange = (e: { currentTarget: HTMLButtonElement }) => {
    //
  }
  // Delte Ripple
  public handleRippleDelete = (e: { currentTarget: HTMLButtonElement }) => {
    //
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
            <br />
            <button
              className="ripple-more-view primary-half"
              name="changeChildMoreViewMode"
              onClick={this.handleButtonActionChange}
            >
              {this.props.childMoreRippleViewMessage}
            </button>
          </React.Fragment>
        )
      } // If more ripple view mode is not activated
      if (moreView === true && enterConfigedData.length > 15) {
        return (
          <React.Fragment>
            {enterConfigedData.map((object: JSX.Element, i: number) => {
              return <React.Fragment key={i}>{object}</React.Fragment>
            })}
            <br />
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
          <div>
            <Input
              type="password"
              placeholder="작성할 때 입력한 비밀번호를 입력해 주세요"
              name="passwordToChange"
              value={this.state.passwordToChange}
              onChange={this.handleChange}
            />
            <Input
              type="textarea"
              placeholder="수정할 댓글 내용을 입력해 주세요"
              name="text"
              className="ripple-change-text"
              value={this.state.text}
              onChange={this.handleChange}
            />
          </div>
        )
      }

      return showMoreRipple(text, moreView)
    }

    const rippleChangeMode = (childChangeMode: boolean): JSX.Element | null => {
      if (childChangeMode) {
        return (
          <div className="ripple-flex">
            <button className="info-half" name="changeChildChangeMode" onClick={this.handleButtonActionChange}>
              수정 취소
            </button>
            <button className="info-half" name="changeChildChangeMode" onClick={this.handleRippleChange}>
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
    const passwordShowOrHide = (childDeleteMode: boolean): JSX.Element | null => {
      if (childDeleteMode === true) {
        return (
          <Input
            type="text"
            placeholder="작성할 때 입력한 비밀번호를 입력해 주세요"
            name="passwordToDelete"
            value={this.state.passwordToDelete}
            onChange={this.handleChange}
          />
        )
      }
      return null
    }
    const rippleDeleteMode = (childDeleteMode: boolean): JSX.Element | null => {
      if (childDeleteMode) {
        return (
          <div className="ripple-flex">
            <button className="danger-half" name="changeChildDeleteMode" onClick={this.handleButtonActionChange}>
              삭제 취소
            </button>
            <button className="danger-half" name="changeChildDeleteMode" onClick={this.handleRippleDelete}>
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

    return (
      <div className="ripple-unit">
        <div className="ripple-writer-and-date">
          <div className="ripple-writer">{writer}</div>
          <div className="ripple-date">{date.toString().slice(0, 10)}</div>
        </div>
        <div className="ripple-text">{printTextOrTextArea(childChangeMode, childMoreRippleView, text)}</div>
        <div className="ripple-password-confirm">{passwordShowOrHide(childDeleteMode)}</div>
        <div className="ripple-action-buttons">
          {rippleChangeMode(childChangeMode)}
          {rippleDeleteMode(childDeleteMode)}
        </div>
      </div>
    )
  }
}

export default RippleChildRipple
