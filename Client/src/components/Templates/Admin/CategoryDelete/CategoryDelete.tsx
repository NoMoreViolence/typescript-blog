import * as React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { CategoryStateInside } from 'store/modules/Category'
import {
  Form,
  InputGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button
} from 'reactstrap'
import { toast } from 'react-toastify'

import './CategoryDelete.css'

interface Props {
  loginLogined: boolean
  category: [CategoryStateInside]
  categoryLoad: () => void
  deleteCategoryInputValue: string
  deleteCategoryInputChange: (value: string) => void
  deleteCategorySelectValue: string
  deleteCategorySelectChange: (value: string) => void
  deleteCategory: (value: string) => any
  logout: () => void
  categoryDone: () => void
}

interface Target {
  target: HTMLInputElement
}

interface Dropdown {
  currentTarget: { textContent: string }
}

const CategoryDelete = withRouter<Props & RouteComponentProps<any>>(
  class CategoryDelete extends React.Component<Props & RouteComponentProps<any>> {
    public deleteCategoryInput: HTMLInputElement

    // 드롭다운 State
    public state = {
      deleteCategoryDropdown: false
    }

    // 삭제할 카테고리 Input Change
    public handleChange = (e: Target) => {
      this.props.deleteCategoryInputChange(e.target.value)
    }

    // 드롭다운 토글
    public handleToogle = () => {
      this.setState({
        deleteCategoryDropdown: !this.state.deleteCategoryDropdown
      })
    }

    // 삭제할 카테고리 선택
    public handleSelect = (e: Dropdown) => {
      this.props.deleteCategorySelectChange(e.currentTarget.textContent)
    }

    // 카테고리 삭제 요청
    public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const {
        loginLogined,
        deleteCategoryInputValue,
        deleteCategoryInputChange,
        deleteCategorySelectValue,
        deleteCategorySelectChange,

        categoryLoad,
        deleteCategory,
        logout,
        categoryDone,

        history
      } = this.props

      if (
        deleteCategoryInputValue !== '' &&
        deleteCategorySelectValue !== '삭제할 카테고리 선택' &&
        loginLogined !== false
      ) {
        // 카테고리 삭제 메소드
        if (deleteCategoryInputValue === deleteCategorySelectValue) {
          deleteCategory(deleteCategorySelectValue)
            .then((res: any) => {
              toast(res.value.data.message)
              categoryLoad()
              categoryDone()
            })
            .catch((err: any) => {
              // 사용자의 해킹 시도
              if (
                err.response.data.type === 'undefinded token' ||
                err.response.data.type === 'invalid token'
              ) {
                toast('인증된 사용자가 아닙니다 !')
                // 로그아웃 메소드로 loginLogined false & 세션 스토리지 초기화 & 홈페이지로 이동
                logout()
                sessionStorage.clear()
                history.push('/')
              }
              // 사용자의 시도 실패
              else if (err.response.data.type === 'server error') {
                toast(err.response.data.message)
                this.deleteCategoryInput.focus()
                deleteCategoryInputChange('')
                deleteCategorySelectChange('변경할 카테고리 선택')
              }
            })
        } else {
          this.deleteCategoryInput.focus()
          toast('삭제할 카테고리를 올바르게 입력해 주세요')
        }
      } else {
        if (loginLogined === false) {
          toast('관리자만 접근 / 엑세스 가능합니다 !')
          logout()
          history.push('/')
        } else if (deleteCategoryInputValue === '') {
          toast('삭제할 카테고리의 값을 넣어 주세요 !')
          this.deleteCategoryInput.focus()
        } else if (deleteCategorySelectValue === '삭제할 카테고리 선택') {
          toast('삭제할 카테고리를 선택해 주세요 !')
        }
      }
    }

    public render() {
      const { deleteCategoryDropdown } = this.state
      const { deleteCategoryInputValue, deleteCategorySelectValue } = this.props

      // 데이터 받아서 정렬
      const CurrentCategoryChangeBar = (data: [CategoryStateInside]) => {
        return data.map((object, i) => {
          return (
            <DropdownItem key={i} onClick={this.handleSelect}>
              {object.category}
            </DropdownItem>
          )
        })
      }

      return (
        <div className="category-delete-container">
          <p className="category-delete-p">카테고리 삭제</p>
          <Form onSubmit={this.handleSubmit}>
            <InputGroup>
              <Dropdown isOpen={deleteCategoryDropdown} toggle={this.handleToogle}>
                <DropdownToggle outline={true} color="danger" caret={true}>
                  {deleteCategorySelectValue}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.handleSelect}>변경할 카테고리 선택</DropdownItem>
                  {CurrentCategoryChangeBar(this.props.category)}
                </DropdownMenu>
              </Dropdown>
              <Input
                name="deleteCategoryInput"
                placeholder="삭제할 카테고리 이름 입력"
                value={deleteCategoryInputValue}
                innerRef={innerRef => (this.deleteCategoryInput = innerRef)}
                onChange={this.handleChange}
              />
              <Button outline={true} color="danger">
                카테고리 삭제
              </Button>
            </InputGroup>
          </Form>
        </div>
      )
    }
  }
)

export default CategoryDelete
