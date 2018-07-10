import * as React from 'react'
import './CategoryAdd.css'
import { Form, InputGroup, Input, Button } from 'reactstrap'
import { toast } from 'react-toastify'

import { withRouter, RouteComponentProps } from 'react-router-dom'

interface Props {
  loginLogined: boolean
  categoryLoad: () => void
  addCategoryInputValue: string
  addCategoryInputChange: (value: string) => void
  addCategory: (value: string) => any
  logout: () => void
  categoryDone: () => void
  postDone: () => void
}

interface CategoryAddMethodInterface {
  loginLogined: boolean
  addCategoryInputValue: string
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
      history
    } = this.props

    // check user is logined or not
    const userAdminCheck = (data: CategoryAddMethodInterface): Promise<object> => {
      // compare logined or not
      if (data.loginLogined) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Not_Admin_User'))
    }

    // check the input value is '' or not
    const inputValueCheck = (data: CategoryAddMethodInterface): Promise<object> => {
      // compare the value exist or not
      if (data.addCategoryInputValue !== '') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('No_Input'))
    }

    // check the input value.toUpperCase() is 'admin' or not
    const inputValueAdminCheck = (data: CategoryAddMethodInterface): Promise<object> => {
      // compare the value is 'admin' or not
      if (data.addCategoryInputValue.toLowerCase() !== 'admin') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Cannot_Category_Name_To_Be_Admin'))
    }

    // create category
    const requestToServer = async (data: CategoryAddMethodInterface): Promise<void> => {
      // request to server for create category
      await addCategory(data.addCategoryInputValue)
        // succeed create category
        .then((res: any) => {
          toast(res.action.payload.data.message)
        })
        // failure create category
        .catch((err: any) => {
          this.addCategoryInput.focus()
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
      categoryLoad()
    }

    // error handler
    const onError = (err: Error): void => {
      if (err.message === 'Not_Admin_User') {
        // none admin user
        toast('관리자만 이용 가능합니다 !')
        addCategoryInputChange('')
        logout()
        history.push('/')
      } else if (err.message === 'No_Input') {
        // no input
        toast('추가할 카테고리를 입력해 주세요 !')
        addCategoryInputChange('')
        this.addCategoryInput.focus()
      } else if (err.message === 'Cannot_Category_Name_To_Be_Admin') {
        // category name should not be equal to 'admin'.toLowerCase()
        toast('관리자 페이지 URL 카테고리는 생성 불가능 합니다 !')
        addCategoryInputChange('')
        this.addCategoryInput.focus()
      }
    }

    // Promise
    userAdminCheck({ loginLogined, addCategoryInputValue: addCategoryInputValue.trim() })
      .then(inputValueCheck)
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
        <p className="category-add-p">카테고리 추가</p>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <Input
              name="addCategory"
              placeholder="추가할 카테고리 입력"
              value={this.props.addCategoryInputValue}
              onChange={this.handleChange}
              innerRef={innerRef => (this.addCategoryInput = innerRef)}
            />
            <Button outline={true} color="primary">
              카테고리 추가
            </Button>
          </InputGroup>
        </Form>
      </div>
    )
  }
}

export default withRouter(CategoryAdd)
