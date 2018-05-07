import * as React from 'react'
import HeaderLogo from 'components/Templates/Header/HeaderLogo'

// 운영자에게 보내는 메시지
import { CategoryActions } from 'store/modules/Category'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

type Props = {
  CategoryActions: typeof CategoryActions
}

const HeaderContainer = (Props: Props) => {
  return <HeaderLogo getCategory={Props.CategoryActions.getCategory} />
}

export default connect(
  ({  }: StoreState) => ({}),
  dispatch => ({
    // 디스패치
    CategoryActions: bindActionCreators(CategoryActions, dispatch)
  })
)(HeaderContainer)
