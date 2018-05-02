import * as React from 'react'
import { Form, InputGroup, Input, Button } from 'reactstrap'
import { toast } from 'react-toastify'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import './CategoryAdd.css'

interface Props {
  loginLogined: boolean
  categoryLoad: () => void
  addCategoryInputValue: string
  addCategoryInputChange: (value: string) => void
  addCategoryPending: () => void
  addCategorySuccess: () => void
  addCategoryFailure: () => void
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
        categoryLoad,
        addCategoryInputValue,
        loginLogined,
        addCategoryPending,
        addCategorySuccess,
        addCategoryFailure
      } = this.props

      addCategoryPending()

      if (addCategoryInputValue !== '' && loginLogined !== false) {
        fetch('/api/category/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: sessionStorage.getItem('token'),
            category: addCategoryInputValue
          }),
          mode: 'cors'
        })
          .then(res => res.json())
          .then(res => {
            // 카테고리 생성 성공
            if (res.success === true) {
              toast('" ' + res.category + ' " 카테고리가 추가 되었습니다')
              addCategorySuccess()
              categoryLoad()
            } else {
              // 카테고리 생성 실패
              addCategoryFailure()
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
            addCategoryFailure()
          })
      } else {
        if (loginLogined === false) {
          toast('허용되지 않은 사용자 입니다.')
          this.props.history.push('/')
        } else {
          toast('추가할 카테고리를 입력해 주세요!')
        }
        addCategoryFailure()
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
