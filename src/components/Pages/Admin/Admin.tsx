import * as React from 'react';
import { Container, Row, Col } from 'reactstrap';

class Admin extends React.Component {
  public render() {
    return (
      <Container>
        <Row>
          <Col>{/* 카테고리 추가, 변경, 삭제 부분 */}</Col>
        </Row>
        <Row>
          <Col>{/* 포스트 추가, 변경, 삭제 부분 */}</Col>
        </Row>
        <Row>
          <Col>{/* 포스트 별 댓글 관리 부분 */}</Col>
        </Row>
      </Container>
    );
  }
}

export default Admin;
