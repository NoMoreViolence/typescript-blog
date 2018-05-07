import * as React from 'react';
import Basic from 'components/Templates/Basic';

// 액션
import { LoginActions } from 'store/modules/Login';
import { CategoryActions } from 'store/modules/Category';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StoreState } from 'store/modules';

interface Props {
  CategoryActions: typeof CategoryActions;
  LoginActions: typeof LoginActions;
  loginLogined: boolean;
}

class BasicContainer extends React.Component<Props> {
  public render() {
    return (
      <Basic
        loginLogined={this.props.loginLogined}
        getLoginCheck={this.props.LoginActions.getLoginCheck}
        loadCategory={this.props.CategoryActions.getCategory}
      />
    );
  }
}

export default connect(
  ({ Login, Category }: StoreState) => ({
    loginLogined: Login.loginLogined
  }),
  dispatch => ({
    // 디스패치
    LoginActions: bindActionCreators(LoginActions, dispatch),
    CategoryActions: bindActionCreators(CategoryActions, dispatch)
  })
)(BasicContainer);
