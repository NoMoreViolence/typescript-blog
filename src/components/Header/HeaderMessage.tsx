import * as React from 'react';
import { Row, Col, InputGroup, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';

interface Props {
  onPostMessage: Function;
  onChange: Function;
  messageToAdminMessage: string;
  messageToAdminPending: boolean;
  messageToAdminError: boolean;
}

interface InputTarget {
  target: HTMLInputElement;
}

class HeaderMessage extends React.Component<Props> {
  // 글자 체인지
  public onChange = (e: InputTarget) => {
    this.props.onChange(e.target.value);
  };

  // 메시지 보내기
  public onSubmit = () => {
    const { messageToAdminMessage } = this.props;
    if (messageToAdminMessage !== '') {
      this.props.onPostMessage(messageToAdminMessage);
    } else {
      toast('메시지를 입력해 주세요');
    }
  };
  public render() {
    return (
      <Row>
        <Col>
          <InputGroup>
            <Input
              type="text"
              placeholder="사이트 운영자에게 하고 싶은 말을 적어주세요 ! "
              value={this.props.messageToAdminMessage}
              onChange={this.onChange}
            />
            <Button onClick={this.onSubmit}>메시지 보내기</Button>
          </InputGroup>
        </Col>
      </Row>
    );
  }
}

export default HeaderMessage;
