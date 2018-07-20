import * as React from 'react'

import './CategoryChange.css'
import { Form, InputGroup, Dropdown, DropdownToggle, DropdownItem, DropdownMenu, Input, Button } from 'reactstrap'
import { toast } from 'react-toastify'

import RegExp from 'lib/RegExp'
import { CategoryStateInside, PatchCategoryChangeAPIInterface } from 'store/modules/Category'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface Props {
  loginLogined: boolean
  category: CategoryStateInside[]
  pending: boolean

  changeCategoryInputValue: string
  changeCategoryInputChange: (value: string) => void
  changeCategorySelectValue: string
  changeCategorySelectChange: (value: string) => void

  categoryLoad: () => void
  changeCategory: (value: PatchCategoryChangeAPIInterface) => any
  logout: () => void
  categoryDone: () => void
  postDone: () => void
}
interface State {
  changeCategoryDropdown: boolean
}

interface CategoryChangeMethodInterface {
  loginLogined: boolean
  changeCategorySelect: string
  changeCategoryInput: string
  pending: boolean
}

interface Target {
  target: HTMLInputElement
}

const CategoryChange = withRouter<Props & RouteComponentProps<any>>(
  class CategoryChange extends React.Component<Props & RouteComponentProps<any>, State> {
    // to use focus()
    public changeCategoryInput: any

    // dropdown State
    public state = {
      changeCategoryDropdown: false
    }

    // dropdown toogle
    public handleToogle = (): void => {
      this.setState({
        changeCategoryDropdown: !this.state.changeCategoryDropdown
      })
    }

    // change changeCategorys input value
    public handleChange = (e: Target): void => {
      this.props.changeCategoryInputChange(e.target.value)
    }

    // change changeCategorySelects value
    public handleSelect = (e: React.MouseEvent<any>): void => {
      this.props.changeCategorySelectChange(e.currentTarget.innerText)
    }

    // category change method
    public handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
      // stop basic stuff
      e.preventDefault()

      // Props
      const {
        loginLogined,
        changeCategoryInputChange,
        changeCategoryInputValue,
        changeCategorySelectChange,
        changeCategorySelectValue,
        categoryLoad,
        changeCategory,
        logout,
        categoryDone,
        postDone,
        history,
        pending
      } = this.props

      // Check the request is still in process
      const pendingCheck = (data: CategoryChangeMethodInterface): Promise<object> => {
        if (data.pending === true) {
          return Promise.reject(new Error('Still_Loading'))
        }

        return Promise.resolve(data)
      }

      // check user is logined or not
      const userAdminCheck = (data: CategoryChangeMethodInterface): Promise<object> => {
        if (data.loginLogined !== true) {
          return Promise.reject(new Error('Not_Admin_User'))
        }
        return Promise.resolve(data)
      }

      // check the category select button is selected or not
      const categorySelectCheck = (data: CategoryChangeMethodInterface): Promise<object> => {
        if (data.changeCategorySelect === '변경할 카테고리 선택') {
          return Promise.reject(new Error('No_Data_Category_Select'))
        }
        return Promise.resolve(data)
      }

      const categoryInputSymbolsCheck = (data: CategoryChangeMethodInterface): Promise<object> => {
        // the regexp value
        const regExpTest = RegExp.test(data.changeCategoryInput)

        if (regExpTest === true) {
          return Promise.reject(new Error('/_?_&_#'))
        }

        return Promise.resolve(data)
      }

      // check the category input value is '' or not
      const categoryInputNullCheck = (data: CategoryChangeMethodInterface): Promise<object> => {
        if (data.changeCategoryInput === '') {
          return Promise.reject(new Error('No_Data_Category_Input'))
        }
        return Promise.resolve(data)
      }

      // check the category input value.toLowerCase() is 'admin' or not
      const categoryInputAdminCheck = (data: CategoryChangeMethodInterface): Promise<object> => {
        if (data.changeCategoryInput.toLowerCase() === 'admin') {
          return Promise.reject(new Error('Can_Not_Be_A_Admin'))
        }
        return Promise.resolve(data)
      }

      // check same between the category select value and category input value
      const valueSameCheck = (data: CategoryChangeMethodInterface): Promise<object> => {
        if (data.changeCategorySelect === data.changeCategoryInput) {
          return Promise.reject(new Error('Can_Not_Match_Select_And_Input'))
        }
        return Promise.resolve(data)
      }

      // change category
      const requestToServer = async (data: CategoryChangeMethodInterface): Promise<void> => {
        await changeCategory({ oldCategory: data.changeCategorySelect, newCategory: data.changeCategoryInput })
          // succeed change category
          .then((res: any) => {
            toast(res.action.payload.data.message)
          })
          // failure change category
          .catch((err: any) => {
            this.changeCategoryInput.focus()
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

      // error handle only input error
      const onError = (err: Error): void => {
        if (err.message === 'Not_Admin_User') {
          // none admin user
          toast('관리자만 이용 가능합니다 !')
          changeCategorySelectChange('변경할 카테고리 선택')
          logout()
          history.push('/')
        } else if (err.message === 'No_Data_Category_Select') {
          // none selected category select
          toast('변경할 카테고리를 선택해 주세요 !')
        } else if (err.message === '/_?_&_#') {
          this.props.changeCategoryInputChange('')
          this.changeCategoryInput.focus()
          // Use invalid symbol
          toast('변경할 카테고리 이름에 특수문자를 넣지 말아 주세요 !')
        } else if (err.message === 'No_Data_Category_Input') {
          this.props.changeCategoryInputChange('')
          this.changeCategoryInput.focus()
          // none category input data
          toast('변경하고 싶은 카테고리 이름을 입력해 주세요 !')
        } else if (err.message === 'Can_Not_Be_A_Admin') {
          this.props.changeCategoryInputChange('')
          this.changeCategoryInput.focus()
          // category input can't be a 'admin'
          toast("변경될 카테고리 이름은 'admin'이 될 수 없습니다")
        } else if (err.message === 'Can_Not_Match_Select_And_Input') {
          // category select === category input => don't need to change
          toast('같은 값으로의 변경은 불필요 합니다 !')
        }
        // this clean method will excute when all task processed
        changeCategoryInputChange('')
      }

      // Promise
      pendingCheck({
        loginLogined,
        changeCategorySelect: changeCategorySelectValue.trim(),
        changeCategoryInput: changeCategoryInputValue.trim(),
        pending
      })
        .then(userAdminCheck)
        .then(categorySelectCheck)
        .then(categoryInputSymbolsCheck)
        .then(categoryInputNullCheck)
        .then(categoryInputAdminCheck)
        .then(valueSameCheck)
        .then(requestToServer)
        .catch(onError)
    }

    // Optimization rendering problem
    public shouldComponentUpdate(nextProps: Props, nextState: State) {
      if (nextProps !== this.props || nextState !== this.state) {
        return true
      }
      return false
    }

    public render(): JSX.Element {
      const { changeCategoryDropdown } = this.state
      const { changeCategoryInputValue, changeCategorySelectValue } = this.props

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
