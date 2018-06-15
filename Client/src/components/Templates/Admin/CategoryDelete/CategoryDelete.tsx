import * as React from 'react'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import { CategoryStateInside } from 'store/modules/Category'

import './CategoryDelete.css'

import { Form, InputGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button } from 'reactstrap'
import { toast } from 'react-toastify'

interface Props {
  loginLogined: boolean
  category: CategoryStateInside[]
  categoryLoad: () => void
  deleteCategoryInputValue: string
  deleteCategoryInputChange: (value: string) => void
  deleteCategorySelectValue: string
  deleteCategorySelectChange: (value: string) => void
  deleteCategory: (category: string, doubleCheck: string) => any
  logout: () => void
  categoryDone: () => void
  postDone: () => void
}

interface State {
  deleteCategoryDropdown: boolean
}

interface CategoryDeleteMethodInterface {
  loginLogined: boolean
  deleteCategorySelect: string
  deleteCategoryInput: string
}

interface Target {
  target: HTMLInputElement
}

class CategoryDelete extends React.Component<Props & RouteComponentProps<any>, State> {
  // to use focus()
  public deleteCategoryInput: any

  // dropdown State
  public state = {
    deleteCategoryDropdown: false
  }

  // dropdown toogle
  public handleToogle = (): void => {
    this.setState({
      deleteCategoryDropdown: !this.state.deleteCategoryDropdown
    })
  }

  // change category select value
  public handleSelect = (e: React.MouseEvent<any>): void => {
    this.props.deleteCategorySelectChange(e.currentTarget.innerText)
  }

  // change category input change
  public handleChange = (e: Target): void => {
    this.props.deleteCategoryInputChange(e.target.value)
  }

  // category delete method
  public handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    // stop basic stuff
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
      postDone,

      history
    } = this.props

    // check user is logined or not
    const userAdminCheck = (data: CategoryDeleteMethodInterface): Promise<object> => {
      if (data.loginLogined) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Not_Admin_User'))
    }

    // check the category select button is selected or not
    const checkCategorySelect = (data: CategoryDeleteMethodInterface): Promise<object> => {
      if (data.deleteCategorySelect !== '삭제할 카테고리 선택') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('No_Data_Category_Select'))
    }

    // check the category input value is '' or not
    const nullCheckCategoryInput = (data: CategoryDeleteMethodInterface): Promise<object> => {
      if (data.deleteCategoryInput !== '') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('No_Data_Category_Input'))
    }

    // check same between the category select value and category input value
    const checkValueSame = (data: CategoryDeleteMethodInterface): Promise<object> => {
      if (data.deleteCategorySelect === data.deleteCategoryInput) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Not_Match_Select_And_Input'))
    }

    // delete category
    const respondToServer = async (data: CategoryDeleteMethodInterface): Promise<void> => {
      await deleteCategory(data.deleteCategorySelect, data.deleteCategoryInput)
        // succeed delete category
        .then((res: any) => {
          toast(res.action.payload.data.message)
        })
        // error
        .catch((err: any) => {
          this.deleteCategoryInput.focus()
          toast(err.response.data.message)

          // if the requester has no admin token
          if (err.response.data.type) {
            toast('서비스를 이용하시려면 로그인 해 주세요 !')
            logout()
            history.push('/')
          }
        })
      // this clean method will execute when all task processed
      categoryDone()
      postDone()
      categoryLoad()
    }

    // error handler
    const onError = (err: Error): void => {
      if (err.message === 'Not_Admin_User') {
        // none admin user
        toast('관리자만 이용 가능합니다 !')
        deleteCategorySelectChange('삭제할 카테고리 선택')
        logout()
        history.push('/')
      } else if (err.message === 'No_Data_Category_Select') {
        // no data selected
        toast('삭제할 카테고리를 선택해 주세요 !')
      } else if (err.message === 'No_Data_Category_Input') {
        // no data in deleteCategoryInput
        toast('삭제할 카테고리의 중복확인을 해 주세요 !')
      } else if (err.message === 'Not_Match_Select_And_Input') {
        // not match in select & input
        toast('카테고리 중복확인이 잘못되었습니다 !')
      }
      // this clean method will excute when all task processed
      deleteCategoryInputChange('')
    }

    // Promise
    userAdminCheck({
      loginLogined,
      deleteCategoryInput: deleteCategoryInputValue.trim(),
      deleteCategorySelect: deleteCategorySelectValue.trim()
    })
      .then(checkCategorySelect)
      .then(nullCheckCategoryInput)
      .then(checkValueSame)
      .then(respondToServer)
      .catch(onError)
  }

  public render(): JSX.Element {
    const { deleteCategoryDropdown } = this.state
    const { deleteCategoryInputValue, deleteCategorySelectValue } = this.props

    // show current categories
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
