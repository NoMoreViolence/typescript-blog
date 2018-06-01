import * as React from 'react'

// import { Button } from 'reactstrap'
import { toast } from 'react-toastify'

import { CategoryStateInside } from 'store/modules/Category'
import { DeletePostState, GetPostBringAPIInterface, DeleteDeleteAPIInterface } from 'store/modules/Post'

interface Props {
  category: CategoryStateInside[]
  delete: DeletePostState
  loadCategory: () => any
  loadPost: (value: GetPostBringAPIInterface) => any
  changeCategorySelect: (value: string) => any
  changeTitleSelect: (value: string) => any
  deleteCategory: (value: DeleteDeleteAPIInterface) => any
  postDone: () => any
  categoryDone: () => any
}

interface State {
  postDeleteMessage: string
  showNone: boolean
  categorySelectDropdown: boolean
  postSelectDropdown: boolean
}

interface CTarget {
  currentTarget: HTMLButtonElement
}

class PostDelete extends React.Component<Props, State> {
  public state = {
    postDeleteMessage: '포스트 삭제 하기 !',
    showNone: false,
    categorySelectDropdown: false,
    postSelectDropdown: false
  }

  // category delete dropdown
  public handlePostDeleteShowNoneToogle = () => {
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

  // category select dropdown
  public handleCategoryShowNoneToogle = () => {
    this.setState({
      categorySelectDropdown: !this.state.categorySelectDropdown
    })
  }
  // post select dropdown
  public handlePostShowNoneToogle = () => {
    this.setState({
      postSelectDropdown: !this.state.postSelectDropdown
    })
  }

  // change category & title
  public handleCategorySelectChange = (e: CTarget) => {
    this.setState({
      categorySelectDropdown: !this.state.categorySelectDropdown
    })
    this.props.changeCategorySelect(e.currentTarget.innerText)
  }
  public handlePostSelectChange = (e: CTarget) => {
    this.setState({
      postSelectDropdown: !this.state.postSelectDropdown
    })
    this.props.changeTitleSelect(e.currentTarget.innerText)
  }

  public handleSubmit = () => {
    const { selectCategory, selectTitle } = this.props.delete
    interface ForDeleteValueCheck {
      category?: string
      title?: string
    }
    const categoryCheck = (value: ForDeleteValueCheck) => {
      if (value.category !== '카테고리 선택') {
        return new Promise(function(resolve, reject) {
          resolve(value)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('삭제할 포스트의 카테고리를 선택해 주세요 !'))
      })
    }
    const titleCheck = (value: ForDeleteValueCheck) => {
      if (value.title !== '삭제할 포스트 선택') {
        return new Promise(function(resolve, reject) {
          resolve(value)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('삭제할 포스트를 선택해 주세요 !'))
      })
    }
    const requestToServer = (value: ForDeleteValueCheck) => {
      this.props.deleteCategory(value)
    }

    const onError = (err: Error) => {
      toast(err.message)
    }

    categoryCheck({ category: selectCategory, title: selectTitle })
      .then(titleCheck)
      .then(requestToServer)
      .catch(onError)
  }
  public render() {
    return <div />
  }
}

export default PostDelete
