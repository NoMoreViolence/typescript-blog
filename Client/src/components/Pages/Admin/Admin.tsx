import * as React from 'react'
import './Admin.css'
import { Container, Row, Col } from 'reactstrap'

// category
import CurrentCategoryContainer from 'containers/Admin/CurrentCategoryContainer'
import CategoryAddContainer from 'containers/Admin/CategoryAddContainer'
import CategoryChangeContainer from 'containers/Admin/CategoryChangeContainer'
import CategoryDeleteContainer from 'containers/Admin/CategoryDeleteContainer'
// post
import PostAddContainer from 'containers/Admin/PostAddContainer'
import PostChangeContainer from 'containers/Admin/PostChangeContainer'
import PostDeleteContainer from 'containers/Admin/PostDeleteContainer'

import 'codemirror/mode/markdown/markdown' // 마크다운 문법 색상
// 마크다운 내부에 들어가는 코드 색상
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/css/css'
import 'codemirror/mode/shell/shell'
// CodeMirror 를 위한 CSS 스타일
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/material.css'

const Admin: React.SFC = () => (
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
        <Col>
          <CategoryDeleteContainer />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="post-container">Post</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <PostAddContainer />
        </Col>
      </Row>
      <Row>
        <Col>
          <PostChangeContainer />
        </Col>
      </Row>
      <Row>
        <Col>
          <PostDeleteContainer />
        </Col>
      </Row>
    </Container>
  </Container>
)

export default Admin
