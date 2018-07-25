import * as React from 'react'

import HeaderCategory from 'components/Templates/Header/HeaderCategory'

import { LoginActions } from 'store/modules/Login'
import { CategoryStateInside } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'
import { withRouter, RouteComponentProps } from 'react-router-dom'

interface Props {
  Category: CategoryStateInside[]
  loginActions: typeof LoginActions
  loginLogined: boolean
}

class HeaderCategoryContainer extends React.Component<Props & RouteComponentProps<any>> {
  public render(): JSX.Element {
    return (
      <HeaderCategory
        Category={this.props.Category}
        Logout={this.props.loginActions.logout}
        Logined={this.props.loginLogined}
      />
    )
  }
}

export default withRouter(
  connect(
    ({ Category, Login }: StoreState) => ({
      loginLogined: Login.loginLogined,
      Category: Category.categoryCategory
    }),
    dispatch => ({
      loginActions: bindActionCreators(LoginActions, dispatch)
    })
  )(HeaderCategoryContainer)
)
