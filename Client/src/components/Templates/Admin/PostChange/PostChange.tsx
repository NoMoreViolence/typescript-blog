import * as React from 'react'

import { RouteComponentProps, withRouter } from 'react-router-dom'

import { Button } from 'reactstrap'
import { toast } from 'react-toastify'

import { CategoryStateInside } from 'store/modules/Category'
import { ChangePostState, PutChangeAPIInterface, GetPostBringAPIInterface } from 'store/modules/Post'

import MarkdownEditorContainer from 'containers/MarkDownEditor/MarkDownEditorContainer'
import MarkdownRendererContainer from 'containers/MarkDownRenderer/MarkDownRendererContainer'

interface Props {
  loginLogined: boolean
  logout: () => void
  category: CategoryStateInside[]
  change: ChangePostState
  loadCategory: () => any
  loadPost: (value: GetPostBringAPIInterface) => any
  changeCategorySelect: (value: string) => any
  changeTitleSelect: (value: string) => any
  changeCategory: (value: string) => any
  changePost: (changePost: PutChangeAPIInterface) => any
  postDone: () => void
  categoryDone: () => void
  postError: (value: string) => void
}

interface State {
  leftPercentage: number
  postAddMessage: string
  showNone: boolean
  categorySelectDropdown: boolean
  categoryDropdown: boolean
  postSelectDropdown: boolean
}

interface PutChangeMethodInterface {
  loginLogined: boolean
  oldCategory?: string
  oldTitle?: string
  newCategory?: string
  newTitle?: string
  newSubTitle?: string
  newMainText?: string
}

interface CTarget {
  currentTarget: HTMLButtonElement
}

class PostChange extends React.Component<Props & RouteComponentProps<History>, State> {
  public state = {
    // for mde container's type
    editorType: 'change',
    resource: 'Put',
    leftPercentage: 0.5,
    postAddMessage: '포스트 수정 하기 !',
    showNone: false,
    categorySelectDropdown: false,
    categoryDropdown: false,
    postSelectDropdown: false
  }

  // handle category change part show none
  public handlePostChangeShowNoneToogle = (): void => {
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
  public handleCategorySelectShowNoneToogle = (): void => {
    this.setState({
      categorySelectDropdown: !this.state.categorySelectDropdown
    })
  }
  // Dropdown Category ShowNone Toogle
  public handleCategoryShowNoneToogle = (): void => {
    this.setState({
      categoryDropdown: !this.state.categoryDropdown
    })
  }
  // Dropdown Select Post ShowNone Toogle
  public handlePostSelectShowNoneToogle = (): void => {
    this.setState({
      postSelectDropdown: !this.state.postSelectDropdown
    })
  }
  // Select

  // Category Select Change
  public handleCategorySelectChange = (e: CTarget): void => {
    this.setState({
      categorySelectDropdown: false
    })
    this.props.changeCategorySelect(e.currentTarget.innerText)
  }
  // Category Select Change
  public handleCategoryChange = (e: CTarget): void => {
    this.setState({
      categoryDropdown: false
    })
    this.props.changeCategory(e.currentTarget.innerText)
  }
  // post Select change
  public handlePostSelectChange = (e: CTarget): void => {
    this.setState({
      postSelectDropdown: !this.state.postSelectDropdown
    })
    this.props.changeTitleSelect(e.currentTarget.innerText)

    if (e.currentTarget.innerText !== '변경할 포스트 선택') {
      this.props.loadPost({ category: this.props.change.selectCategory, title: e.currentTarget.innerText, type: 1 })
    }
  }

  // submit => post change
  public handleSubmit = (): void => {
    const { selectCategory, category, selectTitle, title, subTitle, mainText } = this.props.change
    const { loginLogined, categoryDone, postDone, loadCategory, logout, history, changePost, postError } = this.props

    // check user is logined or not
    const userAdminCheck = (data: PutChangeMethodInterface): Promise<object> => {
      if (data.loginLogined !== false) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Not_Admin_User'))
    }

    // check selectCategory selected or not
    const oldCategoryCheck = (post: PutChangeMethodInterface): Promise<object> => {
      if (post.oldCategory !== '카테고리 선택') {
        return Promise.resolve(post)
      }
      return Promise.reject(new Error('No_Data_Category_Select_Select'))
    }

    // check selectTitle selected or not
    const oldTitleCheck = (post: PutChangeMethodInterface): Promise<object> => {
      if (post.oldTitle !== '변경할 포스트 선택') {
        return Promise.resolve(post)
      }
      return Promise.reject(new Error('No_Data_Post_Select_Title'))
    }

    // check category selected or not
    const categoryCheck = (post: PutChangeMethodInterface): Promise<object> => {
      if (post.newCategory !== '카테고리 선택') {
        return Promise.resolve(post)
      }
      return Promise.reject(new Error('No_Data_Category_Select'))
    }

    // check title is '' or not
    const titleCheck = (post: PutChangeMethodInterface): Promise<object> => {
      if (post.newTitle !== '') {
        return Promise.resolve(post)
      }
      return Promise.reject(new Error('No_Data_Post_Title'))
    }

    // check subTitle is  '' or not
    const subTitleCheck = (post: PutChangeMethodInterface): Promise<object> => {
      if (post.newSubTitle !== '') {
        return Promise.resolve(post)
      }
      return Promise.reject(new Error('No_Data_Post_Sub_Title'))
    }

    // check mainText is '' or not
    const mainTextCheck = (post: PutChangeMethodInterface): Promise<object> => {
      if (post.newMainText !== '') {
        return Promise.resolve(post)
      }
      return Promise.reject(new Error('No_Data_Post_Main_Text'))
    }

    // request
    const requestToServer = async (post: PutChangeMethodInterface): Promise<void> => {
      await changePost(post)
        // request call success
        .then(async (res: { value: any; action: any }) => {
          toast(res.action.payload.data.message)
        })
        // request call failure
        .catch((err: any) => {
          toast(err.response.data.message)

          // if user who has wrong login key or doesn't have login key request, throw error
          if (err.response.data.type) {
            toast('서비스를 이용하시려면 다시 로그인 해 주세요 !')
            logout()
            history.push('/')
          }
        })
      // this clean method will execute when all task processed
      categoryDone()
      postDone()
      loadCategory()
    }

    // take all insert error
    const onError = (err: Error): void => {
      if (err.message === 'Not_Admin_User') {
        toast('관리자만 이용 가능합니다 !')
        // logout method
        sessionStorage.clear()
        logout()
        history.push('/')
      } else if (err.message === 'No_Data_Category_Select_Select') {
        toast('변경할 포스트의 카테고리를 선택해 주세요 !')
      } else if (err.message === 'No_Data_Post_Select_Title') {
        toast('변경할 포스트를 선택해 주세요 !')
      } else if (err.message === 'No_Data_Category_Select') {
        toast('변경할 포스트의 카테고리를 선택해 주세요 !')
      } else if (err.message === 'No_Data_Post_Title') {
        toast('변경할 포스트의 제목을 입력해 주세요 !')
        postError('title')
      } else if (err.message === 'No_Data_Post_Sub_Title') {
        toast('변경할 포스트의 부제목을 입력해 주세요 !')
        postError('subTitle')
      } else if (err.message === 'No_Data_Post_Main_Text') {
        toast('변경할 포스트의 내용을 입력해 주세요 !')
        postError('mainText')
      }
    }

    // Promise
    userAdminCheck({
      loginLogined,
      oldCategory: selectCategory.trim(),
      newCategory: category.trim(),
      oldTitle: selectTitle.trim(),
      newTitle: title.trim(),
      newSubTitle: subTitle.trim(),
      newMainText: mainText.trim()
    })
      .then(oldCategoryCheck)
      .then(oldTitleCheck)
      .then(categoryCheck)
      .then(titleCheck)
      .then(subTitleCheck)
      .then(mainTextCheck)
      .then(requestToServer)
      .catch(onError)
  }

  // separator click, and mouse move
  public handleSeparatorMouseMove = (e: MouseEvent): void => {
    this.setState({
      leftPercentage: e.clientX / window.innerWidth
    })
  }
  // hand off
  public handleSeparatorMouseUp = (e: MouseEvent): void => {
    document.body.removeEventListener('mousemove', this.handleSeparatorMouseMove)
    window.removeEventListener('mouseup', this.handleSeparatorMouseUp)
  }
  // separator click
  public handleSeparatorMouseDown = (e: React.MouseEvent<any>): void => {
    document.body.addEventListener('mousemove', this.handleSeparatorMouseMove)
    window.addEventListener('mouseup', this.handleSeparatorMouseUp)
  }

  public render(): JSX.Element {
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

    // current category select change
    const CurrentCategorySelectChange = (data: CategoryStateInside[]): JSX.Element[] => {
      return data.map((object, i) => {
        return (
          <button key={i} onClick={this.handleCategorySelectChange} className="info">
            {object.category}
          </button>
        )
      })
    }

    // current category change
    const CurrentCategoryChange = (data: CategoryStateInside[]): JSX.Element[] => {
      return data.map((object, i) => {
        return (
          <button key={i} onClick={this.handleCategoryChange} className="info">
            {object.category}
          </button>
        )
      })
    }

    // current category select's posts
    const CurrentPostSelectChange = (data: CategoryStateInside[]): JSX.Element[] | JSX.Element => {
      const SelectedPosts = data.filter(value => value.category === this.props.change.selectCategory)

      if (SelectedPosts.length !== 0) {
        return SelectedPosts[0].posts.map((object, i) => {
          return (
            <button key={i} onClick={this.handlePostSelectChange} className="info">
              {object.title}
            </button>
          )
        })
      }
      return <button className="info">카테고리를 선택한 후에 포스트 선택을 해주세요</button>
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
                      <button className="info" onClick={this.handleCategorySelectShowNoneToogle}>
                        {this.props.change.selectCategory}
                      </button>
                      {this.state.categorySelectDropdown && (
                        <div className="editor-category-child-container">
                          <div className="editor-category-child">
                            {this.props.change.selectCategory !== '카테고리 선택' && (
                              <button onClick={this.handleCategorySelectChange} className="info">
                                카테고리 선택
                              </button>
                            )}
                            {CurrentCategorySelectChange(this.props.category)}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="editor-change-select-post">
                      <button className="info" onClick={this.handlePostSelectShowNoneToogle}>
                        {this.props.change.selectTitle}
                      </button>
                      {this.state.postSelectDropdown && (
                        <div className="editor-category-child-container">
                          <div className="editor-category-child">
                            {this.props.change.selectTitle !== '변경할 포스트 선택' && (
                              <button onClick={this.handlePostSelectChange} className="info">
                                변경할 포스트 선택
                              </button>
                            )}
                            {CurrentPostSelectChange(this.props.category)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button className="info" onClick={this.handleCategoryShowNoneToogle}>
                    {this.props.change.category}
                  </button>
                  {this.state.categoryDropdown && (
                    <div className="editor-category-child-container">
                      <div className="editor-category-child">
                        {this.props.change.selectCategory !== '카테고리 선택' && (
                          <button onClick={this.handleCategoryChange} className="info">
                            카테고리 선택
                          </button>
                        )}
                        {CurrentCategoryChange(this.props.category)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="editor-inside">
                  <MarkdownEditorContainer type={this.state.editorType} resource={this.state.resource} />
                </div>
                {/* */}
                {/* only can see mobile view */}
                <div className="editor-submit-mobile">
                  <button className="info" onClick={this.handleSubmit}>
                    포스트 수정 하기 !
                  </button>
                </div>
                {/* only can see mobile view */}
                {/* */}
              </div>
              <div className="preview" style={rightStyle}>
                <div className="preview-submit">
                  <button className="info" onClick={this.handleSubmit}>
                    포스트 수정 하기 !
                  </button>
                </div>

                <div className="preview-inside">
                  <h1 className="preview-title">{this.props.change.title}</h1>
                  <h3 className="preview-sub-title">{this.props.change.subTitle}</h3>
                  <div>
                    <MarkdownRendererContainer type={this.state.editorType} />
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

export default withRouter(PostChange)
