import * as React from 'react'

import './Header.css'

import HeaderLogoContainer from 'containers/Header/HeaderLogoContainer'
import HeaderCategoryContainer from 'containers/Header/HeaderCategoryContainer'

const Header: React.SFC = () => {
  return (
    <div className="header-size-control-container">
      <div className="header-container">
        <div className="header-menu">
          <div className="header-logo">
            <HeaderLogoContainer />
          </div>
          <div className="header-category">
            <HeaderCategoryContainer />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header
