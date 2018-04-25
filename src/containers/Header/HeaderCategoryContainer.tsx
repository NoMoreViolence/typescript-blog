import * as React from 'react';
import HeaderMessage from 'components/Header/HeaderMessage';

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

class HeaderCategoryContainer extends React.Component<Props> {
  public render() {
    return (
      <HeaderMessage
        onPostMessage={this.props.MessageToAdminActions.postMessage}
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
    messageToAdminMessage: MessageToAdmin.messageToAdminMessage,
    messageToAdminPending: MessageToAdmin.messageToAdminPending,
    messageToAdminError: MessageToAdmin.messageToAdminError
  }),
  dispatch => ({
    // 디스패치
    MessageToAdminActions: bindActionCreators(MessageToAdminActions, dispatch)
  })
)(HeaderCategoryContainer);
