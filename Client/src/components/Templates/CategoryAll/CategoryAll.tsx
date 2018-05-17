import * as React from 'react'

import './CategoryAll.css'

import { CategoryStateInside, PostsStateInside } from 'store/modules/Category'
import {
  Container,
  Row,
  Col,
  CardColumns,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from 'reactstrap'
import { NavLink } from 'react-router-dom'

interface Props {
  category: CategoryStateInside[]
}

const CategoryAll = ({ category }: Props) => {
  const postViewer = (posts: CategoryStateInside[]) => {
    const allPost: PostsStateInside[] = []

    // contain all Posts
    posts.map((object, i) => {
      object.posts.map((object, i) => {
        allPost.push(object)
      })
    })

    // sort by date
    allPost.sort(function(a, b) {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0
    })

    // return value
    return allPost.map((object, i) => {
      return (
        <Card key={i}>
          <CardBody>
            <CardTitle>{object.title}</CardTitle>
            <CardSubtitle>{object.category.category}</CardSubtitle>
            <CardText>{object.subTitle}</CardText>
            <NavLink to={'/' + object.category.category + '/' + object.title}>
              <Button color="primary">See Post!</Button>
            </NavLink>
          </CardBody>
        </Card>
      )
    })
  }
  return (
    <Container className="category-all">
      <Row>
        <Col>
          <CardColumns>{postViewer(category)}</CardColumns>
        </Col>
      </Row>
    </Container>
  )
}

export default CategoryAll
