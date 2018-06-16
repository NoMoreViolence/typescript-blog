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

interface State {
  loadingCircle: boolean
  showMoreButton: boolean
  shownPost: number
  selectedPostNum: number
  selectedPosts: PostsStateInside[]
  errorOrNot: boolean
}

// componentDidMount interface
interface SelectedPostsDataCDM {
  newProps: Props & RouteComponentProps<any>
  sortedPost: PostsStateInside[]
  sortedPostCount: number
  decisionButtonShowNone: false
}

// componentDidUpdate interface
interface SelectedPostsDataCDU {
  newProps: Props & RouteComponentProps<any>
  prevProps: Props & RouteComponentProps<any>
  sortedPost: PostsStateInside[]
  sortedPostCount: number
  decisionButtonShowNone: false
}

class CategorySelect extends React.Component<Props & RouteComponentProps<any>, State> {
  // state
  public state = {
    loadingCircle: true,
    showMoreButton: false,
    shownPost: 10,
    selectedPostNum: 0,
    selectedPosts: [],
    errorOrNot: false
  }

  // the load value, if it increase, the viewer can see many posts before
  public handleShowMore = (): void => {
    if (this.state.shownPost + 10 > this.state.selectedPostNum) {
      return this.setState({
        showMoreButton: false,
        shownPost: this.state.shownPost + 10
      })
    }
    return this.setState({
      shownPost: this.state.shownPost + 10
    })
  }

  // sort data, show sorted Data
  public componentDidMount(): void {
    // check categoryLoaded is true or not
    // if false, category is not loaded yet
    const checkPostLoaded = (data: SelectedPostsDataCDM): Promise<object> => {
      if (data.newProps.categoryLoaded === true) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Not_Loaded'))
    }

    // check categoryError is true or not
    // if true, it's server Error or choose wrong category
    const checkPostLoadedError = (data: SelectedPostsDataCDM): Promise<object> => {
      if (data.newProps.categoryError === false) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('Loading_Error'))
    }

    // sort data that category is same
    const sortData = (data: SelectedPostsDataCDM): Promise<object> => {
      // sort posts by url value
      const sortedPost = data.newProps.posts.filter(value => value.category === data.newProps.match.url.slice(1))

      if (sortedPost.length !== 0) {
        return Promise.resolve({
          ...data,
          sortedPost: sortedPost[0].posts,
          sortedPostCount: sortedPost[0].posts.length
        })
      }
      return Promise.reject(new Error('Wrong_Url'))
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
    const onError = (err: Error): void => {
      if (err.message === 'Not_Loaded') {
        // still loading
      } else if (err.message === 'Loading_Error') {
        toast('데이터 불러오기 실패 !')
        this.setState({
          errorOrNot: true
        })
      } else if (err.message === 'Wrong_Url') {
        toast('없는 카테고리 입니다 !')
        this.setState({
          errorOrNot: true
        })
      }
    }

    // Promise
    checkPostLoaded({ newProps: this.props, sortedPost: [], sortedPostCount: 0, decisionButtonShowNone: false })
      .then(checkPostLoadedError)
      .then(sortData)
      .then(checkShowNoneButton)
      .then(submitNewData)
      .catch(onError)
  }

  // if the url is changeed, reset the load value
  public componentDidUpdate(prevProps: Props & RouteComponentProps<any>): void {
    // commen function, sort, check shownone button, error handler
    // sort data that category is same
    const sortData = (data: SelectedPostsDataCDU): Promise<object> => {
      // sort posts by url value
      const sortedPost = data.newProps.posts.filter(value => value.category === data.newProps.match.url.slice(1))

      if (sortedPost.length !== 0) {
        return Promise.resolve({
          ...data,
          sortedPost: sortedPost[0].posts,
          sortedPostCount: sortedPost[0].posts.length
        })
      }
      return Promise.reject(new Error('Wrong_URL'))
    }

    // check the button has to show or disappear
    const checkShowNoneButton = (data: SelectedPostsDataCDU): Promise<object> => {
      // handle button show or none, if posts number is low than 10, no show
      if (data.sortedPostCount > this.state.shownPost) {
        return Promise.resolve({ ...data, decisionButtonShowNone: true })
      }
      return Promise.resolve({ ...data, decisionButtonShowNone: false })
    }

    // handle error
    const onError = (err: Error): void => {
      if (err.message === 'Already_Loaded') {
        // do Nothing
      } else if (err.message === 'Data_Not_Loaded') {
        // just Wait
      } else if (err.message === 'URL_Not_Changed') {
        // do Nothing
      } else if (err.message === 'Wrong_URL') {
        toast('없는 카테고리 입니다 !')
        this.setState({
          errorOrNot: true
        })
      }
    }

    //
    //
    //
    //
    // check posts is changed, that mean is posts is loaded
    const checkLoaded = (data: SelectedPostsDataCDU): Promise<object> => {
      // new data comes
      if (data.prevProps.posts !== data.newProps.posts) {
        return Promise.resolve(data)
      }

      // already data is exist
      if (data.newProps.posts.length !== 0) {
        return Promise.reject(new Error('Already_Loaded'))
      }

      // data is not loaded or error
      return Promise.reject(new Error('Data_Not_Loaded'))
    }

    // setState Data
    const submitNewDataFirstLoading = (data: SelectedPostsDataCDU): void => {
      this.setState({
        selectedPostNum: data.sortedPostCount,
        selectedPosts: data.sortedPost,
        showMoreButton: data.decisionButtonShowNone,
        errorOrNot: false
      })
    }

    // first loading
    checkLoaded({
      newProps: this.props,
      prevProps,
      sortedPost: [],
      sortedPostCount: 0,
      decisionButtonShowNone: false
    })
      .then(sortData)
      .then(checkShowNoneButton)
      .then(submitNewDataFirstLoading)
      .catch(onError)
    //
    //
    //
    //
    //

    //
    //
    //
    //
    // Url Change
    const checkUrlChange = (data: SelectedPostsDataCDU): Promise<object> => {
      // url changing
      if (data.prevProps.match.url !== data.newProps.match.url) {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('URL_Not_Changed'))
    }

    // setState Data
    const submitNewDataUrlChange = (data: SelectedPostsDataCDU): void => {
      this.setState({
        selectedPostNum: data.sortedPostCount,
        selectedPosts: data.sortedPost,
        showMoreButton: data.decisionButtonShowNone,
        shownPost: 10,
        errorOrNot: false
      })
    }
    // first loading
    checkUrlChange({
      newProps: this.props,
      prevProps,
      sortedPost: [],
      sortedPostCount: 0,
      decisionButtonShowNone: false
    })
      .then(sortData)
      .then(checkShowNoneButton)
      .then(submitNewDataUrlChange)
      .catch(onError)
    //
    //
    //
    //
    //
  }

  public render(): JSX.Element {
    const { selectedPosts, errorOrNot, showMoreButton } = this.state

    // render posts
    const postViewer = (posts: PostsStateInside[], error: boolean): JSX.Element => {
      // slice array by shown post number
      const Posts = posts.slice(0, this.state.shownPost)

      // if the url is wrong, render 404 not found
      if (error === true) {
        return <NotFound />
      }

      // successfully rendering
      // render current category posts
      return (
        <div className="category-all-container">
          {Posts.map((object, i) => {
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
          })}
        </div>
      )
    }

    // render more posts button
    const showMeTheNoMoreButton = (data: boolean): JSX.Element | null => {
      if (data) {
        return (
          <button className="primary block" onClick={this.handleShowMore}>
            더보기 ...
          </button>
        )
      }
      return null
    }

    // main render
    const circleOrPosts = (data: boolean): JSX.Element | null => {
      if (data) {
        return (
          <div className="category-all-loading-circle">
            <LoadingCircle />
          </div>
        )
      }
      return (
        <React.Fragment>
          {postViewer(selectedPosts, errorOrNot)} {showMeTheNoMoreButton(showMoreButton)}
        </React.Fragment>
      )
    }

    return <div className="layout-container for-margin-top">{circleOrPosts(this.props.categoryPending)}</div>
  }
}

export default withRouter(CategorySelect)
