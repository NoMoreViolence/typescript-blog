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
    const navLinkStyle: object = {
      color: '#17a2b8'
    }

    // Data sort
    const loadCategory = (data: CategoryStateInside[]): JSX.Element[] => {
      return data.map((object, i) => {
        const url = `/${object.category}`
        return (
          <div key={i}>
            <NavLink to={url} activeStyle={navLinkStyle}>
              <h5>{object.category}</h5>
            </NavLink>
          </div>
        )
      })
    }

    return (
      <div className="header-category-container">
        {loadCategory(this.props.Category)}
        {this.props.Logined === true && (
          <React.Fragment>
            <div>
              <NavLink to="/admin" style={{ color: '#dc3545' }}>
                <h5>관리자 페이지</h5>
              </NavLink>
            </div>
            <div>
              <NavLink to="/" onClick={this.handleSignOut} style={{ color: '#dc3545' }}>
                <h5>로그아웃</h5>
              </NavLink>
            </div>
          </React.Fragment>
        )}
        {this.props.Logined === false && (
          <div>
            <NavLink to="/admin/login" style={{ color: '#dc3545' }}>
              <h5> 관리자 로그인</h5>
            </NavLink>
          </div>
        )}
      </div>
    )
  }
}

export default HeaderCategory
