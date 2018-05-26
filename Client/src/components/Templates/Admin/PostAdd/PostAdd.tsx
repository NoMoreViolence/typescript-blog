import * as React from 'react'

import './PostAdd.css'
import { Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import { toast } from 'react-toastify'

import { AddPostState } from 'store/modules/Post'
import { CategoryStateInside } from 'store/modules/Category'

import MarkdownEditor from 'lib/MarkDownEditor'
import MarkdownRenderer from 'lib/MarkDownRenderer'

interface AddPost {
  category?: string
  title?: string
  subTitle?: string
  mainText?: string
}
interface Props {
  category: CategoryStateInside[]
  add: AddPostState
  changeCategory: (value: string) => any
  changeTitle: (value: string) => any
  changeSubTitle: (value: string) => any
  changeMainText: (value: string) => any
  addPost: (AddPost: AddPost) => any
}

interface Dropdown {
  currentTarget: { textContent: string }
}

class PostAdd extends React.Component<Props> {
  public state = {
    leftPercentage: 0.5,
    postAddMessage: '포스트 추가하기 !',
    showNone: false,
    dropdown: false
  }

  // button click
  public handleShowNone = async () => {
    if (this.state.showNone === false) {
      this.setState({
        showNone: !this.state.showNone,
        leftPercentage: 0.5,
        postAddMessage: '포스트 추가 접기 !'
      })
    } else {
      this.setState({
        showNone: !this.state.showNone,
        postAddMessage: '포스트 추가하기 !'
      })
    }
  }

  // Dropdown Toogle
  public handleToogle = () => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }
  // Category Select Change
  public handleSelect = (e: Dropdown) => {
    this.props.changeCategory(e.currentTarget.textContent)
  }

  // Submit => Post Add
  public handleSubmit = () => {
    const categoryCheck = (post: AddPost) => {
      if (post.category !== '카테고리 선택') {
        return new Promise(function(resolve, reject) {
          resolve(post)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('카테고리를 선택해 주세요 !'))
      })
    }

    const titleCheck = (post: AddPost) => {
      if (post.title !== '') {
        return new Promise(function(resolve, reject) {
          resolve(post)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('포스트 제목을 입력해 주세요 !'))
      })
    }

    const subTitleCheck = (post: AddPost) => {
      if (post.subTitle !== '') {
        return new Promise(function(resolve, reject) {
          resolve(post)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('포스트 부제목을 입력해 주세요 !'))
      })
    }

    const mainTextCheck = (post: AddPost) => {
      if (post.mainText !== '') {
        return new Promise(function(resolve, reject) {
          resolve(post)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('포스트 내용을 입력해 주세요 !'))
      })
    }

    const requestToServer = (post: AddPost) => {
      toast('포스트 추가가 완료되었습니다 !')
    }

    const onError = (err: Error) => {
      toast(err.message)
    }
    categoryCheck({
      category: this.props.add.category,
      title: this.props.add.title,
      subTitle: this.props.add.subTitle,
      mainText: this.props.add.mainText
    })
      .then(titleCheck)
      .then(subTitleCheck)
      .then(mainTextCheck)
      .then(requestToServer)
      .catch(onError)
  }

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

  public render() {
    const { leftPercentage } = this.state
    const leftStyle = {
      flex: leftPercentage
    }
    const rightStyle = {
      flex: 1 - leftPercentage
    }
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
          {this.state.postAddMessage}
        </Button>
        {this.state.showNone && (
          <React.Fragment>
            <div className="add-editor-select-category">
              <Dropdown className="add-editor-button" isOpen={this.state.dropdown} toggle={this.handleToogle} size="lg">
                <DropdownToggle outline={true} color="primary" caret={true}>
                  {this.props.add.category}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.handleSelect}>카테고리 선택</DropdownItem>
                  {CurrentCategoryChangeBar(this.props.category)}
                </DropdownMenu>
              </Dropdown>

              <div className="add-editor-button">
                <Button onClick={this.handleSubmit} color="primary" size="lg">
                  포스트 생성 하기 !
                </Button>
              </div>
            </div>
            <div className="add-editor-and-viewer">
              <div className="add-editor" style={leftStyle}>
                <div className="add-editor-inside">
                  <MarkdownEditor
                    title={this.props.add.title}
                    changeTitle={this.props.changeTitle}
                    changeSubTitle={this.props.changeSubTitle}
                    subTitle={this.props.add.subTitle}
                    MainText={this.props.add.mainText}
                    changeMainText={this.props.changeMainText}
                    state={this.state.showNone}
                  />
                </div>
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
