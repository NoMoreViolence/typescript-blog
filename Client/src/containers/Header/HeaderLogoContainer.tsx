import * as React from 'react'
import HeaderLogo from 'components/Templates/Header/HeaderLogo'

import { CategoryActions } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

type Props = {
  CategoryActions: typeof CategoryActions
}

const HeaderContainer: React.SFC<Props> = Props => <HeaderLogo getCategory={Props.CategoryActions.getCategory} />

export default connect(
  ({  }: StoreState) => ({}),
  dispatch => ({
    CategoryActions: bindActionCreators(CategoryActions, dispatch)
  })
)(HeaderContainer)
