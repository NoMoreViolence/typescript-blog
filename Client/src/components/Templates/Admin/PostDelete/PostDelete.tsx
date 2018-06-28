import * as React from 'react'

import { Button } from 'reactstrap'
import { toast } from 'react-toastify'

import { RouteComponentProps, withRouter } from 'react-router-dom'

import { CategoryStateInside } from 'store/modules/Category'
import { DeleteDeleteAPIInterface } from 'store/modules/Post'

import MarkdownRendererContainer from 'containers/MarkDownRendererDelete/MarkDownRendererDeleteContainer'

interface Props {
  loginLogined: boolean
  logout: () => void
  category: CategoryStateInside[]
  deleteCategory: string
  deleteTitle: string
  deleteShowTitle: string
  deleteSubTitle: string
  changeCategorySelect: (value: string) => void
  changeTitleSelect: (value: string) => void
  deletePost: (value: DeleteDeleteAPIInterface) => any
  loadPost: (value: any) => void
  categoryDone: () => void
  postDone: () => void
  loadCategory: () => void
}

interface State {
  editorType: string
  postDeleteMessage: string
  showNone: boolean
  selectDropdown: boolean
}

interface CTarget {
  currentTarget: HTMLButtonElement
}

interface ChangeTitleValues {
  category: string
  title: string
  type: number
}

interface DeleteDeleteMethodInterface {
  loginLogined: boolean
  category: string
  title: string
}

class PostDelete extends React.Component<Props & RouteComponentProps<History>, State> {
  public state = {
    editorType: 'delete',
    postDeleteMessage: '포스트 삭제 하기 !',
    showNone: false,
    selectDropdown: false
  }

  // Category delete dropdown
  public handlePostDeleteShowNoneToogle = (): void => {
    if (this.state.showNone === false) {
      this.setState({
        showNone: !this.state.showNone,
        postDeleteMessage: '포스트 삭제 접기 !'
      })
    } else {
      this.setState({
        showNone: !this.state.showNone,
        postDeleteMessage: '포스트 삭제 하기 !'
      })
    }
  }

  // Category select & title select dropdown
  public handleCategoryAndPostShowNoneToogle = (): void => {
    this.setState({
      selectDropdown: !this.state.selectDropdown
    })
  }

  // Change category
  public handleCategorySelectChange = (e: CTarget): void => {
    this.props.changeCategorySelect(e.currentTarget.innerText)
  }
  // Change title
  public handlePostSelectChange = (e: CTarget): void => {
    const { changeTitleSelect, loadPost, deleteCategory } = this.props

    // SetState
    this.setState({
      selectDropdown: !this.state.selectDropdown
    })

    // ChangeTitleSelect(innerText)
    const titleSelectChange = (data: ChangeTitleValues): Promise<object> => {
      // Change
      changeTitleSelect(data.title)
      // Return innerText
      return Promise.resolve(data)
    }

    // Post load part
    const bringPostMightBeDeleted = (data: ChangeTitleValues): void => {
      // If the innerText Data is not initial value, excute loadPost
      if (data.title !== '삭제할 포스트 선택') {
        loadPost({ category: this.props.deleteCategory, title: data.title, type: data.type })
      }
    }

    // Promise
    titleSelectChange({ category: deleteCategory.trim(), title: e.currentTarget.innerText.trim(), type: 2 }).then(
      bringPostMightBeDeleted
    )
  }

  // Submit => post delete
  public handleSubmit = (): void => {
    // Props
    const {
      loginLogined,
      deleteCategory,
      deleteTitle,
      deletePost,
      logout,
      history,
      categoryDone,
      postDone,
      loadCategory
    } = this.props

    // Check user is logined or not
    const userAdminCheck = (data: DeleteDeleteMethodInterface): Promise<object> => {
      if (data.loginLogined === true) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Not_Admin_User'))
    }

    // Check category is empty or not
    const categoryCheck = (data: DeleteDeleteMethodInterface): Promise<object> => {
      if (data.category !== '카테고리 선택') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('No_Data_Category_Select'))
    }

    // Check title is empty or not
    const titleCheck = (data: DeleteDeleteMethodInterface): Promise<object> => {
      if (data.title !== '삭제할 포스트 선택') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('No_Data_Title_Select'))
    }

    // Request
    const requestToServer = async (data: DeleteDeleteMethodInterface): Promise<void> => {
      await deletePost({ category: data.category, title: data.title })
        .then((res: any) => {
          toast(res.action.payload.data.message)
        })
        .catch((err: any) => {
          toast(err.response.data.message)

          // If user who has wrong login key or doesn't have login key request, throw error
          if (err.response.data.type) {
            toast('서비스를 이용하시려면 다시 로그인 해 주세요 !')
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
        toast('관리자만 이용 가능합니다 !')
        // Logout method
        sessionStorage.clear()
        logout()
        history.push('/')
      } else if (err.message === 'No_Data_Category_Select') {
        toast('삭제할 포스트의 카테고리를 선택해 주세요 !')
      } else if (err.message === 'No_Data_Title_Select') {
        toast('삭제할 포스트를 선택해 주세요 !')
      }
    }

    // Promise
    userAdminCheck({ loginLogined, category: deleteCategory.trim(), title: deleteTitle.trim() })
      .then(categoryCheck)
      .then(titleCheck)
      .then(requestToServer)
      .catch(onError)
  }

  public render(): JSX.Element {
    // Category buttons
    const CurrentCategorySelectChange = (data: CategoryStateInside[]): JSX.Element[] => {
      return data.map((object, i) => {
        return (
          <button key={i} onClick={this.handleCategorySelectChange} className="danger">
            {object.category}
          </button>
        )
      })
    }

    // Title buttons
    const CurrentPostSelectChange = (data: CategoryStateInside[]): JSX.Element[] | JSX.Element => {
      const SelectedPosts = data.filter(value => value.category === this.props.deleteCategory)

      if (SelectedPosts.length !== 0) {
        return SelectedPosts[0].posts.map((object, i) => {
          return (
            <button key={i} onClick={this.handlePostSelectChange} className="danger">
              {object.title}
            </button>
          )
        })
      }
      return <button className="danger">카테고리를 선택한 후에 포스트 선택을 해주세요</button>
    }

    return (
      <div className="admin-post-container">
        <Button block={true} outline={true} color="danger" onClick={this.handlePostDeleteShowNoneToogle}>
          {this.state.postDeleteMessage}
        </Button>

        {this.state.showNone && (
          <div className="admin-post-only-preview">
            <div className="admin-post-select-container">
              <div className="admin-post-select-category-and-post">
                <div className="admin-post-select">
                  <button className="danger" onClick={this.handleCategoryAndPostShowNoneToogle}>
                    {this.props.deleteCategory}
                  </button>
                  {this.state.selectDropdown && (
                    <div className="admin-post-select-child-container">
                      <div className="admin-post-select-child">
                        {this.props.deleteCategory !== '카테고리 선택' && (
                          <button onClick={this.handleCategorySelectChange} className="danger">
                            카테고리 선택
                          </button>
                        )}
                        {CurrentCategorySelectChange(this.props.category)}
                      </div>
                    </div>
                  )}
                </div>
                <div className="admin-post-select">
                  <button className="danger" onClick={this.handleCategoryAndPostShowNoneToogle}>
                    {this.props.deleteTitle}
                  </button>
                  {this.state.selectDropdown && (
                    <div className="admin-post-select-child-container">
                      <div className="admin-post-select-child">
                        {this.props.deleteTitle !== '삭제할 포스트 선택' && (
                          <button onClick={this.handlePostSelectChange} className="danger">
                            삭제할 포스트 선택
                          </button>
                        )}
                        {CurrentPostSelectChange(this.props.category)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Post delete */}
            <div className="admin-post-preview-container">
              <div className="admin-post-preview">
                <h1 className="admin-post-preview-title">{this.props.deleteShowTitle}</h1>
                <h3 className="admin-post-preview-sub-title">{this.props.deleteSubTitle}</h3>
                <div className="admin-post-preview-main-text">
                  <MarkdownRendererContainer />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="admin-post-submit">
              <button className="danger" onClick={this.handleSubmit}>
                포스트 삭제 하기 !
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(PostDelete)
