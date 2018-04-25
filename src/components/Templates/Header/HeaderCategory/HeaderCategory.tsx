import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { CategoryStateInside } from 'store/modules/Category';
import { toast } from 'react-toastify';

interface Props {
  Category: [CategoryStateInside];
  Logout: () => void;
  Logined: boolean;
}

class HeaderCategory extends React.Component<Props> {
  public handleSignOut = () => {
    this.props.Logout();
    toast('로그아웃 되셨습니다');
  };

  public render() {
    // 데이터 받아서 정렬
    const loadCategory = (data: [CategoryStateInside]) => {
      return data.map((object, i) => {
        const url = `/category/${object.category}`;
        return (
          <BreadcrumbItem key={i}>
            <NavLink to={url}>{object.category}</NavLink>
          </BreadcrumbItem>
        );
      });
    };

    return (
      <Breadcrumb>
        <BreadcrumbItem />
        {loadCategory(this.props.Category)}
        {this.props.Logined === true && (
          <React.Fragment>
            <BreadcrumbItem>
              <NavLink to="/admin/post">관리자 페이지</NavLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <NavLink to="/" onClick={this.handleSignOut}>
                Sign out
              </NavLink>
            </BreadcrumbItem>
          </React.Fragment>
        )}
        {this.props.Logined === false && (
          <BreadcrumbItem>
            <NavLink to="/admin/login">관리자 로그인</NavLink>
          </BreadcrumbItem>
        )}
        <BreadcrumbItem active={true}>Category</BreadcrumbItem>
      </Breadcrumb>
    );
  }
}

export default HeaderCategory;
