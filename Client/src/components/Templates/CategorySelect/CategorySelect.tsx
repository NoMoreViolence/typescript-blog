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
  // state
  public state = {
    load: 10
  }

  // the load value, if it increase, the viewer can see many posts before
  public handleShow = () => {
    // tslint:disable-next-line:no-console
    this.setState({
      load: this.state.load + 10
    })
  }

  // if the url is changeed, reset the load value
  public componentDidUpdate(prevProps: Props) {
    if (this.props.url !== prevProps.url) {
      this.setState({
        load: 10
      })
    }

    // tslint:disable-next-line:no-console
    console.log(this.state.load)
  }

  public render() {
    // button show or hide
    let ShowOrHideButton = false
    // this code is shit, so I will reWrite Code
    const postViewer = (Posts: CategoryStateInside[]) => {
      const SelectedPosts = Posts.filter(value => value.category === this.props.url)

      // Before loaded first API, there is no data, so, I made the data is zero
      // Or Wrong category
      if (SelectedPosts.length === 0) {
        return null
      } else {
        // if the posts number is bigger than this.state.load, activate load more button
        if (SelectedPosts[0].posts.length > this.state.load) {
          ShowOrHideButton = true
        }

        // show value
        return SelectedPosts[0].posts.map((object, i: number) => {
          if (i < this.state.load) {
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
          } else {
            return null
          }
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

export default CategorySelect
