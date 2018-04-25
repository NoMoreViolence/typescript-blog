import * as React from 'react';
import { Row, Col, Container } from 'reactstrap';
import HeaderCategoryContainer from 'containers/Header/HeaderCategoryContainer';
import HeaderMessageContainer from 'containers/Header/HeaderMessageToAdminContainer';

class Header extends React.Component {
  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <HeaderCategoryContainer />
          </Col>
        </Row>
        <Row>
          <Col>
            <HeaderMessageContainer />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Header;
