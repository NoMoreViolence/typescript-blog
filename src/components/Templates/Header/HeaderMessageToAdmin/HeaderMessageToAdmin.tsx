import * as React from 'react';
import { Form, InputGroup, Input, Button } from 'reactstrap';
import { toast } from 'react-toastify';

interface InputTarget {
  target: HTMLInputElement;
}
interface Props {
  onPostMessage: (message: string) => void;
  onChange: (value: string) => void;
  messageToAdminMessage: string;
  messageToAdminPending: boolean;
  messageToAdminError: boolean;
}

class HeaderMessageToAdmin extends React.Component<Props> {
  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Form 이벤트 차단
    e.preventDefault();
    // 메시지 전송
    if (this.props.messageToAdminMessage !== '') {
      this.props.onPostMessage(this.props.messageToAdminMessage);
    } else {
      toast('메시지를 입력해 주세요');
    }
  };

  public handleChange = (e: InputTarget) => {
    this.props.onChange(e.target.value);
  };

  public render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <InputGroup>
          <Input
            placeholder="관리자에게 하고 싶은 말을 적어주세요!"
            value={this.props.messageToAdminMessage}
            onChange={this.handleChange}
            name="message"
          />
          <Button color="primary">전송하기</Button>
        </InputGroup>
      </Form>
    );
  }
}

export default HeaderMessageToAdmin;
