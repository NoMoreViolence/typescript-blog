import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { CategoryStateInside } from 'store/modules/Category'
import { Form, InputGroup, Dropdown, DropdownToggle, DropdownItem, DropdownMenu, Input, Button } from 'reactstrap'
import { toast } from 'react-toastify'

import './CategoryChange.css'

interface Props {
  loginLogined: boolean
  category: CategoryStateInside[]

  changeCategoryInputValue: string
  changeCategoryInputChange: (value: string) => void
  changeCategoryCategoryValue: string
  changeCategoryCategoryChange: (value: string) => void

  categoryLoad: () => void
  changeCategory: (oldCategory: string, newCategory: string) => any
  logout: () => void
  categoryDone: () => void
}

interface Target {
  target: HTMLInputElement
}
interface Current {
  currentTarget: { textContent: string }
}

const CategoryChange = withRouter<Props & RouteComponentProps<any>>(
  class CategoryChange extends React.Component<Props & RouteComponentProps<any>> {
    public changeCategoryInput: any

    // 드롭다운 State
    public state = {
      changeCategoryDropdown: false
    }

    // 글자 변경 메소드
    public handleChange = (e: Target) => {
      this.props.changeCategoryInputChange(e.target.value)
    }

    // 드롭다운 토글
    public handleToogle = () => {
      this.setState({
        changeCategoryDropdown: !this.state.changeCategoryDropdown
      })
    }

    // 변경할 카테고리 선택
    public handleSelect = (e: Current) => {
      this.props.changeCategoryCategoryChange(e.currentTarget.textContent)
    }

    // 제출
    public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const {
        loginLogined,
        changeCategoryInputChange,
        changeCategoryCategoryChange,
        changeCategoryCategoryValue,
        changeCategoryInputValue,

        categoryLoad,
        changeCategory,
        logout,
        categoryDone,

        history
      } = this.props

      if (
        changeCategoryInputValue !== '' &&
        changeCategoryCategoryValue !== '변경할 카테고리 선택' &&
        loginLogined !== false
      ) {
        if (changeCategoryInputValue.toLowerCase() !== 'admin') {
          // 카테고리 변경 메소드
          changeCategory(changeCategoryCategoryValue, changeCategoryInputValue)
            // 카테고리 변경 성공
            .then((res: any) => {
              toast(res.value.data.message)
              categoryLoad()
              categoryDone()
            })
            // 카테고리 변경 실패
            .catch((err: any) => {
              // 사용자의 해킹 시도
              if (err.response.data.type === 'undefinded token' || err.response.data.type === 'invalid token') {
                toast('인증된 사용자가 아닙니다 !')
                // 로그아웃 메소드로 loginLogined false & 세션 스토리지 초기화 & 홈페이지로 이동
                logout()
                sessionStorage.clear()
                history.push('/')
              }
              // 사용자의 시도 실패
              else if (err.response.data.type === 'server error') {
                toast(err.response.data.message)
                this.changeCategoryInput.focus()
                changeCategoryInputChange('')
                changeCategoryCategoryChange('변경할 카테고리 선택')
              } else {
                toast(err.response.data.message)
                this.changeCategoryInput.focus()
              }
            })
        } else {
          toast('관리자 url로 카테고리 변경이 불가능 합니다 !')
        }
      } else {
        if (loginLogined === false) {
          toast('관리자만 접근 / 엑세스 가능합니다 !')
          logout()
          history.push('/')
        } else if (changeCategoryInputValue === '') {
          toast('변경할 카테고리의 값을 넣어 주세요 !')
          this.changeCategoryInput.focus()
        } else if (changeCategoryCategoryValue === '변경할 카테고리 선택') {
          toast('변경할 카테고리를 선택해 주세요 !')
        }
      }
    }

    public render() {
      const { changeCategoryDropdown } = this.state
      const { changeCategoryInputValue, changeCategoryCategoryValue } = this.props

      // 데이터 받아서 정렬
      const CurrentCategoryChangeBar = (data: CategoryStateInside[]) => {
        return data.map((object, i) => {
          return (
            <DropdownItem key={i} onClick={this.handleSelect}>
              {object.category}
            </DropdownItem>
          )
        })
      }

      return (
        <div className="category-change-container">
          <p className="category-change-p">카테고리 변경</p>
          <Form onSubmit={this.handleSubmit}>
            <InputGroup>
              <Dropdown isOpen={changeCategoryDropdown} toggle={this.handleToogle}>
                <DropdownToggle outline={true} color="info" caret={true}>
                  {changeCategoryCategoryValue}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={this.handleSelect}>변경할 카테고리 선택</DropdownItem>
                  {CurrentCategoryChangeBar(this.props.category)}
                </DropdownMenu>
              </Dropdown>
              <Input
                name="changeCategoryInputValue"
                placeholder="변경할 카테고리 이름 입력"
                value={changeCategoryInputValue}
                innerRef={innerRef => (this.changeCategoryInput = innerRef)}
                onChange={this.handleChange}
              />
              <Button outline={true} color="info">
                카테고리 변경
              </Button>
            </InputGroup>
          </Form>
        </div>
      )
    }
  }
)

export default CategoryChange
