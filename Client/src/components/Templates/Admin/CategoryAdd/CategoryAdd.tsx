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

interface Target {
  target: HTMLInputElement
}

const CategoryAdd = withRouter<Props & RouteComponentProps<any>>(
  class CategoryAdd extends React.Component<Props & RouteComponentProps<any>> {
    // 입력 체인지
    public handleChange = (e: Target) => {
      this.props.addCategoryInputChange(e.target.value)
    }

    // 카테고리 추가 메소드
    public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

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

      if (loginLogined !== false && addCategoryInputValue !== '') {
        addCategory(addCategoryInputValue)
          .then((res: any) => {
            // 카테고리 추가 성공
            toast(res.value.data.message)
            // 카테고리 Input Select 초기화 & 리로딩
            categoryDone()
            categoryLoad()
          })
          .catch((err: any) => {
            // 사용자의 해킹 시도
            if (err.response.data.type === 'undefinded token' || err.response.data.type === 'invalid token') {
              toast('인증된 사용자가 아닙니다 !')
              logout()
              sessionStorage.clear()
              history.push('/')
            }
            // 사용자의 시도 실패
            else if (err.response.data.type === 'server error') {
              toast('카테고리가 중복되었습니다 !')
              addCategoryInputChange('')
            }
          })
      } else {
        // 인가된 사용자가 아닐 경우
        if (loginLogined === false) {
          toast('관리자만 접근 / 엑세스 가능합니다 !')
          logout()
          sessionStorage.clear()
          history.push('/')
        }
        // 아무 글자도 입력하지 않은 경우
        else if (addCategoryInputValue === '') {
          toast('글자를 입력해 주세요 !')
        }
      }
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
)

export default CategoryAdd
