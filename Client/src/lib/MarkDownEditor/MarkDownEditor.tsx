import * as React from 'react'

import * as CodeMirror from 'codemirror'
import './MarkDownEditor.css'
import 'components/commonCSS/editor.css'

interface Props {
  title?: string
  changeTitle: (value: string) => void
  subTitle?: string
  changeSubTitle: (value: string) => void
  MainText?: string
  changeMainText: (value: string) => void
  titleError: boolean
  subTitleError: boolean
  mainTextError: boolean
  errorHandler: (value: string) => void
}

interface Target {
  target: HTMLInputElement
}

class MarkDownEditor extends React.Component<Props> {
  // html input
  public title: any = null
  public subTitle: any = null
  // editor
  public editor: any = null // editor ref
  public codeMirror: any = null // CodeMirror instance
  public cursor: any = null // text cursor

  // the editor create mothod
  public initializeEditor = async () => {
    await this.editor
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true, // view line number
      lineWrapping: true // if the text is long, throw text to next line
    })
    this.codeMirror.on('change', this.handleChangeMarkdown)
  }
  // change Mark Down Method
  public handleChangeMarkdown = async (doc: any) => {
    const { MainText, changeMainText } = this.props
    this.cursor = doc.getCursor() // save text cursor
    if (MainText !== (await doc.getValue())) {
      changeMainText(await doc.getValue())
    }
  }
  // title & subtitle text change
  public handleChange = (e: Target) => {
    if (e.target.name === 'title') {
      this.props.changeTitle(e.target.value)
    } else if (e.target.name === 'sub-title') {
      this.props.changeSubTitle(e.target.value)
    }
  }
  // first make editor
  public async componentDidMount() {
    // button click, show none
    await this.initializeEditor()
    await this.codeMirror
    await this.codeMirror.setValue(this.props.MainText)
  }

  // text cursor
  public componentDidUpdate(prevProps: Props) {
    // change cursor
    if (prevProps.MainText !== this.props.MainText) {
      const { codeMirror, cursor } = this
      if (!codeMirror) {
        return
      } // instance is not yet
      codeMirror.setValue(this.props.MainText)
      if (!cursor) {
        return
      } // there is no cursor
      codeMirror.setCursor(cursor)
    }
    // 에러가 생겼을 때의 부분
    if (this.props.titleError === true) {
      this.title.focus()
      this.props.errorHandler('clear')
    }
    if (this.props.subTitleError === true) {
      this.subTitle.focus()
      this.props.errorHandler('clear')
    }
    if (this.props.mainTextError === true) {
      this.codeMirror.focus()
      this.props.errorHandler('clear')
    }
  }

  // unmount
  public componentWillUnmount() {
    this.editor = null
    this.cursor = null
    this.codeMirror = null
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
        <div className="code-editor" ref={ref => (this.editor = ref)} />
      </React.Fragment>
    )
  }
}

export default MarkDownEditor
