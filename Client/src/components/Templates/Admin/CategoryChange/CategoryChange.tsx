import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { CategoryStateInside } from 'store/modules/Category'
import {
  Form,
  InputGroup,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Input,
  Button
} from 'reactstrap'
import { toast } from 'react-toastify'

import './CategoryChange.css'

interface Props {
  loginLogined: boolean
  category: [CategoryStateInside]
  changeCategoryInputValue: string
  changeCategoryInputChange: (value: string) => void
  changeCategorySelectValue: string
  changeCategorySelectChange: (value: string) => void
  categoryLoad: () => void
  changeCategoryPending: () => void
  changeCategorySuccess: () => void
  changeCategoryFailure: () => void
  categoryDone: () => void
}

interface Target {
  target: HTMLInputElement
}
interface Dropdown {
  currentTarget: { textContent: string }
}

const CategoryChange = withRouter<Props & RouteComponentProps<any>>(
  class CategoryChange extends React.Component<Props & RouteComponentProps<any>> {
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
    public handleSelect = (e: Dropdown) => {
      this.props.changeCategorySelectChange(e.currentTarget.textContent)
    }

    // 제출
    public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const {
        loginLogined,
        changeCategoryInputValue,
        changeCategorySelectValue,
        changeCategoryPending,
        changeCategorySuccess,
        changeCategoryFailure,
        categoryLoad,
        categoryDone
      } = this.props

      changeCategoryPending()

      if (
        changeCategoryInputValue !== '' &&
        changeCategorySelectValue !== '변경할 카테고리 선택' &&
        loginLogined === true &&
        sessionStorage.getItem('token') !== null
      ) {
        fetch('/api/category/change', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: sessionStorage.getItem('token'),
            category: changeCategorySelectValue,
            changeCategory: changeCategoryInputValue
          }),
          mode: 'cors'
        })
          .then(res => res.json())
          .then(res => {
            // 카테고리 생성 성공
            if (res.success === true) {
              toast(res.message)
              changeCategorySuccess()
              categoryDone()
              categoryLoad()
            } else {
              // 카테고리 생성 실패
              changeCategoryFailure()
              categoryLoad()
              toast('서버 오류입니다')
            }
            // tslint:disable-next-line:no-console
            console.log(res.message)
          })
          .catch(error => {
            // tslint:disable-next-line:no-console
            console.log('서버 오류입니다')
            // tslint:disable-next-line:no-console
            console.log(error.message)
            changeCategoryFailure()
            categoryLoad()
          })
      } else {
        changeCategoryFailure()
        if (loginLogined === false) {
          toast('올바르지 않은 사용자의 접근입니다')
          this.props.history.push('/')
        } else {
          toast('올바른 형태로 입력해 주세요')
        }
      }
    }

    public render() {
      const { changeCategoryDropdown } = this.state
      const { changeCategoryInputValue, changeCategorySelectValue } = this.props

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
        <div className="category-change-container">
          <p className="category-change-p">카테고리 변경</p>
          <Form onSubmit={this.handleSubmit}>
            <InputGroup>
              <Dropdown isOpen={changeCategoryDropdown} toggle={this.handleToogle}>
                <DropdownToggle outline={true} color="info" caret={true}>
                  {changeCategorySelectValue}
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
