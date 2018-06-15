import * as React from 'react'

import { RouteComponentProps, withRouter } from 'react-router-dom'

import { Button } from 'reactstrap'
import { toast } from 'react-toastify'

import { AddPostState, PostAddAPIInterface } from 'store/modules/Post'
import { CategoryStateInside } from 'store/modules/Category'

import MarkdownEditorContainer from 'containers/MarkDownEditor/MarkDownEditorContainer'
import MarkdownRendererContainer from 'containers/MarkDownRenderer/MarkDownRendererContainer'

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
  leftPercentage: number
  postAddMessage: string
  showNone: boolean
  dropdown: boolean
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
  // state
  public state = {
    // for mde container's type
    editorType: 'add',
    resource: 'Post',
    leftPercentage: 0.5,
    postAddMessage: '포스트 추가 하기 !',
    showNone: false,
    dropdown: false
  }

  // handle Category add part show none
  public handlePostAddShowNoneToogle = (): void => {
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

  // Submit => Post Add
  public handleSubmit = (): void => {
    // Props
    const { loginLogined, logout, history, add, addPost, categoryDone, postDone, loadCategory, postError } = this.props

    // check user is logined or not
    const userAdminCheck = (data: PostAddMethodInterface): Promise<object> => {
      if (data.loginLogined !== false) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Not_Admin_User'))
    }

    // category value check
    const categoryCheck = (data: PostAddMethodInterface): Promise<object> => {
      if (data.category !== '카테고리 선택') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('No_Data_Category_Select'))
    }

    // title value check
    const titleCheck = (data: PostAddMethodInterface): Promise<object> => {
      if (data.title !== '') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('No_Data_Post_Title'))
    }

    // subTitle value check
    const subTitleCheck = (data: PostAddMethodInterface): Promise<object> => {
      if (data.subTitle !== '') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('No_Data_Post_Sub_Title'))
    }

    // mainText value check
    const mainTextCheck = (data: PostAddMethodInterface): Promise<object> => {
      if (data.mainText !== '') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('No_Data_Post_Main_Text'))
    }

    // request to server => post add function
    const requestToServer = async (data: PostAddMethodInterface): Promise<void> => {
      // request to server to adding post
      await addPost(data)
        // request call success
        .then((res: any) => {
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

    // error handler
    const onError = (err: Error): void => {
      if (err.message === 'Not_Admin_User') {
        toast('관리자만 이용 가능합니다 !')
        // logout method
        sessionStorage.clear()
        logout()
        history.push('/')
      } else if (err.message === 'No_Data_Category_Select') {
        toast('추가할 포스트의 카테고리를 선택해 주세요 !')
      } else if (err.message === 'No_Data_Post_Title') {
        toast('추가할 포스트의 제목을 입력해 주세요 !')
        postError('title')
      } else if (err.message === 'No_Data_Post_Sub_Title') {
        toast('추가할 포스트의부제목을 입력해 주세요 !')
        postError('subTitle')
      } else if (err.message === 'No_Data_Post_Main_Text') {
        toast('추가할 포스트의 본문을 입력해 주세요 !')
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

  // handle size between EditorView, PreVeiw
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
  // handle size between EditorView, PreView

  public render(): JSX.Element {
    // handle size bar
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

    // show current category
    const CurrentCategoryChange = (data: CategoryStateInside[]): JSX.Element[] => {
      return data.map((object, i) => {
        return (
          <button key={i} onClick={this.handleCategorySelectChange} className="primary">
            {object.category}
          </button>
        )
      })
    }

    return (
      <div className="editor-template">
        <div className="layout-container">
          <Button block={true} outline={true} color="primary" onClick={this.handlePostAddShowNoneToogle}>
            {this.state.postAddMessage}
          </Button>
        </div>
        {this.state.showNone && (
          <React.Fragment>
            <div className="editor-and-viewer">
              <div className="editor" style={leftStyle}>
                <div className="editor-category">
                  <button className="primary" onClick={this.handleCategorySelectShowNoneToogle}>
                    {this.props.add.category}
                  </button>
                  {this.state.dropdown && (
                    <div className="editor-category-child-container">
                      <div className="editor-category-child">
                        {this.props.add.category !== '카테고리 선택' && (
                          <button onClick={this.handleCategorySelectChange} className="primary">
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
                  <button className="primary" onClick={this.handleSubmit}>
                    포스트 생성 하기 !
                  </button>
                </div>
                {/* only can see mobile view */}
                {/* */}
              </div>
              <div className="preview" style={rightStyle}>
                <div className="preview-submit">
                  <button className="primary" onClick={this.handleSubmit}>
                    포스트 생성 하기 !
                  </button>
                </div>

                <div className="preview-inside">
                  <h1 className="preview-title">{this.props.add.title}</h1>
                  <h3 className="preview-sub-title">{this.props.add.subTitle}</h3>
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

export default withRouter(PostAdd)
