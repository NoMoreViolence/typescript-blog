import * as React from 'react';
import HeaderSearch from 'components/Header/HeaderSearch';

// 운영자에게 보내는 메시지
import { MessageToAdminActions } from 'store/modules/MessageToAdmin';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StoreState } from 'store/modules';

type Props = {
  // 메시지
  messageToAdminMessage: string;
  messageToAdminPending: boolean;
  messageToAdminError: boolean;
  MessageToAdminActions: typeof MessageToAdminActions;
};

class HeaderContainer extends React.Component<Props> {
  public render() {
    return (
      <HeaderSearch
        onChange={this.props.MessageToAdminActions.handleChange}
        messageToAdminMessage={this.props.messageToAdminMessage}
        messageToAdminPending={this.props.messageToAdminPending}
        messageToAdminError={this.props.messageToAdminError}
      />
    );
  }
}

export default connect(
  ({ Category, MessageToAdmin }: StoreState) => ({
    // 운영자 메시지
    messageToAdminMessage: MessageToAdmin.MessageToAdminMessage,
    messageToAdminPending: MessageToAdmin.MessageToAdminPending,
    messageToAdminError: MessageToAdmin.MessageToAdminError
  }),
  dispatch => ({
    // 디스패치
    MessageToAdminActions: bindActionCreators(MessageToAdminActions, dispatch)
  })
)(HeaderContainer);
