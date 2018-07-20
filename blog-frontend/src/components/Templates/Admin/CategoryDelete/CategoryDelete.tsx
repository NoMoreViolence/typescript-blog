import * as React from 'react'

import './CategoryDelete.css'
import { Form, InputGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button } from 'reactstrap'
import { toast } from 'react-toastify'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { CategoryStateInside, DeleteCategoryDeleteAPIInterface } from 'store/modules/Category'

interface Props {
  // Value
  loginLogined: boolean
  category: CategoryStateInside[]
  deleteCategoryPending: boolean
  deleteCategoryInputValue: string
  deleteCategorySelectValue: string
  // Change text
  deleteCategoryInputChange: (value: string) => void
  deleteCategorySelectChange: (value: string) => void
  // Loading category
  categoryLoad: () => void
  // Delete category
  deleteCategory: (value: DeleteCategoryDeleteAPIInterface) => any
  // Ending method
  categoryDone: () => void
  postDone: () => void
  logout: () => void
}

interface State {
  deleteCategoryDropdown: boolean
}

interface CategoryDeleteMethodInterface {
  loginLogined: boolean
  deleteCategorySelect: string
  deleteCategoryInput: string
  deleteCategoryPending: boolean
}

interface Target {
  target: HTMLInputElement
}

class CategoryDelete extends React.Component<Props & RouteComponentProps<any>, State> {
  // To use focus()
  public deleteCategoryInput: any

  // Dropdown State
  public state = {
    deleteCategoryDropdown: false
  }

  // Dropdown toogle
  public handleToogle = (): void => {
    this.setState({
      deleteCategoryDropdown: !this.state.deleteCategoryDropdown
    })
  }

  // Change category select value
  public handleSelect = (e: React.MouseEvent<any>): void => {
    this.props.deleteCategorySelectChange(e.currentTarget.innerText)
  }

  // Change category input change
  public handleChange = (e: Target): void => {
    this.props.deleteCategoryInputChange(e.target.value)
  }

  // Category delete method
  public handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    // Stop basic stuff
    e.preventDefault()

    const {
      loginLogined,
      deleteCategoryInputValue,
      deleteCategoryInputChange,
      deleteCategorySelectValue,
      deleteCategorySelectChange,
      deleteCategoryPending,
      categoryLoad,
      deleteCategory,
      logout,
      categoryDone,
      postDone,
      history
    } = this.props

    // Pending check
    const pendingCheck = (data: CategoryDeleteMethodInterface): Promise<object> => {
      if (data.deleteCategoryPending === true) {
        return Promise.reject(new Error(''))
      }
      return Promise.resolve(data)
    }

    // Check user is logined or not
    const userAdminCheck = (data: CategoryDeleteMethodInterface): Promise<object> => {
      if (data.loginLogined !== true) {
        return Promise.reject(new Error('Not_Admin_User'))
      }
      return Promise.resolve(data)
    }

    // Check the category select button is selected or not
    const categorySelectCheck = (data: CategoryDeleteMethodInterface): Promise<object> => {
      if (data.deleteCategorySelect === '삭제할 카테고리 선택') {
        return Promise.reject(new Error('No_Data_Category_Select'))
      }
      return Promise.resolve(data)
    }

    // Check the category input value is '' or not
    const categoryInputNullCheck = (data: CategoryDeleteMethodInterface): Promise<object> => {
      if (data.deleteCategoryInput === '') {
        return Promise.reject(new Error('No_Data_Category_Input'))
      }
      return Promise.resolve(data)
    }

    // Check same between the category select value and category input value
    const valueSameCheck = (data: CategoryDeleteMethodInterface): Promise<object> => {
      if (data.deleteCategorySelect !== data.deleteCategoryInput) {
        return Promise.reject(new Error('Not_Match_Select_And_Input'))
      }
      return Promise.resolve(data)
    }

    // Delete category
    const respondToServer = async (data: CategoryDeleteMethodInterface): Promise<void> => {
      await deleteCategory({ category: data.deleteCategorySelect, doubleCheck: data.deleteCategoryInput })
        // Succeed delete category
        .then((res: any) => {
          toast(res.action.payload.data.message)
        })
        // Error
        .catch((err: any) => {
          this.deleteCategoryInput.focus()
          toast(err.response.data.message)

          // If the requester has no admin token
          if (err.response.data.type) {
            toast('서비스를 이용하시려면 로그인 해 주세요 !')
            logout()
            history.push('/')
          }
        })
      // This clean method will execute when all task processed
      categoryDone()
      postDone()
      categoryLoad()
    }

    // Error handler
    const onError = (err: Error): void => {
      if (err.message === 'Not_Admin_User') {
        // None admin user
        toast('관리자만 이용 가능합니다 !')
        deleteCategorySelectChange('삭제할 카테고리 선택')
        logout()
        history.push('/')
      } else if (err.message === 'No_Data_Category_Select') {
        // No data selected
        toast('삭제할 카테고리를 선택해 주세요 !')
      } else if (err.message === '/_?_&_#') {
        this.props.deleteCategoryInputChange('')
        this.deleteCategoryInput.focus()
        // Use invalid symbol
        toast('삭제할 카테고리 이름에 특수문자를 넣지 말아 주세요 !')
      } else if (err.message === 'No_Data_Category_Input') {
        this.props.deleteCategoryInputChange('')
        this.deleteCategoryInput.focus()
        // No data in deleteCategoryInput
        toast('삭제할 카테고리 중복확인 칸을 입력해 주세요 !')
      } else if (err.message === 'Not_Match_Select_And_Input') {
        this.props.deleteCategoryInputChange('')
        this.deleteCategoryInput.focus()
        // Not match in select & input
        toast('카테고리 중복확인이 잘못되었습니다 !')
      }
      // This clean method will excute when all task processed
      deleteCategoryInputChange('')
    }

    // Promise
    pendingCheck({
      loginLogined,
      deleteCategoryInput: deleteCategoryInputValue.trim(),
      deleteCategorySelect: deleteCategorySelectValue.trim(),
      deleteCategoryPending
    })
      .then(userAdminCheck)
      .then(categorySelectCheck)
      .then(categoryInputNullCheck)
      .then(valueSameCheck)
      .then(respondToServer)
      .catch(onError)
  }

  // Optimization
  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextProps !== this.props || nextState !== this.state) {
      return true
    }
    return false
  }

  public render(): JSX.Element {
    const { deleteCategoryDropdown } = this.state
    const { deleteCategoryInputValue, deleteCategorySelectValue } = this.props

    // Show current categories
    const CurrentCategoryChangeBar = (data: CategoryStateInside[]): JSX.Element[] => {
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

export default withRouter(CategoryDelete)
