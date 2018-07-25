import * as React from 'react'

import { toast } from 'react-toastify'

import { RouteComponentProps, withRouter } from 'react-router-dom'

import { AddPostState, PostAddAPIInterface } from 'store/modules/Post'
import { CategoryStateInside } from 'store/modules/Category'

import MarkdownEditorAddContainer from 'containers/MarkDownEditorAdd/MarkDownEditorAddContainer'
import MarkdownRendererAddContainer from 'containers/MarkDownRendererAdd/MarkDownRendererAddContainer'

interface Props {
  loginLogined: boolean
  logout: () => void
  category: CategoryStateInside[]
  add: AddPostState
  loadCategory: () => any
  changeCategory: (value: string) => any
  addPost: (AddPost: PostAddAPIInterface) => any
  postDone: () => void
  categoryDone: () => void
  postError: (value: string) => void
}

interface State {
  postAddMessage: string
  showNone: boolean
  dropdown: boolean
  editorOrPreview: boolean
}

interface PostAddMethodInterface {
  loginLogined: boolean
  category?: string
  title?: string
  subTitle?: string
  mainText?: string
}

interface CTarget {
  currentTarget: HTMLButtonElement
}

class PostAdd extends React.Component<Props & RouteComponentProps<History>, State> {
  // State
  public state = {
    editorOrPreview: true,
    postAddMessage: '포스트 추가 하기 !',
    showNone: false,
    dropdown: false
  }

  // Handle Category add part show none
  public handlePostAddShowNoneToogle = (): void => {
    if (this.state.showNone === false) {
      this.setState({
        showNone: !this.state.showNone,
        postAddMessage: '포스트 추가 접기 !'
      })
    } else {
      this.setState({
        showNone: !this.state.showNone,
        postAddMessage: '포스트 추가 하기 !'
      })
    }
  }

  // Handle Category Select show none
  public handleCategorySelectShowNoneToogle = (): void => {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }
  // Category Select Change
  public handleCategorySelectChange = (e: CTarget): void => {
    this.setState({
      dropdown: false
    })
    this.props.changeCategory(e.currentTarget.innerText)
  }

  // Change editor view or render view
  public changeEditAndPreview = () => {
    this.setState({
      editorOrPreview: !this.state.editorOrPreview
    })
  }

  // Submit => Post Add
  public handleSubmit = (): void => {
    // Props
    const { loginLogined, logout, history, add, addPost, categoryDone, postDone, loadCategory, postError } = this.props

    // Check user is logined or not
    const userAdminCheck = (data: PostAddMethodInterface): Promise<object> => {
      if (data.loginLogined !== false) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Not_Admin_User'))
    }

    // Category value check
    const categoryCheck = (data: PostAddMethodInterface): Promise<object> => {
      if (data.category !== '카테고리 선택') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('No_Data_Category_Select'))
    }

    // Title value check
    const titleCheck = (data: PostAddMethodInterface): Promise<object> => {
      if (data.title !== '') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('No_Data_Post_Title'))
    }

    // SubTitle value check
    const subTitleCheck = (data: PostAddMethodInterface): Promise<object> => {
      if (data.subTitle !== '') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('No_Data_Post_Sub_Title'))
    }

    // MainText value check
    const mainTextCheck = (data: PostAddMethodInterface): Promise<object> => {
      if (data.mainText !== '') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('No_Data_Post_Main_Text'))
    }

    // Request to server => post add function
    const requestToServer = async (data: PostAddMethodInterface): Promise<void> => {
      // Request to server to adding post
      await addPost(data)
        // Request call success
        .then((res: any) => {
          toast(res.action.payload.data.message, { type: 'success' })
        })
        // Request call failure
        .catch((err: any) => {
          toast(err.response.data.message, { type: 'error' })

          // If user who has wrong login key or doesn't have login key request, throw error
          if (err.response.data.type) {
            toast('서비스를 이용하시려면 다시 로그인 해 주세요 !', { type: 'error' })
            logout()
            history.push('/')
          }
        })
      // This clean method will execute when all task processed
      categoryDone()
      postDone()
      loadCategory()
    }

    // Error handler
    const onError = (err: Error): void => {
      if (err.message === 'Not_Admin_User') {
        toast('관리자만 이용 가능합니다 !', { type: 'error' })
        // Logout method
        sessionStorage.clear()
        logout()
        history.push('/')
      } else if (err.message === 'No_Data_Category_Select') {
        toast('추가할 포스트의 카테고리를 선택해 주세요 !', { type: 'error' })
      } else if (err.message === 'No_Data_Post_Title') {
        toast('추가할 포스트의 제목을 입력해 주세요 !', { type: 'error' })
        postError('title')
      } else if (err.message === 'No_Data_Post_Sub_Title') {
        toast('추가할 포스트의부제목을 입력해 주세요 !', { type: 'error' })
        postError('subTitle')
      } else if (err.message === 'No_Data_Post_Main_Text') {
        toast('추가할 포스트의 본문을 입력해 주세요 !', { type: 'error' })
        postError('mainText')
      }
    }

    // Promise
    userAdminCheck({
      loginLogined,
      category: add.category.trim(),
      title: add.title.trim(),
      subTitle: add.subTitle.trim(),
      mainText: add.mainText.trim()
    })
      .then(categoryCheck)
      .then(titleCheck)
      .then(subTitleCheck)
      .then(mainTextCheck)
      .then(requestToServer)
      .catch(onError)
  }

  // Optimization component
  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextState !== this.state || nextProps.add.category !== this.props.add.category) {
      return true
    }
    return false
  }

  public render(): JSX.Element {
    // Show current category
    const currentCategoryChange = (data: CategoryStateInside[]): JSX.Element[] => {
      return data.map((object, i) => {
        return (
          <button key={i} onClick={this.handleCategorySelectChange} className="primary">
            {object.category}
          </button>
        )
      })
    }

    // Show editor, or preview
    // Data: this.state.editorOrPreview
    const editorOrPreview = (data: boolean): JSX.Element => {
      if (data === true) {
        return (
          <div className="admin-post-editor-container">
            <div className="admin-post-editor">
              <MarkdownEditorAddContainer />
            </div>
          </div>
        )
      }

      return (
        <div className="admin-post-preview-container">
          <div className="admin-post-preview">
            <h1 className="admin-post-preview-title">{this.props.add.title}</h1>
            <h3 className="admin-post-preview-sub-title">{this.props.add.subTitle}</h3>
            <div className="admin-post-preview-main-text">
              <MarkdownRendererAddContainer />
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="admin-post-container">
        {/* Button that control post add */}
        <button className="primary admin-post-button" onClick={this.handlePostAddShowNoneToogle}>
          {this.state.postAddMessage}
        </button>

        {/* This part show when activate post add button */}
        {this.state.showNone && (
          <div className="admin-post-editor-and-preview">
            <div className="admin-post-preview-change-button">
              <button className="primary" onClick={this.changeEditAndPreview}>
                에디터 / 프리뷰 화면 전환
              </button>
            </div>

            <div className="admin-post-select-container">
              <button className="primary" onClick={this.handleCategorySelectShowNoneToogle}>
                {this.props.add.category}
              </button>
              {this.state.dropdown && (
                <div className="admin-post-select-child-container">
                  <div className="admin-post-select-child">
                    {this.props.add.category !== '카테고리 선택' && (
                      <button onClick={this.handleCategorySelectChange} className="primary">
                        카테고리 선택
                      </button>
                    )}
                    {currentCategoryChange(this.props.category)}
                  </div>
                </div>
              )}
            </div>

            {/* Edior And Preview */}
            {editorOrPreview(this.state.editorOrPreview)}

            <div className="admin-post-submit">
              <button className="primary" onClick={this.handleSubmit}>
                포스트 생성 하기 !
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(PostAdd)
