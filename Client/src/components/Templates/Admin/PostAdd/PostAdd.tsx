import * as React from 'react'

import './PostAdd.css'

import { AddPostState } from 'store/modules/Post'
import { CategoryState, CategoryStateInside } from 'store/modules/Category'

import * as CodeMirror from 'codemirror'
import MarkdownRenderer from 'lib/MarkDownRenderer/MarkDownRenderer'
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

interface Props {
  category: CategoryState
  add: AddPostState
  changeCategory: (value: string) => any
  changeTitle: (value: string) => any
  changeSubTitle: (value: string) => any
  changeMainText: (value: string) => any
}

interface Target {
  target: HTMLInputElement
}

interface Dropdown {
  currentTarget: { textContent: string }
}

class PostAdd extends React.Component<Props> {
  public state = {
    leftPercentage: 0.5,
    showNone: false,
    dropdown: false
  }

  public editor: any = null // 에디터 ref
  public codeMirror: any = null // CodeMirror 인스턴스
  public cursor: any = null // 에디터의 텍스트 cursor 위치
  public initializeEditor = async () => {
    await this.editor
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
  // separator click, and mouse move
  public handleMouseMove = (e: MouseEvent) => {
    this.setState({
      leftPercentage: e.clientX / window.innerWidth
    })
  }
  // hand off
  public handleMouseUp = (e: MouseEvent) => {
    document.body.removeEventListener('mousemove', this.handleMouseMove)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }
  // separator click
  public handleSeparatorMouseDown = (e: React.MouseEvent<any>) => {
    document.body.addEventListener('mousemove', this.handleMouseMove)
    window.addEventListener('mouseup', this.handleMouseUp)
  }
  //
  //
  //
  //
  //

  // title & subTitle change
  public handleChange = (e: Target) => {
    if (e.target.name === 'title') {
      this.props.changeTitle(e.target.value)
    } else if (e.target.name === 'sub-title') {
      this.props.changeSubTitle(e.target.value)
    }
  }

  // button click
  public handleShowNone = async () => {
    this.setState({
      showNone: !this.state.showNone
    })
    // the setState method is call lifecycle method.
    // therefore, Although I did setState, the showNone value is false
    if (this.state.showNone === false) {
      await this.initializeEditor()
      await this.codeMirror
      this.codeMirror.setValue(this.props.add.mainText)
    }
  }

  // dropdown toogle
  public handleToogle = () => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }
  // category Change
  public handleSelect = (e: Dropdown) => {
    this.props.changeCategory(e.currentTarget.textContent)
  }

  public render() {
    const { leftPercentage } = this.state
    // flex value
    const leftStyle = {
      flex: leftPercentage
    }
    const rightStyle = {
      flex: 1 - leftPercentage
    }
    // separator state config
    const separatorStyle = {
      left: `${leftPercentage * 100}%`
    }

    // show all category
    const CurrentCategoryChangeBar = (data: CategoryStateInside[]) => {
      return data.map((object, i) => {
        return (
          <DropdownItem key={i} onClick={this.handleSelect}>
            {object.category}
          </DropdownItem>
        )
      })
    }

    return (
      <div className="add-editor-template">
        <Button block={true} color="primary" onClick={this.handleShowNone}>
          포스트 추가하기 !
        </Button>
        {this.state.showNone && (
          <React.Fragment>
            <div className="add-editor-select-category">
              <Dropdown
                className="add-editor-dropdown-button"
                isOpen={this.state.dropdown}
                toggle={this.handleToogle}
                size="lg"
              >
                <DropdownToggle outline={true} color="primary" caret={true}>
                  {this.props.category.post.addCategory}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.handleSelect}>카테고리 선택</DropdownItem>
                  {CurrentCategoryChangeBar(this.props.category.categoryCategory)}
                </DropdownMenu>
              </Dropdown>
            </div>
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
                  <h3 className="add-preview-sub-title">{this.props.add.subTitle}</h3>
                  <div>
                    <MarkdownRenderer markdown={this.props.add.mainText} />
                  </div>
                </div>
              </div>
              <div className="add-separator" style={separatorStyle} onMouseDown={this.handleSeparatorMouseDown} />
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default PostAdd
