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
  postChangeMessage: string
  showNone: boolean
  editorOrPreview: boolean
  categoryAndPostSelectDropdown: boolean
  categoryDropdown: boolean
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
    // For mde container's type
    editorType: 'change',
    resource: 'Put',
    postChangeMessage: '포스트 수정 하기 !',
    showNone: false,
    editorOrPreview: true,
    categoryAndPostSelectDropdown: false,
    categoryDropdown: false
  }

  // Handle Category add part show none
  public handlePostChangeShowNoneToogle = (): void => {
    if (this.state.showNone === false) {
      this.setState({
        showNone: !this.state.showNone,
        postChangeMessage: '포스트 수정 접기 !'
      })
    } else {
      this.setState({
        showNone: !this.state.showNone,
        postChangeMessage: '포스트 수정 하기 !'
      })
    }
  }

  // Change editor view or render view
  public changeEditAndPreview = (): void => {
    this.setState({
      editorOrPreview: !this.state.editorOrPreview
    })
  }

  // Category & post select dropdown
  public handleCategoryAndPostSelectShowNoneToogle = () => {
    this.setState({
      categoryAndPostSelectDropdown: !this.state.categoryAndPostSelectDropdown
    })
  }

  // Change category select value
  public handleCategorySelectChange = (e: CTarget) => {
    this.props.changeCategorySelect(e.currentTarget.innerText)
  }

  // Change post select value
  public handlePostSelectChange = (e: CTarget) => {
    this.setState({
      categoryAndPostSelectDropdown: !this.state.categoryAndPostSelectDropdown
    })

    this.props.changeTitleSelect(e.currentTarget.innerText)

    if (e.currentTarget.innerText !== '변경할 포스트 선택') {
      this.props.loadPost({ category: this.props.change.selectCategory, title: e.currentTarget.innerText, type: 1 })
    }
  }

  // Category select dropdown
  public handleCategoryShowNoneToogle = () => {
    this.setState({
      categoryDropdown: !this.state.categoryDropdown
    })
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

  public render(): JSX.Element {
    // Current category select
    const currentCategoryChange = (data: CategoryStateInside[]): JSX.Element[] | JSX.Element => {
      return data.map((object, i) => {
        return (
          <button key={i} onClick={this.handleCategorySelectChange} className="info">
            {object.category}
          </button>
        )
      })
    }

    // Current category select's posts
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

    // Show editor, or preview
    // Data: this.state.editorOrPreview
    const editorOrPreview = (data: boolean) => {
      if (data === true) {
        return (
          <div className="admin-post-editor-container">
            <div className="admin-post-editor">
              <MarkdownEditorContainer type={this.state.editorType} resource={this.state.resource} />
            </div>
          </div>
        )
      }

      return (
        <div className="admin-post-preview-container">
          <div className="admin-post-preview">
            <h1 className="admin-post-preview-title">{this.props.change.title}</h1>
            <h3 className="admin-post-preview-sub-title">{this.props.change.subTitle}</h3>
            <div className="admin-post-preview-main-text">
              <MarkdownRendererContainer type={this.state.editorType} />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="admin-post-container">
        <Button block={true} outline={true} color="info" onClick={this.handlePostChangeShowNoneToogle}>
          {this.state.postChangeMessage}
        </Button>

        {this.state.showNone && (
          <div className="admin-post-editor-and-preview">
            <div className="admin-post-preview-change-button">
              <Button color="info" onClick={this.changeEditAndPreview}>
                에디터 / 프리뷰 화면 전환
              </Button>
            </div>

            <div className="admin-post-select-container">
              <div className="admin-post-select-category-and-post">
                <div className="admin-post-select">
                  <button className="info" onClick={this.handleCategoryAndPostSelectShowNoneToogle}>
                    {this.props.change.selectCategory}
                  </button>
                  {this.state.categoryAndPostSelectDropdown && (
                    <div className="admin-post-select-child-container">
                      <div className="admin-post-select-child">
                        {this.props.change.selectCategory !== '카테고리 선택' && (
                          <button onClick={this.handleCategorySelectChange} className="info">
                            카테고리 선택
                          </button>
                        )}
                        {currentCategoryChange(this.props.category)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="admin-post-select">
                  <button className="info" onClick={this.handleCategoryAndPostSelectShowNoneToogle}>
                    {this.props.change.selectTitle}
                  </button>
                  {this.state.categoryAndPostSelectDropdown && (
                    <div className="admin-post-select-child-container">
                      <div className="admin-post-select-child">
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
            </div>
            {/* Edior And Preview */}
            {editorOrPreview(this.state.editorOrPreview)}

            <div className="admin-post-submit">
              <button className="info" onClick={this.handleSubmit}>
                포스트 수정 하기 !
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(PostChange)
