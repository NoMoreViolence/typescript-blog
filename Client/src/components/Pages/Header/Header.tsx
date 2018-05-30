import * as React from 'react'

import './Header.css'

import HeaderLogoContainer from 'containers/Header/HeaderLogoContainer'
import HeaderCategoryContainer from 'containers/Header/HeaderCategoryContainer'

const Header: React.SFC = () => {
  return (
    <div className="layout-container">
      <div className="header-menu">
        <HeaderLogoContainer />
        <HeaderCategoryContainer />
      </div>
    </div>
  )
}
export default Header
