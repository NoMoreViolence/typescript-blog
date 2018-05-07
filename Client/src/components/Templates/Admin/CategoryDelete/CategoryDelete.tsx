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
  deleteCategoryPending: () => void
  deleteCategorySuccess: () => void
  deleteCategoryFailure: () => void
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
        deleteCategorySelectValue,
        deleteCategoryPending,
        deleteCategorySuccess,
        deleteCategoryFailure,
        categoryLoad,
        categoryDone
      } = this.props

      deleteCategoryPending()

      if (
        deleteCategoryInputValue !== '' &&
        deleteCategorySelectValue !== '변경할 카테고리 선택' &&
        loginLogined === true &&
        sessionStorage.getItem('token') !== null
      ) {
        fetch('/api/category/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: sessionStorage.getItem('token'),
            category: deleteCategorySelectValue,
            categoryDoubleCheck: deleteCategoryInputValue
          }),
          mode: 'cors'
        })
          .then(res => res.json())
          .then(res => {
            // 카테고리 생성 성공
            if (res.success === true) {
              toast(res.message)
              deleteCategorySuccess()
              categoryDone()
              categoryLoad()
            } else {
              // 카테고리 생성 실패
              deleteCategoryFailure()
              categoryLoad()
              toast(res.message)
            }
            // tslint:disable-next-line:no-console
            console.log(res.message)
          })
          .catch(error => {
            // tslint:disable-next-line:no-console
            console.log('서버 오류입니다')
            // tslint:disable-next-line:no-console
            console.log(error.message)
            deleteCategoryFailure()
            categoryLoad()
          })
      } else {
        deleteCategoryFailure()
        if (loginLogined === false) {
          toast('올바르지 않은 사용자의 접근입니다')
          this.props.history.push('/')
        } else {
          toast('올바른 형태로 입력해 주세요')
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
