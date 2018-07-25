import * as React from 'react'

import './HeaderLogo.css'

import { NavLink } from 'react-router-dom'

interface Props {
  getCategory: () => void
}

class HeaderLogo extends React.Component<Props> {
  public handleClick = (): void => {
    this.props.getCategory()
  }

  public render(): JSX.Element {
    return (
      <h1 className="header-h1">
        <NavLink to="/" onClick={this.handleClick}>
          NoMoreViolence
        </NavLink>
      </h1>
    )
  }
}

export default HeaderLogo
