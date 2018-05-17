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

class CategoryAll extends React.Component<Props> {
  // state
  public state = {
    load: 10
  }

  // the load value, if it increase, the viewer can see many posts before
  public handleShow = () => {
    this.setState({
      load: this.state.load + 10
    })
  }

  public render() {
    // button show or hide
    let ShowOrHideButton = false
    // all posts number
    let AllPostsNum: number = 0
    const postViewer = (posts: CategoryStateInside[]) => {
      const allPost: PostsStateInside[] = []

      // contain all Posts
      posts.map((object, i) => {
        object.posts.map((object, i) => {
          AllPostsNum++
          allPost.push(object)
        })
      })

      // post number > load value
      if (this.state.load < AllPostsNum) {
        ShowOrHideButton = true
      }

      // sort by date
      allPost.sort(function(a, b) {
        return a.date > b.date ? -1 : a.date < b.date ? 1 : 0
      })

      // return value
      return allPost.map((object, i) => {
        if (i < this.state.load) {
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
        } else {
          return null
        }
      })
    }
    return (
      <Container className="category-all">
        <Row>
          <Col>
            <CardColumns>{postViewer(this.props.category)}</CardColumns>
          </Col>
        </Row>
        <Row>
          <Col>
            {ShowOrHideButton && (
              <Button color="primary" size="lg" block={true} onClick={this.handleShow}>
                More...
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default CategoryAll
