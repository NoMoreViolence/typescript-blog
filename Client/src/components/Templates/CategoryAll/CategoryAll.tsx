import * as React from 'react'

import './CategoryAll.css'
import { toast } from 'react-toastify'
import LoadingCircle from 'lib/LoadingCircle'

import { CategoryStateInside, PostsStateInside } from 'store/modules/Category'
import { NavLink } from 'react-router-dom'

interface Props {
  category: CategoryStateInside[]
  categoryLoaded: boolean
  categoryPending: boolean
  categoryError: boolean
}

interface State {
  loadingCircle: boolean
  showMoreButton: boolean
  shownPost: number
  allPostsNum: number
  allPosts: PostsStateInside[]
}

interface PostsData {
  originData: Props
  allPostsData: PostsStateInside[]
  allPostsCount: number
  decisionButtonShowNone: boolean
}

class CategoryAll extends React.Component<Props, State> {
  // state
  public state = {
    loadingCircle: true,
    showMoreButton: false,
    shownPost: 10,
    allPostsNum: 0,
    allPosts: []
  }

  // the load value, if it increase, the viewer can see many posts before
  public handleShowMore = () => {
    if (this.state.shownPost + 10 > this.state.allPostsNum) {
      return this.setState({
        showMoreButton: false,
        shownPost: this.state.shownPost + 10
      })
    }

    return this.setState({
      shownPost: this.state.shownPost + 10
    })
  }

  /*
    TODO:
    It look very dirty and useless code, but it is not,
    the work in componentDidMount is useless when first loading,
    bacause the api call is unfinished.
    so, componentDidMount can't show data

    Therefore, I use componentDidUpdate,
    bacause It works when props or state changed,
    therefore it can contain api call data
  */
  public componentDidMount() {
    // sort data that received by api
    const mergeOnlyPostsData = async (data: PostsData) => {
      // the data that will be contain all posts data
      const allPosts: PostsStateInside[] = []
      let allPostsCount: number = 0

      // contain part
      await data.originData.category.map((object, i) => {
        object.posts.map((object, i) => {
          allPostsCount++
          allPosts.push(object)
        })
      })

      return Promise.resolve({ ...data, allPostsData: allPosts, allPostsCount })
    }

    // sort sortedData  by date
    const sortDataByDate = async (data: PostsData) => {
      await data.allPostsData.sort(function(a, b) {
        return a.date > b.date ? -1 : a.date < b.date ? 1 : 0
      })

      return Promise.resolve(data)
    }

    const confirmShowNoneButton = (data: PostsData) => {
      if (data.allPostsCount > this.state.shownPost) {
        return Promise.resolve({ ...data, decisionButtonShowNone: true })
      }
      return Promise.resolve({ ...data, decisionBUttonShowNone: false })
    }

    // apply new data
    const submitNewData = (data: PostsData) => {
      this.setState({
        allPostsNum: data.allPostsCount,
        allPosts: data.allPostsData,
        loadingCircle: false,
        showMoreButton: data.decisionButtonShowNone
      })
    }

    mergeOnlyPostsData({
      originData: this.props,
      allPostsData: [],
      allPostsCount: 0,
      decisionButtonShowNone: false
    })
      .then(sortDataByDate)
      .then(confirmShowNoneButton)
      .then(submitNewData)
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    // check the category data is pending or not
    const checkChangingInCategoryPending = (data: PostsData) => {
      if (prevProps.categoryPending !== data.originData.categoryPending) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Not_Call_API'))
    }

    // check the api is loaded or not
    const checkChangingInCategoryLoad = (data: PostsData) => {
      if (data.originData.categoryLoaded === true) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Still_Loading'))
    }

    // check the api is loaded successfully or not
    const checkCategoryError = (data: PostsData) => {
      if (data.originData.categoryError !== true) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Loading_Error'))
    }

    // sort data that received by api
    const mergeOnlyPostsData = async (data: PostsData) => {
      // the data that will be contain all posts data
      const allPosts: PostsStateInside[] = []
      let allPostsCount: number = 0

      // contain part
      await data.originData.category.map((object, i) => {
        object.posts.map((object, i) => {
          allPostsCount++
          allPosts.push(object)
        })
      })

      return Promise.resolve({ ...data, allPostsData: allPosts, allPostsCount })
    }

    // sort sortedData  by date
    const sortDataByDate = async (data: PostsData) => {
      await data.allPostsData.sort(function(a, b) {
        return a.date > b.date ? -1 : a.date < b.date ? 1 : 0
      })

      return Promise.resolve(data)
    }

    const confirmShowNoneButton = (data: PostsData) => {
      if (data.allPostsCount > this.state.shownPost) {
        return Promise.resolve({ ...data, decisionButtonShowNone: true })
      }
      return Promise.resolve({ ...data, decisionBUttonShowNone: false })
    }

    // apply new data
    const submitNewData = (data: PostsData) => {
      this.setState({
        allPostsNum: data.allPostsCount,
        allPosts: data.allPostsData,
        loadingCircle: false,
        showMoreButton: data.decisionButtonShowNone
      })
    }

    const onError = (err: Error) => {
      if (err.message === 'Not_Call_API') {
        // not request api call, but the user is moved to /:8080
      } else if (err.message === 'Still_Loading') {
        this.setState({
          loadingCircle: true
        })
      } else if (err.message === 'Loading_Error') {
        toast('데이터 불러오기 실패 !')
        this.setState({
          loadingCircle: false
        })
      }
    }

    // Promise
    checkChangingInCategoryPending({
      originData: this.props,
      allPostsData: [],
      allPostsCount: 0,
      decisionButtonShowNone: false
    })
      .then(checkChangingInCategoryLoad)
      .then(checkCategoryError)
      .then(mergeOnlyPostsData)
      .then(sortDataByDate)
      .then(confirmShowNoneButton)
      .then(submitNewData)
      .catch(onError)
  }

  public render() {
    // render sorted data
    const postViewer = (posts: PostsStateInside[]) => {
      // return value
      return posts.map((object, i) => {
        if (i < this.state.shownPost) {
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
      <div className="layout-container category-all">
        <div className="welcome-message">환영합니다 !</div>

        {this.props.categoryPending ? (
          <div className="category-all-loading-circle">
            <LoadingCircle />
          </div>
        ) : (
          <React.Fragment>
            <div className="category-all-container">{postViewer(this.state.allPosts)}</div>
            {this.state.showMoreButton && (
              <button className="primary block" onClick={this.handleShowMore}>
                더보기 ...
              </button>
            )}
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default CategoryAll
