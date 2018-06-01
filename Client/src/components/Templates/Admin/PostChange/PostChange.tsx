import * as React from 'react'

import { Button } from 'reactstrap'
import { toast } from 'react-toastify'

import { CategoryStateInside } from 'store/modules/Category'
import { ChangePostState, PutChangeAPIInterface, GetPostBringAPIInterface } from 'store/modules/Post'

import MarkdownEditor from 'lib/MarkDownEditor'
import MarkdownRenderer from 'lib/MarkDownRenderer'

interface Props {
  category: CategoryStateInside[]
  change: ChangePostState
  loadCategory: () => any
  loadPost: (value: GetPostBringAPIInterface) => any
  changeCategorySelect: (value: string) => any
  changeTitleSelect: (value: string) => any
  changeCategory: (value: string) => any
  changeTitle: (value: string) => any
  changeSubTitle: (value: string) => any
  changeMainText: (value: string) => any
  changePost: (changePost: PutChangeAPIInterface) => any
  postDone: () => void
  categoryDone: () => void
}

interface State {
  leftPercentage: number
  postAddMessage: string
  showNone: boolean
  categorySelectDropdown: boolean
  categoryDropdown: boolean
  postSelectDropdown: boolean
}

interface CTarget {
  currentTarget: HTMLButtonElement
}

class PostChange extends React.Component<Props, State> {
  public state = {
    leftPercentage: 0.5,
    postAddMessage: '포스트 수정 하기 !',
    showNone: false,
    categorySelectDropdown: false,
    categoryDropdown: false,
    postSelectDropdown: false
  }

  // handle category change part show none
  public handlePostChangeShowNoneToogle = () => {
    if (this.state.showNone === false) {
      this.setState({
        showNone: !this.state.showNone,
        leftPercentage: 0.5,
        postAddMessage: '포스트 수정 접기 !'
      })
    } else {
      this.setState({
        showNone: !this.state.showNone,
        postAddMessage: '포스트 수정 하기 !'
      })
    }
  }

  // Select
  // Dropdown Select Category ShowNone Toogle
  public handleCategorySelectShowNoneToogle = () => {
    this.setState({
      categorySelectDropdown: !this.state.categorySelectDropdown
    })
  }
  // Dropdown Category ShowNone Toogle
  public handleCategoryShowNoneToogle = () => {
    this.setState({
      categoryDropdown: !this.state.categoryDropdown
    })
  }
  // Dropdown Select Post ShowNone Toogle
  public handlePostSelectShowNoneToogle = () => {
    this.setState({
      postSelectDropdown: !this.state.postSelectDropdown
    })
  }
  // Select

  // Category Select Change
  public handleCategorySelectChange = (e: CTarget) => {
    this.setState({
      categorySelectDropdown: false
    })
    this.props.changeCategorySelect(e.currentTarget.innerText)
  }
  // Category Select Change
  public handleCategoryChange = (e: CTarget) => {
    this.setState({
      categoryDropdown: false
    })
    this.props.changeCategory(e.currentTarget.innerText)
  }
  // post Select change
  public handlePostSelectChange = (e: CTarget) => {
    this.setState({
      postSelectDropdown: !this.state.postSelectDropdown
    })
    this.props.changeTitleSelect(e.currentTarget.innerText)

    if (e.currentTarget.innerText !== '변경할 포스트 선택') {
      // tslint:disable-next-line:no-console
      console.log(e.currentTarget.innerText)
      this.props.loadPost({ category: this.props.change.selectCategory, title: e.currentTarget.innerText, type: 1 })
    }
  }

  public handleSubmit = () => {
    const { selectCategory, category, selectTitle, title, subTitle, mainText } = this.props.change

    const oldCategoryCheck = (post: PutChangeAPIInterface) => {
      if (post.oldCategory !== '카테고리 선택') {
        return new Promise(function(resolve, reject) {
          resolve(post)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('변경할 포스트의 카테고리를 선택해 주세요 !'))
      })
    }
    const oldTitleCheck = (post: PutChangeAPIInterface) => {
      if (post.oldTitle !== '변경할 포스트 선택') {
        return new Promise(function(resolve, reject) {
          resolve(post)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('변경할 포스트를 선택해 주세요 !'))
      })
    }
    const categoryCheck = (post: PutChangeAPIInterface) => {
      if (post.newCategory !== '카테고리 선택') {
        return new Promise(function(resolve, reject) {
          resolve(post)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('변경할 포스트의 카테고리를 선택해 주세요 !'))
      })
    }
    const titleCheck = (post: PutChangeAPIInterface) => {
      if (post.newTitle !== '') {
        return new Promise(function(resolve, reject) {
          resolve(post)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('변경할 포스트의 제목을 입력해 주세요 !'))
      })
    }
    const subTitleCheck = (post: PutChangeAPIInterface) => {
      if (post.subTitle !== '') {
        return new Promise(function(resolve, reject) {
          resolve(post)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('변경할 포스트의 부제목을 입력해 주세요 !'))
      })
    }
    const mainTextCheck = (post: PutChangeAPIInterface) => {
      if (post.mainText !== '') {
        return new Promise(function(resolve, reject) {
          resolve(post)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('변경할 포스트의 내용을 입력해 주세요 !'))
      })
    }
    const requestToServer = (post: PutChangeAPIInterface) => {
      this.props
        .changePost(post)
        // request call success
        .then(async (res: { value: any; action: any }) => {
          await this.props.postDone()
          await this.props.categoryDone()
          await this.props.loadCategory()
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

    oldCategoryCheck({
      oldCategory: selectCategory,
      newCategory: category,
      oldTitle: selectTitle,
      newTitle: title,
      subTitle,
      mainText
    })
      .then(oldTitleCheck)
      .then(categoryCheck)
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

    const CurrentCategorySelectChange = (data: CategoryStateInside[]) => {
      return data.map((object, i) => {
        return (
          <button key={i} onClick={this.handleCategorySelectChange} className="editor-category-child-button">
            {object.category}
          </button>
        )
      })
    }

    const CurrentCategoryChange = (data: CategoryStateInside[]) => {
      return data.map((object, i) => {
        return (
          <button key={i} onClick={this.handleCategoryChange} className="editor-category-child-button">
            {object.category}
          </button>
        )
      })
    }

    const CurrentPostSelectChange = (data: CategoryStateInside[]) => {
      const SelectedPosts = data.filter(value => value.category === this.props.change.selectCategory)

      if (SelectedPosts.length !== 0) {
        return SelectedPosts[0].posts.map((object, i) => {
          return (
            <button key={i} onClick={this.handlePostSelectChange} className="editor-category-child-button">
              {object.title}
            </button>
          )
        })
      }
      return <button className="editor-category-child-button">카테고리를 선택한 후에 포스트 선택을 해주세요</button>
    }

    return (
      <div className="editor-template">
        <div className="layout-container">
          <Button block={true} outline={true} color="info" onClick={this.handlePostChangeShowNoneToogle}>
            {this.state.postAddMessage}
          </Button>
        </div>
        {this.state.showNone && (
          <React.Fragment>
            <div className="editor-and-viewer">
              <div className="editor" style={leftStyle}>
                <div className="editor-category">
                  <div className="editor-change-select-part">
                    <div className="editor-change-select-category">
                      <button onClick={this.handleCategorySelectShowNoneToogle}>
                        {this.props.change.selectCategory}
                      </button>
                      {this.state.categorySelectDropdown && (
                        <div className="editor-category-child-container">
                          <div className="editor-category-child">
                            {this.props.change.selectCategory !== '카테고리 선택' && (
                              <button
                                onClick={this.handleCategorySelectChange}
                                className="editor-category-child-button"
                              >
                                카테고리 선택
                              </button>
                            )}
                            {CurrentCategorySelectChange(this.props.category)}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="editor-change-select-post">
                      <button onClick={this.handlePostSelectShowNoneToogle}>{this.props.change.selectTitle}</button>
                      {this.state.postSelectDropdown && (
                        <div className="editor-category-child-container">
                          <div className="editor-category-child">
                            {this.props.change.selectTitle !== '변경할 포스트 선택' && (
                              <button onClick={this.handlePostSelectChange} className="editor-category-child-button">
                                변경할 포스트 선택
                              </button>
                            )}
                            {CurrentPostSelectChange(this.props.category)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button onClick={this.handleCategoryShowNoneToogle}>{this.props.change.category}</button>
                  {this.state.categoryDropdown && (
                    <div className="editor-category-child-container">
                      <div className="editor-category-child">
                        {this.props.change.selectCategory !== '카테고리 선택' && (
                          <button onClick={this.handleCategoryChange} className="editor-category-child-button">
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
                    changeTitle={this.props.changeTitle}
                    changeSubTitle={this.props.changeSubTitle}
                    title={this.props.change.title}
                    subTitle={this.props.change.subTitle}
                    MainText={this.props.change.mainText}
                    changeMainText={this.props.changeMainText}
                    state={this.state.showNone}
                  />
                </div>
                {/* only can see mobile view */}
                <div className="editor-submit-mobile">
                  <button className="info-color" onClick={this.handleSubmit}>
                    포스트 수정 하기 !
                  </button>
                </div>
                {/* only can see mobile view */}
              </div>
              <div className="preview" style={rightStyle}>
                <div className="preview-submit">
                  <button className="info-color" onClick={this.handleSubmit}>
                    포스트 수정 하기 !
                  </button>
                </div>

                <div className="preview-inside">
                  <h1 className="preview-title">{this.props.change.title}</h1>
                  <h3 className="preview-sub-title">{this.props.change.subTitle}</h3>
                  <div>
                    <MarkdownRenderer markdown={this.props.change.mainText} />
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

export default PostChange
