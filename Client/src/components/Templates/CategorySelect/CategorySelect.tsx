import * as React from 'react'

import { NavLink } from 'react-router-dom'

import { CategoryStateInside } from 'store/modules/Category'

import NotFound from '../../Pages/NotFound'

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
  }

  public render() {
    // style
    const marginStyled = {
      marginTop: '2.5%'
    }

    // button show or hide
    let ShowOrHideButton = false
    // this code is shit, so I will reWrite Code
    const postViewer = (Posts: CategoryStateInside[]) => {
      const SelectedPosts = Posts.filter(value => value.category === this.props.url)

      // Before loaded first API, there is no data, so, I made the data is zero
      // Or Wrong category
      if (SelectedPosts.length === 0) {
        return <NotFound />
      } else {
        // if the posts number is bigger than this.state.load, activate load more button
        if (SelectedPosts[0].posts.length > this.state.load) {
          ShowOrHideButton = true
        }
        return (
          <div className="category-all-container">
            {/* show value */}
            {SelectedPosts[0].posts.map((object, i: number) => {
              if (i < this.state.load) {
                return (
                  <div className="category-all-child" key={i}>
                    <div className="category-child-title">{object.title}</div>
                    <div className="category-child-category">{object.category.category}</div>
                    <div className="category-child-sub-title">{object.subTitle}</div>
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
            })}
          </div>
        )
      }
    }

    return (
      <div className="layout-container" style={marginStyled}>
        {postViewer(this.props.posts)}
        {ShowOrHideButton && (
          <button className="primary block" onClick={this.handleShow}>
            더보기 ...
          </button>
        )}
      </div>
    )
  }
}

export default CategorySelect
