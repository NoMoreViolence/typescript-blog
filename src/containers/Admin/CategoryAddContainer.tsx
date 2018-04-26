/*
import * as React from 'react';
// 헤더 카테고리
import CategoryAdd from 'components/Templates/Admin/CategoryAdd';

import { LoginActions } from 'store/modules/Login';
import { CategoryStateInside } from 'store/modules/Category';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StoreState } from 'store/modules';

class CategoryAddContainer extends React.Component {
  public render() {
    return <div />;
  }
}

export default connect(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    Category: Category.categoryCategory
  }),
  dispatch => ({
    // 디스패치
    loginActions: bindActionCreators(LoginActions, dispatch)
  })
)(CategoryAddContainer);
*/
