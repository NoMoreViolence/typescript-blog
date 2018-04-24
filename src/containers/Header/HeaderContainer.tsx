import * as React from 'react';
import Header from 'components/Header/Header';
// 카테고리
import { CategoryActions, CategoryStateInside } from 'store/modules/Category';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StoreState } from 'store/modules';

type Props = {
  // 카테고리
  categoryCategory: [CategoryStateInside];
  categoryPending: boolean;
  categoryError: boolean;
  CategoryActions: typeof CategoryActions;
};

class HeaderContainer extends React.Component<Props> {
  public render() {
    return (
      <Header
        onLoadCategory={this.props.CategoryActions.getCategory}
        categoryCategory={this.props.categoryCategory}
        categoryPending={this.props.categoryPending}
        categoryError={this.props.categoryError}
      />
    );
  }
}

export default connect(
  ({ Category, MessageToAdmin }: StoreState) => ({
    // 카테고리
    categoryCategory: Category.categoryCategory,
    categoryPending: Category.categoryPending,
    categoryError: Category.categoryError
  }),
  dispatch => ({
    // 디스패치
    CategoryActions: bindActionCreators(CategoryActions, dispatch)
  })
)(HeaderContainer);
