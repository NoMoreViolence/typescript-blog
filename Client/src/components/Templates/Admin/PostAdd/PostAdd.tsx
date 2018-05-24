import * as React from 'react'

import './PostAdd.css'

import { AddPostState } from 'store/modules/Post'

import * as CodeMirror from 'codemirror'

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
  // state
  public state = {
    leftPercentage: 0.5
  }

  public editor: any // editor ref
  public codeMirror: any // CodeMirror instance

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
      <div className="add-post-container">
        <div className="add-post-editor-template">
          <div className="add-post-editor-container" style={leftStyle}>
            <div className="add-editor">
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
              <div className="add-editor-content" />
            </div>
          </div>
          <div className="add-post-preview-container" style={rightStyle}>
            <div className="add-preview">
              <h1 className="add-preview-title">{this.props.add.title}</h1>
              <p>{this.props.add.subTitle}</p>
              <div className="add-preview-content">메인 컨텐트</div>
            </div>
          </div>
          <div className="add-post-separator" style={separatorStyle} onMouseDown={this.handleSeparatorMouseDown} />
        </div>
      </div>
    )
  }
}

export default PostAdd
