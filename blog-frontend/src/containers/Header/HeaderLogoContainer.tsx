import * as React from 'react'
import HeaderLogo from 'components/Templates/Header/HeaderLogo'

import { CategoryActions } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

interface Method {
  getCategory: () => any
}

const HeaderContainer: React.SFC<Method> = Props => <HeaderLogo getCategory={Props.getCategory} />

export default connect<void, Method, void>(
  () => ({}),
  dispatch => ({
    getCategory: bindActionCreators(CategoryActions.getCategory, dispatch)
  })
)(HeaderContainer)
