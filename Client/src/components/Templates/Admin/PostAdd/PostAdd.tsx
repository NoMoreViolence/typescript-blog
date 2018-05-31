import * as React from 'react'

import { Button } from 'reactstrap'
import { toast } from 'react-toastify'

import { AddPostState, PostAddAPIInterface } from 'store/modules/Post'
import { CategoryStateInside } from 'store/modules/Category'

import MarkdownEditor from 'lib/MarkDownEditor'
import MarkdownRenderer from 'lib/MarkDownRenderer'

interface Props {
  category: CategoryStateInside[]
  add: AddPostState
  changeCategory: (value: string) => any
  changeTitle: (value: string) => any
  changeSubTitle: (value: string) => any
  changeMainText: (value: string) => any
  addPost: (AddPost: PostAddAPIInterface) => any
  postDone: () => void
  categoryDone: () => void
}

interface CTarget {
  currentTarget: { innerText: string }
}

class PostAdd extends React.Component<Props> {
  public state = {
    leftPercentage: 0.5,
    postAddMessage: '포스트 추가 하기 !',
    showNone: false,
    dropdown: false
  }

  // handle Category add part show none
  public handlePostAddShowNone = () => {
    if (this.state.showNone === false) {
      this.setState({
        showNone: !this.state.showNone,
        leftPercentage: 0.5,
        postAddMessage: '포스트 추가 접기 !'
      })
    } else {
      this.setState({
        showNone: !this.state.showNone,
        postAddMessage: '포스트 추가 하기 !'
      })
    }
  }

  // handle Category Select show none
  public handleCategorySelectShowNone = () => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }
  // Category Select Change
  public handleCategorySelectChange = (e: CTarget) => {
    this.setState({
      dropdown: false
    })
    this.props.changeCategory(e.currentTarget.innerText)
  }

  // Submit => Post Add
  public handleSubmit = () => {
    // category value check
    const categoryCheck = (post: PostAddAPIInterface) => {
      if (post.category !== '카테고리 선택') {
        return new Promise(function(resolve, reject) {
          resolve(post)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('카테고리를 선택해 주세요 !'))
      })
    }

    // title value check
    const titleCheck = (post: PostAddAPIInterface) => {
      if (post.title !== '') {
        return new Promise(function(resolve, reject) {
          resolve(post)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('포스트 제목을 입력해 주세요 !'))
      })
    }

    // subTitle value check
    const subTitleCheck = (post: PostAddAPIInterface) => {
      if (post.subTitle !== '') {
        return new Promise(function(resolve, reject) {
          resolve(post)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('포스트 부제목을 입력해 주세요 !'))
      })
    }

    // mainText value check
    const mainTextCheck = (post: PostAddAPIInterface) => {
      if (post.mainText !== '') {
        return new Promise(function(resolve, reject) {
          resolve(post)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('포스트 내용을 입력해 주세요 !'))
      })
    }

    // request to server => post add function
    const requestToServer = (post: PostAddAPIInterface) => {
      // 수정 수정 수정
      this.props
        .addPost(post)
        // request call success
        .then(async (res: { value: any; action: any }) => {
          await this.props.postDone()
          await this.props.categoryDone()
          toast(res.action.payload.data.message)
        })
        // request call failure
        .catch((err: any) => {
          toast(err.response.data.message)
        })
    }

    // take all insert error
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
  public handleSeparatorMouseMove = (e: MouseEvent) => {
    this.setState({
      leftPercentage: e.clientX / window.innerWidth
    })
  }
  // hand off
  public handleSeparatorMouseUp = (e: MouseEvent) => {
    document.body.removeEventListener('mousemove', this.handleSeparatorMouseMove)
    window.removeEventListener('mouseup', this.handleSeparatorMouseUp)
  }
  // separator click
  public handleSeparatorMouseDown = (e: React.MouseEvent<any>) => {
    document.body.addEventListener('mousemove', this.handleSeparatorMouseMove)
    window.addEventListener('mouseup', this.handleSeparatorMouseUp)
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

    const CurrentCategoryChange = (data: CategoryStateInside[]) => {
      return data.map((object, i) => {
        return (
          <button key={i} onClick={this.handleCategorySelectChange} className="editor-category-child-button">
            {object.category}
          </button>
        )
      })
    }

    return (
      <div className="editor-template">
        <div className="layout-container">
          <Button block={true} outline={true} color="primary" onClick={this.handlePostAddShowNone}>
            {this.state.postAddMessage}
          </Button>
        </div>
        {this.state.showNone && (
          <React.Fragment>
            <div className="editor-and-viewer">
              <div className="editor" style={leftStyle}>
                <div className="editor-category">
                  <button onClick={this.handleCategorySelectShowNone}>{this.props.add.category}</button>
                  {this.state.dropdown && (
                    <div className="editor-category-child-container">
                      <div className="editor-category-child">
                        {this.props.add.category !== '카테고리 선택' && (
                          <button onClick={this.handleCategorySelectChange} className="editor-category-child-button">
                            카테고리 선택
                          </button>
                        )}
                        {CurrentCategoryChange(this.props.category)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="editor-inside">
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
                {/* only can see mobile view */}
                <div className="editor-submit-mobile">
                  <button onClick={this.handleSubmit}>포스트 생성 하기 !</button>
                </div>
                {/* only can see mobile view */}
              </div>
              <div className="preview" style={rightStyle}>
                <div className="preview-submit">
                  <button onClick={this.handleSubmit}>포스트 생성 하기 !</button>
                </div>

                <div className="preview-inside">
                  <h1 className="preview-title">{this.props.add.title}</h1>
                  <h3 className="preview-sub-title">{this.props.add.subTitle}</h3>
                  <div>
                    <MarkdownRenderer markdown={this.props.add.mainText} />
                  </div>
                </div>
              </div>
              <div className="separator" style={separatorStyle} onMouseDown={this.handleSeparatorMouseDown} />
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default PostAdd
