import * as React from 'react'
import { NavLink } from 'react-router-dom'

import './HeaderLogo.css'

interface Props {
  getCategory: () => void
}

class HeaderLogo extends React.Component<Props> {
  public handleClick = () => {
    this.props.getCategory()
  }

  public render() {
    return (
      <h1 className="header-logo-h1">
        <NavLink to="/" onClick={this.handleClick}>
          NoMoreViolence
        </NavLink>
      </h1>
    )
  }
}

export default HeaderLogo
