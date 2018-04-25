import * as React from 'react';
import { Container, Row, Col, Button, Form, Input } from 'reactstrap';

interface Props {
  handleChangeUsername: Function;
  loginUsername: string;
  handleChangePassword: Function;
  loginPassword: string;
  postLogined: Function;
  postLoginFailed: Function;
  getLoginCheck: Function;
  Logined: boolean;
}

class Login extends React.Component<Props> {
  public render() {
    return (
      <Container className="login-form">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Button outline={true} color="primary" size="lg" disabled={true}>
              Admin Login
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form>
              <Input type="text" placeholder="Username" name="username" />
              <Input type="password" placeholder="Password" name="password" />
              <Button color="primary" size="lg" block={true}>
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;
