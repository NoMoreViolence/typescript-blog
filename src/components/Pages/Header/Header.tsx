import * as React from 'react';
import { Row, Col, Container } from 'reactstrap';
import HeaderLogoContainer from 'containers/Header/HeaderLogoContainer';
import HeaderCategoryContainer from 'containers/Header/HeaderCategoryContainer';
import HeaderMessageContainer from 'containers/Header/HeaderMessageToAdminContainer';

class Header extends React.Component {
  public render() {
    return (
      <Container>
        <Row>
          <Col>
            <HeaderLogoContainer />
          </Col>
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
