import * as React from 'react'

import './RippleRipple.css'
import { Input } from 'reactstrap'

interface Props {
  writer: string
  date: number
  text: string
}

interface State {
  changeMode: boolean
  moreShow: boolean
  changeValue: string
}

class RippleRipple extends React.Component<Props, State> {
  // State
  public state = {
    changeMode: false,
    moreShow: false,
    changeValue: this.props.text
  }

  public handleChange = (e: { target: HTMLInputElement }) => {
    this.setState({
      changeValue: e.target.value
    })
  }

  public handleMoreShow = (): void => {
    this.setState({
      moreShow: true
    })
  }

  public render(): JSX.Element {
    const changeMode = (data: boolean): JSX.Element | null => {
      if (data === false) {
        return <div className="ripple-text">{textLengthCheck(this.props.text, this.state.moreShow)}</div>
      }
      return (
        <Input
          type="textarea"
          className="ripple-change-text"
          value={this.state.changeValue}
          onChange={this.handleChange}
        />
      )
    }
    // Print text
    const printText = (data: string): any => {
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
            <span className="ripple-more-button" onClick={this.handleMoreShow}>
              더 보기
            </span>
          </React.Fragment>
        )
      }

      // Short ripple
      return <React.Fragment>{printText(data)}</React.Fragment>
    }

    return (
      <div className="ripple-unit">
        <div className="ripple-writer-and-date">
          <div className="ripple-writer">{this.props.writer}</div>
          <div className="ripple-date">{this.props.date.toString().slice(0, 19)}</div>
        </div>
        {changeMode(this.state.changeMode)}
      </div>
    )
  }
}

export default RippleRipple
