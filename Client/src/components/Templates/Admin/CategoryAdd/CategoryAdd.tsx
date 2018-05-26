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
    // 인풋 focus 사용 위해
    public addCategoryInput: HTMLInputElement

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

      // 카테고리 입력값이 없거나 관리자 권한이 아닐 경우
      if (loginLogined !== false && addCategoryInputValue !== '') {
        if (addCategoryInputValue.toLowerCase() !== 'admin') {
          addCategory(addCategoryInputValue)
            .then((res: any) => {
              // 카테고리 추가 성공
              toast(res.value.data.message)
              // 카테고리 Input Select 초기화 & 리로딩
              categoryDone()
              categoryLoad()
            })
            .catch((err: any) => {
              // tslint:disable-next-line:no-console
              console.log(err.response)
              // 사용자의 해킹 시도
              if (err.response.data.type === 'undefinded token' || err.response.data.type === 'invalid token') {
                toast('인증된 사용자가 아닙니다 !')
                // 로그아웃 메소드로 loginLogined false & 세션 스토리지 초기화 & 홈페이지로 이동
                // logout()
                // sessionStorage.clear()
                // history.push('/')
              }
              // 사용자의 시도 실패
              else if (err.response.data.type === 'server error') {
                toast('카테고리가 중복되었습니다 !')
                this.addCategoryInput.focus()
                addCategoryInputChange('')
              } else {
                toast('알 수 없는 에러입니다 !')
              }
            })
        } else {
          toast('관리자 페이지 url 로 카테고리 등록은 불가능 합니다 !')
        }
      } else {
        // 인가된 사용자가 아닐 경우
        if (loginLogined === false) {
          toast('관리자만 접근 / 엑세스 가능합니다 !')
          // 로그아웃 메소드로 loginLogined false & 세션 스토리지 초기화 & 홈페이지로 이동
          logout()
          sessionStorage.clear()
          history.push('/')
        }
        // 아무 글자도 입력하지 않은 경우
        else if (addCategoryInputValue === '') {
          toast('글자를 입력해 주세요 !')
          this.addCategoryInput.focus()
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
)

export default CategoryAdd
