import * as React from 'react'
import { Form, InputGroup, Input, Button } from 'reactstrap'
import { toast } from 'react-toastify'

interface Props {
  loginLogined: boolean
  categoryLoad: () => void
  addCategorySuccess: () => void
  addCategoryFailure: () => void
}

interface Target {
  target: HTMLInputElement
}

class CategoryAdd extends React.Component<Props> {
  // 카테고리 추가 입력칸
  public state = {
    addCategory: ''
  }

  // 입력 체인지
  public handleChange = (e: Target) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // 카테고리 추가 메소드
  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { addCategory } = this.state

    if (addCategory !== '') {
      fetch('/api/category/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: sessionStorage.getItem('token'),
          category: addCategory
        }),
        mode: 'cors'
      })
        .then(res => res.json())
        .then(res => {
          // 카테고리 생성 성공
          if (res.success === true) {
            toast('" ' + res.category + ' " 카테고리가 추가 되었습니다')
            this.props.addCategorySuccess()
            this.props.categoryLoad()
            this.setState({
              addCategory: ''
            })
          } else {
            // 카테고리 생성 실패
            this.props.addCategoryFailure()
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
        })
    } else {
      toast('추가할 카테고리를 입력해 주세요!')
    }
  }

  public render() {
    return (
      <div className="category-add-container">
        <Form onSubmit={this.handleSubmit}>
          <InputGroup>
            <Input
              name="addCategory"
              placeholder="추가할 카테고리 입력"
              value={this.state.addCategory}
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

export default CategoryAdd
