import * as React from 'react'
import HeaderLogoContainer from 'containers/Header/HeaderLogoContainer'
import HeaderCategoryContainer from 'containers/Header/HeaderCategoryContainer'
import HeaderMessageContainer from 'containers/Header/HeaderMessageToAdminContainer'

const Header = ({}) => {
  const styled = {
    display: 'flex',
    justifyContent: 'space-between'
  }
  return (
    <div className="layout-container">
      <div style={styled}>
        <HeaderLogoContainer />
        <HeaderCategoryContainer />
      </div>

      <HeaderMessageContainer />
    </div>
  )
}
export default Header
