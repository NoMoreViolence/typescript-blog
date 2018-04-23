import * as React from 'react';
import Header from 'components/Header/Header';
// 카테고리
import { CategoryActions, CategoryStateInside } from 'store/modules/Category';
/*
// 운영자에게 보내는 메시지
import { MessageToAdminActions } from 'store/modules/MessageToAdmin';
*/
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StoreState } from 'store/modules';

type Props = {
  // 카테고리
  categoryCategory: [CategoryStateInside];
  categoryPending: boolean;
  categoryError: boolean;
  CategoryActions: typeof CategoryActions;
  /* // 메시지
  messageToAdminMessage: string;
  messageToAdminPending: boolean;
  messageToAdminError: boolean;
  MessageToAdminActions: typeof MessageToAdminActions;
  */
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
    /*
    // 운영자 메시지
    messageToAdminMessage: MessageToAdmin.MessageToAdminMessage,
    messageToAdminPending: MessageToAdmin.MessageToAdminPending,
    messageToAdminError: MessageToAdmin.MessageToAdminError
    */
  }),
  dispatch => ({
    // 디스패치
    CategoryActions: bindActionCreators(CategoryActions, dispatch)
    /* MessageToAdminActions: bindActionCreators(MessageToAdminActions, dispatch) */
  })
)(HeaderContainer);
