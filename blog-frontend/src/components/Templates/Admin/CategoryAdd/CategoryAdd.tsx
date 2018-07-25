import * as React from 'react'

import './CategoryAdd.css'
import { toast } from 'react-toastify'

import RegExp from 'lib/RegExp'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface Props {
  loginLogined: boolean
  addCategoryInputValue: string
  pending: boolean
  categoryLoad: () => void
  addCategoryInputChange: (value: string) => void
  addCategory: (value: string) => any
  categoryDone: () => void
  postDone: () => void
  logout: () => void
}

interface CategoryAddMethodInterface {
  loginLogined: boolean
  addCategoryInputValue: string
  pending: boolean
}

interface Target {
  target: HTMLInputElement
}

class CategoryAdd extends React.Component<Props & RouteComponentProps<History>> {
  // to use focus()
  public addCategoryInput: any

  // change category input value
  public handleChange = (e: Target): void => {
    this.props.addCategoryInputChange(e.target.value)
  }

  // category add method
  public handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    // stop basic stuff
    e.preventDefault()

    // Props
    const {
      loginLogined,
      addCategoryInputValue,
      addCategoryInputChange,
      addCategory,
      categoryLoad,
      logout,
      categoryDone,
      postDone,
      history,
      pending
    } = this.props

    // Check the request is still in process
    const pendingCheck = (data: CategoryAddMethodInterface): Promise<object> => {
      if (data.pending === true) {
        return Promise.reject(new Error('Still_Loading'))
      }

      return Promise.resolve(data)
    }

    // check user is logined or not
    const userAdminCheck = (data: CategoryAddMethodInterface): Promise<object> => {
      // compare logined or not
      if (data.loginLogined !== true) {
        return Promise.reject(new Error('Not_Admin_User'))
      }
      return Promise.resolve(data)
    }

    const inputValueSpecialSymbolsCheck = (data: CategoryAddMethodInterface): Promise<object> => {
      // the regexp value
      const regExpTest = RegExp.test(data.addCategoryInputValue)

      if (regExpTest === true) {
        return Promise.reject(new Error('/_?_&_#'))
      }

      return Promise.resolve(data)
    }

    // check the input value is '' or not
    const inputValueNullCheck = (data: CategoryAddMethodInterface): Promise<object> => {
      // compare the value exist or not
      if (data.addCategoryInputValue === '') {
        return Promise.reject(new Error('No_Input'))
      }
      return Promise.resolve(data)
    }

    // check the input value.toUpperCase() is 'admin' or not
    const inputValueAdminCheck = (data: CategoryAddMethodInterface): Promise<object> => {
      // compare the value is 'admin' or not
      if (data.addCategoryInputValue.toLowerCase() === 'admin') {
        return Promise.reject(new Error('Cannot_Category_Name_To_Be_Admin'))
      }
      return Promise.resolve(data)
    }

    // create category
    const requestToServer = async (data: CategoryAddMethodInterface): Promise<void> => {
      // request to server for create category
      await addCategory(data.addCategoryInputValue)
        // succeed create category
        .then((res: any) => {
          toast(res.action.payload.data.message, { type: 'success' })
        })
        // failure create category
        .catch((err: any) => {
          this.addCategoryInput.focus()
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
      categoryLoad()
    }

    // error handler
    const onError = (err: Error): void => {
      if (err.message === 'Not_Admin_User') {
        // none admin user
        toast('관리자만 이용 가능합니다 !', { type: 'error' })
        addCategoryInputChange('')
        logout()
        history.push('/')
      } else if (err.message === '/_?_&_#') {
        toast(`'${err.message}' 기호는 카테고리에 추가할 수 없습니다 !`, { type: 'error' })
        addCategoryInputChange('')
        this.addCategoryInput.focus()
      } else if (err.message === 'No_Input') {
        // no input
        toast('추가할 카테고리를 입력해 주세요 !', { type: 'error' })
        addCategoryInputChange('')
        this.addCategoryInput.focus()
      } else if (err.message === 'Cannot_Category_Name_To_Be_Admin') {
        // category name should not be equal to 'admin'.toLowerCase()
        toast('관리자 페이지 URL 카테고리는 생성 불가능 합니다 !', { type: 'error' })
        addCategoryInputChange('')
        this.addCategoryInput.focus()
      }
    }

    // Promise
    pendingCheck({ loginLogined, addCategoryInputValue: addCategoryInputValue.trim(), pending })
      .then(userAdminCheck)
      .then(inputValueSpecialSymbolsCheck)
      .then(inputValueNullCheck)
      .then(inputValueAdminCheck)
      .then(requestToServer)
      .catch(onError)
  }

  // Optimization rendering problem
  public shouldComponentUpdate(nextProps: Props) {
    if (nextProps !== this.props) {
      return true
    }
    return false
  }

  public render(): JSX.Element {
    return (
      <div className="category-add-container">
        <h5 className="category-add-p">카테고리 추가</h5>
        <form onSubmit={this.handleSubmit}>
          <div className="category-add-form">
            <input
              type="text"
              name="addCategory"
              placeholder="추가할 카테고리 입력"
              className="primary-input category-add-input"
              value={this.props.addCategoryInputValue}
              onChange={this.handleChange}
              ref={ref => (this.addCategoryInput = ref)}
            />
            <button className="primary">카테고리 추가</button>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(CategoryAdd)
