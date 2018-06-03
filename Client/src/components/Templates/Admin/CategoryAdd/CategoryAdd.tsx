import * as React from 'react'
import { Form, InputGroup, Input, Button } from 'reactstrap'
import { toast } from 'react-toastify'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import './CategoryAdd.css'

interface Props {
  loginLogined: boolean
  categoryLoad: () => any
  addCategoryInputValue: string
  addCategoryInputChange: (value: string) => void
  addCategory: (value: string) => any
  logout: () => void
  categoryDone: () => void
}

interface PostAddMethodInterface {
  loginLogined: boolean
  addCategoryInputValue: string
}

interface Target {
  target: HTMLInputElement
}

class CategoryAdd extends React.Component<Props & RouteComponentProps<any>> {
  // to use focus()
  public addCategoryInput: any

  // change category input value
  public handleChange = (e: Target) => {
    this.props.addCategoryInputChange(e.target.value)
  }

  // category add method
  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // stop basic stuff
    e.preventDefault()
    // the value that can find out where error started
    let count = 0

    const {
      loginLogined,
      addCategoryInputValue,
      addCategoryInputChange,
      addCategory,
      categoryLoad,
      logout,
      categoryDone,
      history
    } = this.props

    // check user is logined or not
    const userAdminCheck = (data: PostAddMethodInterface) => {
      count++
      // compare logined or not
      if (data.loginLogined) {
        return new Promise(function(resolve, reject) {
          resolve(data)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('인증된 사용자가 아닙니다 !'))
      })
    }

    // check the input value is '' or not
    const inputValueCheck = (data: PostAddMethodInterface) => {
      count++
      // compare the value exist or not
      if (data.addCategoryInputValue.trim() !== '') {
        return new Promise(function(resolve, reject) {
          resolve(data)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error('추가할 카테고리를 입력해 주세요 !'))
      })
    }

    // check the input value.toUpperCase() is 'admin' or not
    const inputValueAdminCheck = (data: PostAddMethodInterface) => {
      count++
      // compare the value is 'admin' or not
      if (data.addCategoryInputValue.toLowerCase().trim() !== 'admin') {
        return new Promise(function(resolve, reject) {
          resolve(data)
        })
      }
      return new Promise(function(resolve, reject) {
        reject(new Error(`'${data}' 이름의 카테고리는 생성 불가능 합니다 !`))
      })
    }

    // create category
    const requestToServer = (data: PostAddMethodInterface) => {
      // request to server for create category
      addCategory(data.addCategoryInputValue)
        // succeed create category
        .then((res: { value: any; action: any }) => {
          toast(res.action.payload.data.message)
          categoryDone()
          categoryLoad()
        })
        // failure create category
        .catch((err: { response: any }) => {
          addCategoryInputChange('')
          this.addCategoryInput.focus()
          toast(err.response.data.message)

          if (err.response.data.type) {
            toast('서비스를 이용하시려면 다시 로그인 해 주세요 !')
            logout()
            history.push('/')
          }
        })
    }

    // error handler
    const onError = (err: Error) => {
      switch (count) {
        // not admin
        case 1:
          toast('관리자만 이용 가능합니다 !')
          addCategoryInputChange('')
          logout()
          history.push('/')
          count = 0
          break
        // no input value
        case 2:
          toast('추가할 카테고리를 입력해 주세요 !')
          addCategoryInputChange('')
          this.addCategoryInput.focus()
          count = 0
          break
        // input value.upUpperCase is 'admin'
        case 3:
          toast(`관리자 url의 카테고리는 생성될 수 없습니다 !`)
          addCategoryInputChange('')
          this.addCategoryInput.focus()
          count = 0
          break
        default:
          break
      }
    }

    // Promise
    userAdminCheck({ loginLogined, addCategoryInputValue })
      .then(inputValueCheck)
      .then(inputValueAdminCheck)
      .then(requestToServer)
      .catch(onError)
  }

  public render() {
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
