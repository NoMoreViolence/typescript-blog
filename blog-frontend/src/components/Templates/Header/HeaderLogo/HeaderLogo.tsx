import * as React from 'react'

import { AxiosPromise } from 'axios'
import { NavLink } from 'react-router-dom'

import './HeaderLogo.css'

interface Method {
  getCategory: () => AxiosPromise<any>
}

const HeaderLogo: React.SFC<Method> = Props => {
  const handleClick = (): void => {
    Props.getCategory()
  }

  return (
    <h1 className="header-h1">
      <NavLink to="/" onClick={handleClick}>
        NoMoreViolence
      </NavLink>
    </h1>
  )
}

export default HeaderLogo
