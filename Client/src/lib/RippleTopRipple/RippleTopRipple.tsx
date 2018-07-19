import * as React from 'react'

import './RippleTopRipple.css'
import Input from 'reactstrap/lib/Input'

import {
  TopOrChildRippleState,
  GetTopRipples,
  GetChildRipples,
  PostChildRipple,
  PatchChildRipple,
  ChildMode,
  PatchTopRipple
} from 'store/modules/Ripple'
import RippleChildRipple from 'lib/RippleChildRipple'
import RippleChildInput from 'lib/RippleChildInput'
import { toast } from '../../../node_modules/react-toastify'

interface Props {
  // Top Ripple data
  writer: string
  text: string
  date: number
  topNumber: number
  rippleID: string
  // Child Ripple data
  childRippleLoaded: boolean
  childRipple: TopOrChildRippleState[]
  // Get category & child data
  topRippleLoad: (value: GetTopRipples) => Promise<object>
  childRippleLoad: (value: GetChildRipples) => Promise<object>
  // URL
  category: string
  title: string
  // Ripple mode
  topAddMode: boolean
  topShowChildMode: boolean
  topChangeMode: boolean
  topDeleteMode: boolean
  topMoreRippleView: boolean
  topMoreRippleViewMessage: string
  // Mode change
  changeTopAddMode: (value: number) => boolean
  changeTopShowChildMode: (value: number) => boolean
  changeTopChangeMode: (value: number) => boolean
  changeTopRipple: (value: PatchTopRipple) => Promise<object>
  changeTopDeleteMode: (value: number) => boolean
  changeTopMoreViewMode: (value: number) => boolean
  // Mode change
  changeChildChangeMode: (value: ChildMode) => boolean
  changeChildRipple: (value: PatchChildRipple) => Promise<object>
  changeRippleStatePending: boolean
  changeChildDeleteMode: (value: ChildMode) => boolean
  changeChildMoreViewMode: (value: ChildMode) => boolean
  // PostChildRipple
  postChildRipple: (value: PostChildRipple) => Promise<any>
  addRippleStatePending: boolean
}

interface State {
  passwordToChange?: string
  passwordToDelete?: string
  text?: string
}

interface ShowChildRippleButtonFunction {
  topShowChildMode: boolean
  childRipple: TopOrChildRippleState[]
}

interface ShowChildRippleFunction {
  childRippleLoaded: boolean
  topShowChildMode: boolean
  childRipple: TopOrChildRippleState[]
}

class RippleTopRipple extends React.Component<Props, State> {
  // State
  public state = {
    passwordToChange: '',
    passwordToDelete: '',
    text: this.props.text
  }

  // Handle change
  public handleChange = (e: { target: HTMLInputElement }) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // Handle more mode
  public handleRippleShowChildMode = () => {
    if (this.props.topShowChildMode === false) {
      this.props.childRippleLoad({ category: this.props.category, title: this.props.title, topID: this.props.rippleID })
    }
    this.props.changeTopShowChildMode(this.props.topNumber)
  }

  // Handle ripple action button
  public handleButtonActionChange = (e: { currentTarget: HTMLButtonElement }) => {
    // State clear
    if (e.currentTarget.name === 'changeTopChangeMode') {
      this.setState({
        text: this.props.text,
        passwordToChange: ''
      })
    } else if (e.currentTarget.name === 'changeTopDeleteMode') {
      this.setState({
        passwordToDelete: ''
      })
    }
    // Change mode
    this.props[e.currentTarget.name](this.props.topNumber)
  }

  // Change Ripple
  public handleRippleChange = () => {
    const { category, title, writer, rippleID, changeRippleStatePending } = this.props
    const { text, passwordToChange } = this.state

    if (changeRippleStatePending === true) {
      return toast('댓글이 변경 중입니다. 잠시 후에 다시 시도해 주세요 !')
    }

    return this.props
      .changeTopRipple({
        category,
        title,
        writer,
        text,
        rippleID,
        password: passwordToChange
      })
      .then((res: any) => {
        toast(res.action.payload.data.message)
      })
      .catch((err: any) => {
        toast(err.response.data.message)
      })
  }

  // Optimization rendering problem
  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextProps !== this.props || nextState !== this.state) {
      return true
    }
    return false
  }

  // Render
  public render(): JSX.Element {
    // Cut this.props
    const {
      writer,
      date,
      topChangeMode,
      topMoreRippleView,
      text,
      topAddMode,
      topShowChildMode,
      childRipple,
      topDeleteMode,
      rippleID,
      category,
      title,
      changeChildChangeMode,
      changeChildDeleteMode,
      changeChildMoreViewMode,
      childRippleLoaded
    } = this.props
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
              name="changeTopMoreViewMode"
              onClick={this.handleButtonActionChange}
            >
              {this.props.topMoreRippleViewMessage}
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
              name="changeTopMoreViewMode"
              onClick={this.handleButtonActionChange}
            >
              {this.props.topMoreRippleViewMessage}
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

    // Ripple add view => child input component
    const rippleAddMode = (topAddMode: boolean): JSX.Element => {
      if (topAddMode) {
        return (
          <React.Fragment>
            <button className="primary" name="changeTopAddMode" onClick={this.handleButtonActionChange}>
              답글 취소
            </button>
          </React.Fragment>
        )
      }
      return (
        <button className="primary" name="changeTopAddMode" onClick={this.handleButtonActionChange}>
          답글 달기
        </button>
      )
    }
    const rippleAddModeShow = (topAddMode: boolean): JSX.Element | null => {
      if (topAddMode) {
        return (
          <RippleChildInput
            category={this.props.category}
            title={this.props.title}
            topID={this.props.rippleID}
            postChildRipple={this.props.postChildRipple}
            addRippleStatePending={this.props.addRippleStatePending}
          />
        )
      }
      return null
    }
    // Ripple more view => show child ripple of current ripple
    const rippleShowChildMode = (value: ShowChildRippleButtonFunction): JSX.Element | null => {
      if (value.childRipple.length === 0) {
        return null
      }

      if (value.topShowChildMode) {
        return (
          <button className="primary" onClick={this.handleRippleShowChildMode}>
            답글 접기
          </button>
        )
      }
      return (
        <button className="primary" onClick={this.handleRippleShowChildMode}>
          답글 보기
        </button>
      )
    }
    // Ripple more view content
    const loadRippleChild = (data: ShowChildRippleFunction): JSX.Element[] | null => {
      // Check child data is loaded
      if (data.childRippleLoaded === false) {
        return null
      }
      // Check child mode is right
      if (data.topShowChildMode === false) {
        return null
      }
      // Show child ripple data
      return data.childRipple.map((object: TopOrChildRippleState, i: number) => {
        return (
          <React.Fragment key={i}>
            <RippleChildRipple
              writer={object.writer}
              text={object.text}
              date={object.date}
              topNumber={this.props.topNumber}
              childNumber={i}
              topID={rippleID}
              rippleID={object._id}
              category={category}
              title={title}
              changeRippleStatePending={this.props.changeRippleStatePending}
              childChangeMode={object.changeMode}
              changeChildRipple={this.props.changeChildRipple}
              childDeleteMode={object.deleteMode}
              childMoreRippleView={object.moreRippleView}
              childMoreRippleViewMessage={object.moreRippleViewMessage}
              changeChildChangeMode={changeChildChangeMode}
              changeChildDeleteMode={changeChildDeleteMode}
              changeChildMoreViewMode={changeChildMoreViewMode}
            />
          </React.Fragment>
        )
      })
    }
    // Ripple change view => text div will change : Input=>textarea
    const rippleChangeMode = (topChangeMode: boolean): JSX.Element => {
      if (topChangeMode) {
        return (
          <div className="ripple-flex">
            <button className="info-half" name="changeTopChangeMode" onClick={this.handleButtonActionChange}>
              수정 취소
            </button>
            <button className="info-half" onClick={this.handleRippleChange}>
              수정 확인
            </button>
          </div>
        )
      }

      return (
        <button className="info" name="changeTopChangeMode" onClick={this.handleButtonActionChange}>
          댓글 수정
        </button>
      )
    }
    // Ripple delete view => hidden password input => show
    const rippleDeleteMode = (topDeleteMode: boolean): JSX.Element => {
      if (topDeleteMode) {
        return (
          <div className="ripple-flex">
            <button className="danger-half" name="changeTopDeleteMode" onClick={this.handleButtonActionChange}>
              삭제 취소
            </button>
            <button className="danger-half">삭제 확인</button>
          </div>
        )
      }
      return (
        <button className="danger" name="changeTopDeleteMode" onClick={this.handleButtonActionChange}>
          삭제 하기
        </button>
      )
    }
    const showRippleDeleteMode = (childDeleteMode: boolean): JSX.Element | null => {
      if (childDeleteMode === true) {
        return (
          <div className="ripple-delete-mode">
            <Input
              type="password"
              placeholder="작성할 때 입력한 비밀번호를 입력해 주세요"
              name="passwordToDelete"
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
        <div className="ripple-text">{printTextOrTextArea(topChangeMode, topMoreRippleView, text)}</div>
        <div className="ripple-child-input">{rippleAddModeShow(topAddMode)}</div>
        {showRippleDeleteMode(topDeleteMode)}
        <div className="ripple-action-buttons">
          {rippleAddMode(topAddMode)}
          {rippleShowChildMode({ topShowChildMode, childRipple })}
          {rippleChangeMode(topChangeMode)}
          {rippleDeleteMode(topDeleteMode)}
        </div>
        <div className="ripple-child">{loadRippleChild({ topShowChildMode, childRipple, childRippleLoaded })}</div>
      </div>
    )
  }
}

export default RippleTopRipple
