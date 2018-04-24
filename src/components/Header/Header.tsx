import * as React from 'react';
import { Row, Col } from 'reactstrap';
import { CategoryStateInside } from 'store/modules/Category';
import HeaderMessageToAdminContainer from 'containers/Header/HeaderMessageToAdminContainer';
import HeaderLogo from './HeaderLogo';
import HeaderCategory from './HeaderCategory';

interface Props {
  onLoadCategory: Function;
  categoryError: boolean;
  categoryCategory: [CategoryStateInside];
  categoryPending: boolean;
}

class Header extends React.Component<Props, {}> {
  public componentDidMount() {
    this.props.onLoadCategory();
  }

  public render() {
    return (
      <React.Fragment>
        <Row>
          <Col>
            <HeaderLogo onLoadCategory={this.props.onLoadCategory} />
          </Col>
          <Col>
            <HeaderCategory Category={this.props.categoryCategory} />
          </Col>
        </Row>
        <HeaderMessageToAdminContainer />
      </React.Fragment>
    );
  }
}

export default Header;
