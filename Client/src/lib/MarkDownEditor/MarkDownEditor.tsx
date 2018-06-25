import * as React from 'react'

import { Controlled as CodeMirror } from 'react-codemirror2'
import './MarkDownEditor.css'
import 'components/commonCSS/editor.css'

interface Props {
  title?: string
  changeTitle: (value: string) => void
  subTitle?: string
  changeSubTitle: (value: string) => void
  MainText: string
  changeMainText: (value: string) => void
  titleError: boolean
  subTitleError: boolean
  mainTextError: boolean
  errorHandler: (value: string) => void
}

interface State {
  mainText: string
}

interface Target {
  target: HTMLInputElement
}

class MarkDownEditor extends React.Component<Props, State> {
  public state = {
    mainText: ''
  }

  // Html input
  public title: any = null
  public subTitle: any = null

  // Title & subtitle text change
  public handleChange = (e: Target) => {
    if (e.target.name === 'title') {
      this.props.changeTitle(e.target.value)
    } else if (e.target.name === 'sub-title') {
      this.props.changeSubTitle(e.target.value)
    }
  }

  // Text cursor
  public componentDidUpdate(prevProps: Props) {
    // Error handler
    if (this.props.titleError === true) {
      this.title.focus()
      this.props.errorHandler('clear')
    }
    if (this.props.subTitleError === true) {
      this.subTitle.focus()
      this.props.errorHandler('clear')
    }
    if (this.props.mainTextError === true) {
      this.props.errorHandler('clear')
    }
  }

  public componentWillUnmount() {
    this.title = null
    this.subTitle = null
  }

  public render() {
    return (
      <React.Fragment>
        <input
          className="editor-title"
          placeholder="제목을 입력하세요"
          name="title"
          value={this.props.title}
          onChange={this.handleChange}
          ref={ref => (this.title = ref)}
        />
        <input
          className="editor-sub-title"
          placeholder="부제목을 입력하세요"
          name="sub-title"
          value={this.props.subTitle}
          onChange={this.handleChange}
          ref={ref => (this.subTitle = ref)}
        />
        <CodeMirror
          className="code-editor"
          value={this.props.MainText}
          options={{
            mode: 'markdown',
            theme: 'monokai',
            lineNumbers: true,
            lineWrapping: true
          }}
          onBeforeChange={(editor, data, value) => {
            this.props.changeMainText(value)
          }}
        />
      </React.Fragment>
    )
  }
}

export default MarkDownEditor
