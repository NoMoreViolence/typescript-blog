import * as React from 'react'

import './HeaderCategory.css'
import { toast } from 'react-toastify'

import { CategoryStateInside } from 'store/modules/Category'

import { NavLink } from 'react-router-dom'

interface Props {
  Category: CategoryStateInside[]
  Logout: () => void
  Logined: boolean
}

class HeaderCategory extends React.Component<Props> {
  public handleSignOut = (): void => {
    this.props.Logout()
    sessionStorage.clear()
    toast('로그아웃 되셨습니다', { type: 'success' })
  }

  public render(): JSX.Element {
    const navLinkStyleDefalut: object = {
      color: '#17a2b8'
    }

    const navLinkStyleAdmin: object = {
      color: 'black'
    }

    // Data sort
    const loadCategory = (data: CategoryStateInside[]): JSX.Element[] => {
      return data.map((object, i) => {
        const url = `/${object.category}`
        return (
          <h3 key={i}>
            <NavLink to={url} className="default-a" activeStyle={navLinkStyleDefalut}>
              {object.category}
            </NavLink>
          </h3>
        )
      })
    }

    return (
      <div className="header-category-container">
        {loadCategory(this.props.Category)}
        {this.props.Logined === true && (
          <React.Fragment>
            <h3>
              <NavLink to="/admin" className="admin-a" activeStyle={navLinkStyleAdmin}>
                관리자 페이지
              </NavLink>
            </h3>
            <h3>
              <NavLink to="/" onClick={this.handleSignOut} className="admin-a">
                로그아웃
              </NavLink>
            </h3>
          </React.Fragment>
        )}
        {this.props.Logined === false && (
          <h3>
            <NavLink to="/admin/login" className="admin-a" activeStyle={navLinkStyleAdmin}>
              관리자 로그인
            </NavLink>
          </h3>
        )}
      </div>
    )
  }
}

export default HeaderCategory
