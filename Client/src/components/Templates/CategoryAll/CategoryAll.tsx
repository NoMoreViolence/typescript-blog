import * as React from 'react'

import { CategoryStateInside, PostsStateInside } from 'store/modules/Category'
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
    // style
    const marginStyled = {
      marginTop: '2.5%'
    }

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
            <div className="category-all-child" key={i}>
              <div className="category-child-title">{object.title}</div>
              <div className="category-child-category">{object.category.category}</div>
              <div className="category-child-subTitle">{object.subTitle}</div>
              <div className="category-child-link">
                <div className="category-child-date">
                  {object.date[0] + object.date[1] + object.date[2] + object.date[3]}년{' '}
                  {object.date[5] + object.date[6]}월 {object.date[8] + object.date[9]}일
                </div>
                <NavLink to={'/' + object.category.category + '/' + object.title}>
                  <button className="primary category-child-button">자세히 보기</button>
                </NavLink>
              </div>
            </div>
          )
        } else {
          return null
        }
      })
    }
    return (
      <div className="layout-container" style={marginStyled}>
        <div className="category-all-container">{postViewer(this.props.category)}</div>
        {ShowOrHideButton && (
          <button className="primary block" onClick={this.handleShow}>
            더보기 ...
          </button>
        )}
      </div>
    )
  }
}

export default CategoryAll
