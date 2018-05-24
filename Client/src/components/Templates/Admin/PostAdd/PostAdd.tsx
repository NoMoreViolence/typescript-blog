import * as React from 'react'

import './PostAdd.css'

import { AddPostState } from 'store/modules/Post'

import * as CodeMirror from 'codemirror'
import MarkdownRenderer from 'lib/MarkDownRenderer/MarkDownRenderer'

interface Props {
  add: AddPostState
  changeTitle: (value: string) => any
  changeSubTitle: (value: string) => any
  changeMainText: (value: string) => any
}

interface Target {
  target: HTMLInputElement
}

class PostAdd extends React.Component<Props> {
  public state = {
    leftPercentage: 0.5
  }

  public editor: any // 에디터 ref
  public codeMirror: any // CodeMirror 인스턴스
  public cursor: any // 에디터의 텍스트 cursor 위치
  public initializeEditor = () => {
    this.codeMirror = CodeMirror(this.editor, {
      mode: 'markdown',
      theme: 'monokai',
      lineNumbers: true, // 좌측에 라인넘버 띄우기
      lineWrapping: true // 내용이 너무 길면 다음 줄에 작성
    })
    this.codeMirror.on('change', this.handleChangeMarkdown)
  }
  // change Mark Down Method
  public handleChangeMarkdown = async (doc: any) => {
    const { changeMainText } = this.props
    this.cursor = doc.getCursor() // 텍스트 cursor 의 위치를 저장합니다
    if (this.props.add.mainText !== (await doc.getValue())) {
      changeMainText(await doc.getValue())
    }
  }
  //
  //
  //
  public componentDidMount() {
    this.initializeEditor()
  }

  public componentDidUpdate(prevProps: Props) {
    // markdown이 변경되면 에디터의 값도 변경해줍니다.
    // 이 과정에서 텍스트 커서의 위치가 초기화 되기 때문에,
    // 저장해둔 커서의 위치가 있으면 해당 위치로 설정합니다.
    if (prevProps.add.mainText !== this.props.add.mainText) {
      const { codeMirror, cursor } = this
      if (!codeMirror) {
        return
      } // 인스턴스가 아직 안만들어진 경우
      codeMirror.setValue(this.props.add.mainText)
      if (!cursor) {
        return
      } // 커서가 없는 경우
      codeMirror.setCursor(cursor)
    }
  }
  //
  //
  //
  //
  //
  //
  //
  // separator 클릭 후 마우스를 움직이면 그에 따라 leftPercentage 업데이트
  public handleMouseMove = (e: MouseEvent) => {
    this.setState({
      leftPercentage: e.clientX / window.innerWidth
    })
  }
  // 마우스를 땠을 때 등록한 이벤트 제거
  public handleMouseUp = (e: MouseEvent) => {
    document.body.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }
  // separator 클릭시
  public handleSeparatorMouseDown = (e: React.MouseEvent<any>) => {
    document.body.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  // title & subTitle change
  public handleChange = (e: Target) => {
    if (e.target.name === 'title') {
      this.props.changeTitle(e.target.value)
    } else if (e.target.name === 'sub-title') {
      this.props.changeSubTitle(e.target.value)
    }
  }

  public render() {
    const { leftPercentage } = this.state
    // 각 섹션에 flex 값 적용
    const leftStyle = {
      flex: leftPercentage
    }
    const rightStyle = {
      flex: 1 - leftPercentage
    }
    // separator 위치 설정
    const separatorStyle = {
      left: `${leftPercentage * 100}%`
    }

    return (
      <div className="editor-template">
        <div className="add-editor-and-viewer">
          <div className="add-editor" style={leftStyle}>
            {}
            <div className="add-editor-inside">
              <input
                className="add-editor-title"
                placeholder="제목을 입력하세요"
                name="title"
                value={this.props.add.title}
                onChange={this.handleChange}
              />
              <input
                className="add-editor-sub-title"
                placeholder="부제목을 입력하세요"
                name="sub-title"
                value={this.props.add.subTitle}
                onChange={this.handleChange}
              />
              <div className="code-editor" ref={ref => (this.editor = ref)} />
            </div>
            {}
          </div>
          <div className="add-preview" style={rightStyle}>
            <div className="add-preview-inside">
              <h1 className="add-preview-title">{this.props.add.title}</h1>
              <div>
                <MarkdownRenderer markdown={this.props.add.mainText} />
              </div>
            </div>
          </div>
          <div className="add-separator" style={separatorStyle} onMouseDown={this.handleSeparatorMouseDown} />
        </div>
      </div>
    )
  }
}

export default PostAdd
