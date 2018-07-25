import * as React from 'react'

import { toast } from 'react-toastify'

import { RouteComponentProps, withRouter } from 'react-router-dom'

import { CategoryStateInside } from 'store/modules/Category'
import { PutChangeAPIInterface, GetPostBringAPIInterface } from 'store/modules/Post'

import MarkdownEditorChangeContainer from 'containers/MarkDownEditorChange/MarkDownEditorChangeContainer'
import MarkdownRendererChangeContainer from 'containers/MarkDownRendererChange/MarkDownRendererChangeContainer'
import regExp from 'lib/RegExp'

interface Props {
  // Login
  loginLogined: boolean
  // Category
  category: CategoryStateInside[]
  // Post state
  selectCategory: string
  newCategory: string
  selectTitle: string
  newTitle: string
  subTitle: string
  mainText: string
  loadingPending: boolean
  changePending: boolean
  // Method
  // Loading method
  loadCategory: () => any
  loadPost: (value: GetPostBringAPIInterface) => any
  // Change post method
  changeSelectCategory: (value: string) => void
  changeCategory: (value: string) => void
  changeSelectTitle: (value: string) => void
  changePost: (changePost: PutChangeAPIInterface) => any
  changePostError: (value: string) => void
  // Ending method
  logout: () => void
  postDone: () => void
  categoryDone: () => void
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
  oldCategory: string
  oldTitle: string
  newCategory: string
  newTitle: string
  newSubTitle: string
  newMainText: string
  changePending: boolean
}

interface CTarget {
  currentTarget: HTMLButtonElement
}

class PostChange extends React.Component<Props & RouteComponentProps<History>, State> {
  public state = {
    // For mde container's type
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
    this.props.changeSelectCategory(e.currentTarget.innerText)
  }

  // Change post select value
  public handlePostSelectChange = (e: CTarget) => {
    this.setState({
      categoryAndPostSelectDropdown: !this.state.categoryAndPostSelectDropdown
    })

    this.props.changeSelectTitle(e.currentTarget.innerText)

    if (e.currentTarget.innerText !== '변경할 포스트 선택') {
      this.props.loadPost({ category: this.props.selectCategory, title: e.currentTarget.innerText, type: 1 })
    }
  }

  // Change category value
  public handleCategoryChange = (e: CTarget) => {
    this.setState({
      categoryDropdown: !this.state.categoryDropdown
    })
    this.props.changeCategory(e.currentTarget.innerText)
  }

  // Category select dropdown
  public handleCategoryShowNoneToogle = () => {
    this.setState({
      categoryDropdown: !this.state.categoryDropdown
    })
  }

  // submit => post change
  public handleSubmit = (): void => {
    // State
    const {
      loginLogined,
      categoryDone,
      postDone,
      loadCategory,
      logout,
      history,
      changePost,
      changePostError,
      selectCategory,
      newCategory,
      selectTitle,
      newTitle,
      subTitle,
      mainText,
      changePending
    } = this.props

    // Pending check, if pending is true, return reject
    const pendingCheck = (data: PutChangeMethodInterface): Promise<object> => {
      if (data.changePending === true) {
        return Promise.reject(new Error(''))
      }
      return Promise.resolve(data)
    }

    // check user is logined or not
    const userAdminCheck = (data: PutChangeMethodInterface): Promise<object> => {
      if (data.loginLogined !== true) {
        return Promise.reject(new Error('Not_Admin_User'))
      }
      return Promise.resolve(data)
    }

    // check selectCategory selected or not
    const oldCategoryCheckedCheck = (post: PutChangeMethodInterface): Promise<object> => {
      if (post.oldCategory === '카테고리 선택') {
        return Promise.reject(new Error('No_Data_Category_Select_Select'))
      }
      return Promise.resolve(post)
    }

    const oldCategoryRegExpCheck = (post: PutChangeMethodInterface): Promise<object> => {
      // RegExp Test
      const oldCategoryTested = regExp.test(post.oldCategory)
      // If the data is not right
      if (oldCategoryTested === true) {
        return Promise.reject(new Error('Old_Category_/_?_&_#'))
      }
      return Promise.resolve(post)
    }

    // check selectTitle selected or not
    const oldTitleCheckedCheck = (post: PutChangeMethodInterface): Promise<object> => {
      if (post.oldTitle === '변경할 포스트 선택') {
        return Promise.reject(new Error('No_Data_Post_Select_Title'))
      }
      return Promise.resolve(post)
    }

    const oldTitleRegExpCheck = (post: PutChangeMethodInterface): Promise<object> => {
      // RegExp Test
      const oldTitleTested = regExp.test(post.oldTitle)
      // If the data is not right
      if (oldTitleTested === true) {
        return Promise.reject(new Error('Old_Title_/_?_&_#'))
      }
      return Promise.resolve(post)
    }

    // check category selected or not
    const newCategoryCheckedCheck = (post: PutChangeMethodInterface): Promise<object> => {
      if (post.newCategory === '카테고리 선택') {
        return Promise.reject(new Error('No_Data_Category_Select'))
      }
      return Promise.resolve(post)
    }

    const newCategoryRegExpCheck = (post: PutChangeMethodInterface): Promise<object> => {
      // RegExp Test
      const newCategoryTested = regExp.test(post.newCategory)
      // If the data is not right
      if (newCategoryTested === true) {
        return Promise.reject(new Error('New_Category_/_?_&_#'))
      }
      return Promise.resolve(post)
    }

    // check title is '' or not
    const newTitleNullCheck = (post: PutChangeMethodInterface): Promise<object> => {
      if (post.newTitle === '') {
        return Promise.reject(new Error('No_Data_Post_Title'))
      }
      return Promise.resolve(post)
    }

    const newTitleRegExpCheck = (post: PutChangeMethodInterface): Promise<object> => {
      // RegExp Test
      const newTitleTested = regExp.test(post.newTitle)
      // If the data is not right
      if (newTitleTested === true) {
        return Promise.reject(new Error('New_Title_/_?_&_#'))
      }
      return Promise.resolve(post)
    }

    // check subTitle is  '' or not
    const newSubTitleCheck = (post: PutChangeMethodInterface): Promise<object> => {
      if (post.newSubTitle === '') {
        return Promise.reject(new Error('No_Data_Post_Sub_Title'))
      }
      return Promise.resolve(post)
    }

    // check mainText is '' or not
    const newMainTextCheck = (post: PutChangeMethodInterface): Promise<object> => {
      if (post.newMainText === '') {
        return Promise.reject(new Error('No_Data_Post_Main_Text'))
      }
      return Promise.resolve(post)
    }

    // request
    const requestToServer = async (post: PutChangeMethodInterface): Promise<void> => {
      await changePost(post)
        // request call success
        .then(async (res: { value: any; action: any }) => {
          toast(res.action.payload.data.message, { type: 'success' })
        })
        // request call failure
        .catch((err: any) => {
          toast(err.response.data.message, { type: 'error' })

          // if user who has wrong login key or doesn't have login key request, throw error
          if (err.response.data.type) {
            toast('서비스를 이용하시려면 다시 로그인 해 주세요 !', { type: 'error' })
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
        toast('관리자만 이용 가능합니다 !', { type: 'error' })
        // logout method
        sessionStorage.clear()
        logout()
        history.push('/')
      } else if (err.message === 'No_Data_Category_Select_Select') {
        toast('변경할 포스트의 카테고리를 선택해 주세요 !', { type: 'error' })
      } else if (err.message === 'Old_Category_/_?_&_#') {
        toast("'#', '/', '&', '?' 의 특수문자 사용은 불가능 합니다 !", { type: 'error' })
      } else if (err.message === 'No_Data_Post_Select_Title') {
        toast('변경할 포스트를 선택해 주세요 !', { type: 'error' })
      } else if (err.message === 'Old_Title_/_?_&_#') {
        toast("'#', '/', '&', '?' 의 특수문자 사용은 불가능 합니다 !", { type: 'error' })
      } else if (err.message === 'No_Data_Category_Select') {
        toast('변경할 포스트의 카테고리를 선택해 주세요 !', { type: 'error' })
      } else if (err.message === 'New_Category_/_?_&_#') {
        toast("'#', '/', '&', '?' 의 특수문자 사용은 불가능 합니다 !", { type: 'error' })
      } else if (err.message === 'No_Data_Post_Title') {
        toast('변경할 포스트의 제목을 입력해 주세요 !', { type: 'error' })
        changePostError('title')
      } else if (err.message === 'New_Title_/_?_&_#') {
        toast("'#', '/', '&', '?' 의 특수문자 사용은 불가능 합니다 !", { type: 'error' })
        changePostError('title')
      } else if (err.message === 'No_Data_Post_Sub_Title') {
        toast('변경할 포스트의 부제목을 입력해 주세요 !', { type: 'error' })
        changePostError('subTitle')
      } else if (err.message === 'No_Data_Post_Main_Text') {
        toast('변경할 포스트의 내용을 입력해 주세요 !', { type: 'error' })
        changePostError('mainText')
      }
    }

    // Promise
    pendingCheck({
      loginLogined,
      oldCategory: selectCategory.trim(),
      newCategory: newCategory.trim(),
      oldTitle: selectTitle.trim(),
      newTitle: newTitle.trim(),
      newSubTitle: subTitle.trim(),
      newMainText: mainText.trim(),
      changePending
    })
      .then(userAdminCheck)
      .then(oldCategoryCheckedCheck)
      .then(oldCategoryRegExpCheck)
      .then(oldTitleCheckedCheck)
      .then(oldTitleRegExpCheck)
      .then(newCategoryCheckedCheck)
      .then(newCategoryRegExpCheck)
      .then(newTitleNullCheck)
      .then(newTitleRegExpCheck)
      .then(newSubTitleCheck)
      .then(newMainTextCheck)
      .then(requestToServer)
      .catch(onError)
  }

  // Optimization component
  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (
      nextState !== this.state ||
      nextProps.selectCategory !== this.props.selectCategory ||
      nextProps.selectTitle !== this.props.selectTitle ||
      nextProps.newCategory !== this.props.newCategory
    ) {
      return true
    }
    return false
  }

  public render(): JSX.Element {
    // Current category select
    const currentCategorySelectChange = (data: CategoryStateInside[]): JSX.Element[] | JSX.Element => {
      return data.map((object, i) => {
        return (
          <button key={i} onClick={this.handleCategorySelectChange} className="info">
            {object.category}
          </button>
        )
      })
    }

    // Category change
    const currentCategoryChange = (data: CategoryStateInside[]): JSX.Element[] | JSX.Element => {
      return data.map((object, i) => {
        return (
          <button key={i} onClick={this.handleCategoryChange} className="info">
            {object.category}
          </button>
        )
      })
    }

    // Current category select's posts
    const CurrentPostSelectChange = (data: CategoryStateInside[]): JSX.Element[] | JSX.Element => {
      const SelectedPosts = data.filter(value => value.category === this.props.selectCategory)

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
              <MarkdownEditorChangeContainer />
            </div>
          </div>
        )
      }

      return (
        <div className="admin-post-preview-container">
          <div className="admin-post-preview">
            <h1 className="admin-post-preview-title">{this.props.newTitle}</h1>
            <h3 className="admin-post-preview-sub-title">{this.props.subTitle}</h3>
            <div className="admin-post-preview-main-text">
              <MarkdownRendererChangeContainer />
              {}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="admin-post-container">
        <button className="info admin-post-button" color="info" onClick={this.handlePostChangeShowNoneToogle}>
          {this.state.postChangeMessage}
        </button>

        {this.state.showNone && (
          <div className="admin-post-editor-and-preview">
            <div className="admin-post-preview-change-button">
              <button className="info" onClick={this.changeEditAndPreview}>
                에디터 / 프리뷰 화면 전환
              </button>
            </div>

            <div className="admin-post-select-container">
              <div className="admin-post-select-category-and-post">
                <div className="admin-category-select">
                  <button className="info" onClick={this.handleCategoryAndPostSelectShowNoneToogle}>
                    {this.props.selectCategory}
                  </button>
                  {this.state.categoryAndPostSelectDropdown && (
                    <div className="admin-post-select-child-container">
                      <div className="admin-post-select-child">
                        {this.props.selectCategory !== '카테고리 선택' && (
                          <button onClick={this.handleCategorySelectChange} className="info">
                            카테고리 선택
                          </button>
                        )}
                        {currentCategorySelectChange(this.props.category)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="admin-post-select">
                  <button className="info" onClick={this.handleCategoryAndPostSelectShowNoneToogle}>
                    {this.props.selectTitle}
                  </button>
                  {this.state.categoryAndPostSelectDropdown && (
                    <div className="admin-post-select-child-container">
                      <div className="admin-post-select-child">
                        {this.props.selectTitle !== '변경할 포스트 선택' && (
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
              <div className="admin-category-select">
                <button className="info" onClick={this.handleCategoryShowNoneToogle}>
                  {this.props.newCategory}
                </button>
                {this.state.categoryDropdown && (
                  <div className="admin-post-select-child-container">
                    <div className="admin-post-select-child">
                      {this.props.selectCategory !== '카테고리 선택' && (
                        <button onClick={this.handleCategoryShowNoneToogle} className="info">
                          카테고리 선택
                        </button>
                      )}
                      {currentCategoryChange(this.props.category)}
                    </div>
                  </div>
                )}
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
