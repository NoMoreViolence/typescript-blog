import * as React from 'react'

import './CategorySelect.css'

import { NavLink } from 'react-router-dom'
import {
  CardColumns,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Container,
  Row,
  Col
} from 'reactstrap'

import { CategoryStateInside } from 'store/modules/Category'

// props
/*
  posts: [
    { 
      posts: PostsStateInside[]
      _id: string
      category: string
      __v: number
    }
  ]

  posts[number]posts: [
    date: string
    title: string
    subTitle: string
  ]
*/

interface Props {
  posts: CategoryStateInside[]
  url: string
}

class CategorySelect extends React.Component<Props> {
  public render() {
    // this code is shit, so I will reWrite Code
    const postViewer = (Posts: CategoryStateInside[]) => {
      const SelectedPosts = Posts.filter(value => value.category === this.props.url)
      // Before loaded first API, there is no data, so, I made the data is zero
      // Or Wrong category
      if (SelectedPosts.length === 0) {
        return null
      } else {
        return SelectedPosts[0].posts.map((object, i: number) => {
          return (
            <Card key={i}>
              <CardBody>
                <CardTitle>{object.title}</CardTitle>
                <CardSubtitle>{this.props.url}</CardSubtitle>
                <CardText>{object.subTitle}</CardText>
                <NavLink to={'/' + this.props.url + '/' + object.title}>
                  <Button color="primary">See Post!</Button>
                </NavLink>
              </CardBody>
            </Card>
          )
        })
      }
    }

    return (
      <Container className="category-selected">
        <Row>
          <Col>
            <CardColumns>{postViewer(this.props.posts)}</CardColumns>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default CategorySelect
