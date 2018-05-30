import * as React from 'react'

import * as CodeMirror from 'codemirror'
import './MarkDownEditor.css'
import 'components/commonCSS/editor.css'

// color of markdown syntax
import 'codemirror/mode/markdown/markdown'
// markdown colorSet for PL
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/css/css'
import 'codemirror/mode/shell/shell'
// CodeMirror Css Style
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'

interface Props {
  title?: string
  changeTitle: (value: string) => any
  subTitle?: string
  changeSubTitle: (value: string) => any
  MainText?: string
  changeMainText: (value: string) => any
  state: boolean
}

interface Target {
  target: HTMLInputElement
}

class MarkDownEditor extends React.Component<Props> {
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
        />
        <input
          className="editor-sub-title"
          placeholder="부제목을 입력하세요"
          name="sub-title"
          value={this.props.subTitle}
          onChange={this.handleChange}
        />
        <div className="code-editor" ref={ref => (this.editor = ref)} />
      </React.Fragment>
    )
  }
}

export default MarkDownEditor
