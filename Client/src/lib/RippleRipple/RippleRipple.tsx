import * as React from 'react'

import { TopOrChildRippleState } from 'store/modules/Ripple'

import './RippleRipple.css'
import { Input } from 'reactstrap'

interface Props {
  loginLogined: boolean
  writer: string
  date: number
  text: string
  topOrChild: boolean
  topID: string
  rippleChild: TopOrChildRippleState[]
}

interface State {
  addMode?: boolean
  moreMode?: boolean
  changeMode?: boolean
  deleteMode?: boolean
  currentRippleMoreShow?: boolean
  changeTextValue?: string
  changePasswordValue?: string
}

interface ShowChildRippleFunctionArg {
  data?: TopOrChildRippleState[]
  showChildRippleCheck?: boolean
  topOrChild?: boolean
  topID?: string
}

class RippleRipple extends React.Component<Props, State> {
  // State
  public state = {
    addMode: false,
    moreMode: false,
    changeMode: false,
    deleteMode: false,
    currentRippleMoreShow: false,
    changeTextValue: this.props.text,
    changePasswordValue: ''
  }

  // Change Input
  public handleChange = (e: { target: HTMLInputElement }): void => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //
  public handleShowAllCurrentRipple = (): void => {
    this.setState({
      currentRippleMoreShow: true
    })
  }

  // Add ripple
  public handleAddRipple = (e: { currentTarget: HTMLButtonElement }): void => {
    if (e.currentTarget.name === 'cancel') {
      this.setState({
        addMode: true
      })
    }

    this.setState({
      addMode: false
    })
  }

  //
  public handleMoreRipple = (e: { currentTarget: HTMLButtonElement }): void => {
    // not yet
  }

  //
  public handleChangeRipple = (e: { currentTarget: HTMLButtonElement }): void => {
    // awejfowie
  }

  //
  public handleDeleteRipple = (e: { currentTarget: HTMLButtonElement }): void => {
    // awejfowie
  }

  public render(): JSX.Element {
    // Return ripple text or textarea
    const changeRippleTextOrTextarea = (data: boolean): JSX.Element => {
      // If view mode
      if (data === false) {
        return <div className="ripple-text">{textLengthCheck(this.props.text, this.state.currentRippleMoreShow)}</div>
      }
      // If change mode
      return (
        <div>
          <Input
            type="password"
            placeholder="작성할 때 입력한 비밀번호를 입력해 주세요"
            name="changePasswordValue"
            value={this.state.changePasswordValue}
            onChange={this.handleChange}
          />
          <Input
            type="textarea"
            className="ripple-change-text"
            value={this.state.changeTextValue}
            onChange={this.handleChange}
          />
        </div>
      )
    }

    // Print text
    const printText = (data: string): JSX.Element[] | JSX.Element => {
      // Change \n to <br /> tag
      // This way is much safer then dangerouslySetInnerHTML
      return data.split('\n').map((line, i) => {
        return (
          <span key={i}>
            {line}
            <br />
          </span>
        )
      })
    }

    // Enter config
    const textLengthCheck = (data: string, moreShow: boolean): Array<JSX.Element | null> | JSX.Element => {
      // Loaded all
      if (moreShow === true) {
        return printText(data)
      }

      // Check enter's number
      const text = data
      const position = new Array()
      let pos = text.indexOf('\n')

      while (pos > -1) {
        position.push(pos)
        pos = text.indexOf('\n', pos + 1)
      }

      // Long Ripple
      if (position.length > 15) {
        return (
          <React.Fragment>
            {printText(data.slice(0, position[15]))}
            <span className="ripple-more-button" onClick={this.handleShowAllCurrentRipple}>
              더 보기
            </span>
          </React.Fragment>
        )
      }

      // Short ripple
      return <React.Fragment>{printText(data)}</React.Fragment>
    }

    const changeRippleButtonByTopOrChild = (data: boolean): JSX.Element => {
      if (data === true) {
        return (
          <React.Fragment>
            <div className="ripple-ripple">
              {this.state.addMode ? (
                <button onClick={this.handleAddRipple} name="cancel">
                  답글 달기 취소
                </button>
              ) : (
                <button onClick={this.handleAddRipple} name="go">
                  답글 달기
                </button>
              )}
            </div>
            <div>
              {!this.state.moreMode && (
                <button onClick={this.handleMoreRipple} name="go">
                  답글 보기
                </button>
              )}
            </div>
            <div>
              {this.state.changeMode ? (
                <React.Fragment>
                  <button onClick={this.handleChangeRipple} name="cancel">
                    댓글 수정 취소
                  </button>
                  <button onClick={this.handleChangeRipple} name="go">
                    댓글 수정
                  </button>
                </React.Fragment>
              ) : (
                <button onClick={this.handleChangeRipple} name="go">
                  댓글 수정
                </button>
              )}
            </div>
            <div>
              {this.state.deleteMode ? (
                <React.Fragment>
                  <button onClick={this.handleDeleteRipple} name="cancel">
                    댓글 삭제 취소
                  </button>
                  <button onClick={this.handleDeleteRipple} name="go">
                    댓글 삭제
                  </button>
                </React.Fragment>
              ) : (
                <button onClick={this.handleDeleteRipple} name="go">
                  댓글 삭제
                </button>
              )}
            </div>
          </React.Fragment>
        )
      }

      return (
        <React.Fragment>
          <div>
            {this.state.changeMode ? (
              <React.Fragment>
                <button onClick={this.handleChangeRipple} name="cancel">
                  댓글 수정 취소
                </button>
                <button onClick={this.handleChangeRipple} name="go">
                  댓글 수정
                </button>
              </React.Fragment>
            ) : (
              <button onClick={this.handleChangeRipple} name="go">
                댓글 수정
              </button>
            )}
          </div>
          <div>
            {this.state.deleteMode ? (
              <React.Fragment>
                <button onClick={this.handleDeleteRipple} name="cancel">
                  댓글 삭제 취소
                </button>
                <button onClick={this.handleDeleteRipple} name="go">
                  댓글 삭제
                </button>
              </React.Fragment>
            ) : (
              <button onClick={this.handleDeleteRipple} name="go">
                댓글 삭제
              </button>
            )}
          </div>
        </React.Fragment>
      )
    }

    const showChildRipple = (data: ShowChildRippleFunctionArg): JSX.Element[] | JSX.Element | null => {
      if (data.showChildRippleCheck === false) {
        return null
      }

      if (data.data) {
        return null
      }
      return <div>aweifj</div>
    }

    return (
      <div className="ripple-unit">
        <div className="ripple-writer-and-date">
          <div className="ripple-writer">{this.props.writer}</div>
          <div className="ripple-date">{this.props.date.toString().slice(0, 19)}</div>
        </div>
        {changeRippleTextOrTextarea(this.state.changeMode)}
        <div className="ripple-answer-show-change-delete">{changeRippleButtonByTopOrChild(this.props.topOrChild)}</div>
        {showChildRipple({
          data: this.props.rippleChild,
          topOrChild: this.props.topOrChild,
          topID: this.props.topID,
          showChildRippleCheck: this.state.moreMode
        })}
      </div>
    )
  }
}

export default RippleRipple
