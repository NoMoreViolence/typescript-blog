import * as React from 'react'

import './CategorySelect.css'
import { toast } from 'react-toastify'

import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom'

import { CategoryStateInside, PostsStateInside } from 'store/modules/Category'

import NotFound from 'components/Pages/NotFound'
import LoadingCircle from 'lib/LoadingCircle'

interface Props {
  posts: CategoryStateInside[]
  categoryLoaded: boolean
  categoryPending: boolean
  categoryError: boolean
}

interface SelectedPostsDataCDM {
  originData: Props
  sortedPost: PostsStateInside[]
  sortedPostCount: number
  decisionButtonShowNone: false
}
/*
interface SelectedPostsDataCDU {
  originData: Props & RouteComponentProps<any>
  sortedPost: PostsStateInside[]
  sortedPostCount: number
  decisionButtonShowNone: false
  changedUrl: boolean
}
*/

class CategorySelect extends React.Component<Props & RouteComponentProps<any>> {
  // state
  public state = {
    loadingCircle: true,
    showMoreButton: false,
    shownPost: 10,
    selectedPostNum: 0,
    selectedPosts: []
  }

  // the load value, if it increase, the viewer can see many posts before
  public handleShow = () => {
    this.setState({
      shownPost: this.state.shownPost + 10
    })
  }

  // sort data, show sorted Data
  public componentDidMount() {
    // check categoryLoaded is true or not
    // if false, category is not loaded yet
    const checkPostLoaded = (data: SelectedPostsDataCDM): Promise<object> => {
      if (data.originData.categoryLoaded === true) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Not_Loaded'))
    }

    // check categoryError is true or not
    // if true, it's server Error or choose wrong category
    const checkPostLoadedError = (data: SelectedPostsDataCDM): Promise<object> => {
      if (data.originData.categoryError === false) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Loading_Error'))
    }

    // sort data that category is same
    const sortData = (data: SelectedPostsDataCDM): Promise<object> => {
      const sortedPost = data.originData.posts.filter(value => value.category === this.props.match.url.slice(1))
      // tslint:disable-next-line:no-console
      console.log(sortedPost)
      const sortedPostCount = sortedPost.length

      return Promise.resolve({ ...data, sortedPost, sortedPostCount })
    }

    // sort data by date
    const sortDataByDate = (data: SelectedPostsDataCDM): Promise<object> => {
      data.sortedPost.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))

      return Promise.resolve(data)
    }

    // check the button has to show or disappear
    const checkShowNoneButton = (data: SelectedPostsDataCDM): Promise<object> => {
      if (data.sortedPostCount > this.state.shownPost) {
        return Promise.resolve({ ...data, decisionButtonShowNone: true })
      }
      return Promise.resolve({ ...data, decisionButtonShowNone: false })
    }

    // setState Data
    const submitNewData = (data: SelectedPostsDataCDM): void => {
      this.setState({
        selectedPostNum: data.sortedPostCount,
        selectedPosts: data.sortedPost,
        loadingCircle: false,
        showMoreButton: data.decisionButtonShowNone
      })
    }

    // error handler
    const onError = (err: Error) => {
      if (err.message === 'Not_Loaded') {
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
    checkPostLoaded({ originData: this.props, sortedPost: [], sortedPostCount: 0, decisionButtonShowNone: false })
      .then(checkPostLoadedError)
      .then(sortData)
      .then(sortDataByDate)
      .then(checkShowNoneButton)
      .then(submitNewData)
      .catch(onError)
  }
  /*
  // if the url is changeed, reset the load value
  public componentDidUpdate(prevProps: Props & RouteComponentProps<any>) {
    // check url is changed or not
    // if not changed and categoryloaded. that is the first loading
    const checkUrlChanged = (data: SelectedPostsDataCDU): Promise<object> => {
      if (prevProps.match.url !== data.originData.match.url) {
        return Promise.resolve({ ...data, changedUrl: true })
      } else {
        return Promise.resolve({ ...data, changedUrl: false })
      }
    }

    // check categoryLoaded is true or not
    // if false, category is not loaded yet
    const checkPostLoaded = (data: SelectedPostsDataCDU): Promise<object> => {
      // change Url
      if (data.changedUrl === true) {
        return Promise.resolve(data)
      }
      // check Loaded
      if (data.originData.categoryLoaded !== this.props.categoryLoaded && this.props.categoryLoaded === true) {
        return Promise.resolve(data)
      }

      return Promise.reject(new Error('Not_Loaded'))
    }

    // check categoryLoadingError is true or not
    // if true, category loading is failure
    const checkPostLoadError = (data: SelectedPostsDataCDU): Promise<object> => {
      if (this.props.categoryError !== true) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Loading_Error'))
    }

    // sort data that category is same
    const sortData = (data: SelectedPostsDataCDU): Promise<object> => {
      const sortedPost = data.originData.posts.filter(value => value.category === this.props.match.url.slice(1))
      const sortedPostCount = sortedPost.length

      return Promise.resolve({ ...data, sortedPost, sortedPostCount })
    }

    // sort data by date
    const sortDataByDate = (data: SelectedPostsDataCDU): Promise<object> => {
      data.sortedPost.sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))

      return Promise.resolve(data)
    }

    // check the button has to show or disappear
    const checkShowNoneButton = (data: SelectedPostsDataCDU): Promise<object> => {
      if (data.sortedPostCount > this.state.shownPost) {
        return Promise.resolve({ ...data, decisionButtonShowNone: true })
      }
      return Promise.resolve({ ...data, decisionButtonShowNone: false })
    }

    // setState Data
    const submitNewData = (data: SelectedPostsDataCDU): void => {
      this.setState({
        selectedPostNum: data.sortedPostCount,
        selectedPosts: data.sortedPost,
        loadingCircle: false,
        showMoreButton: data.decisionButtonShowNone
      })
    }

    // error handler
    const onError = (err: Error) => {
      if (err.message === 'Not_Loaded') {
        this.setState({
          loadingCircle: true
        })
      } else if (err.message === 'Loading_Error') {
        toast('데이터 불러오기 실패 !')
        this.setState({
          loadingCircle: true
        })
      }
    }

    // Promise
    checkUrlChanged({
      originData: this.props,
      sortedPost: [],
      sortedPostCount: 0,
      decisionButtonShowNone: false,
      changedUrl: false
    })
      .then(checkPostLoaded)
      .then(checkPostLoadError)
      .then(sortData)
      .then(sortDataByDate)
      .then(checkShowNoneButton)
      .then(submitNewData)
      .catch(onError)
  }
  */

  public render() {
    const { selectedPosts, showMoreButton } = this.state

    const postViewer = (posts: CategoryStateInside[]) => {
      if (posts.length === 0) {
        return <NotFound />
      } else {
        // return value
        return (
          <div className="category-all-container">
            {posts[0].posts.map((object, i) => {
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
            })}{' '}
          </div>
        )
      }
    }

    const showMeTheNoMoreButton = (data: boolean) => {
      if (data) {
        return (
          <button className="primary block" onClick={this.handleShow}>
            더보기 ...
          </button>
        )
      }
      return null
    }

    return (
      <div className="layout-container for-margin-top">
        {this.props.categoryPending ? (
          <div className="category-all-loading-circle">
            <LoadingCircle />
          </div>
        ) : (
          <React.Fragment>
            {postViewer(selectedPosts)}
            {showMeTheNoMoreButton(showMoreButton)}
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(CategorySelect)
