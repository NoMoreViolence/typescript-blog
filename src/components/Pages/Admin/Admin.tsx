import * as React from 'react'
import './Admin.css'
import { Container, Row, Col } from 'reactstrap'

import CurrentCategoryContainer from 'containers/Admin/CurrentCategoryContainer'
import CategoryAddContainer from 'containers/Admin/CategoryAddContainer'
import CategoryChangeContainer from 'containers/Admin/CategoryChangeContainer'

const Admin = ({}) => {
  return (
    <Container>
      <Container>
        <Row>
          <Col>
            <h1 className="category-container">Category</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <CurrentCategoryContainer />
          </Col>
        </Row>
        <Row>
          <Col>
            <CategoryAddContainer />
          </Col>
        </Row>
        <Row>
          <Col>
            <CategoryChangeContainer />
          </Col>
        </Row>
        <Row>
          <Col>{/* 포스트 별 댓글 관리 부분 */}</Col>
        </Row>
      </Container>
    </Container>
  )
}

export default Admin
