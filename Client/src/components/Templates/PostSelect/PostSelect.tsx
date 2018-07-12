import * as React from 'react'

import './PostSelect.css'

import { GetPostBringAPIInterface } from 'store/modules/Post'

import NotFound from 'components/Pages/NotFound'
import LoadingCircle from 'lib/LoadingCircle'

import { withRouter, RouteComponentProps } from 'react-router-dom'

import MarkDownRendererShowContainer from 'containers/MarkDownRendererShow/MarkDownRendererShowContainer'
import { toast } from 'react-toastify'

interface Props {
  postPending: boolean
  category: string
  title: string
  subTitle: string
  date: number
  showPost: (value: GetPostBringAPIInterface) => any
}

interface State {
  wrongUrl: boolean
}

interface ReceiveDataParams {
  category: string
  title: string
  showPostData: any
}
class PostSelect extends React.Component<Props & RouteComponentProps<History>, State> {
  public state = {
    wrongUrl: false
  }

  public componentDidMount(): void {
    const { history, showPost } = this.props

    // compare url, return url data's
    const receiveUrlData = async (data: ReceiveDataParams): Promise<object> => {
      // split url parameter data[0] = '', data[1] = category, data[2] = title
      const urlData = await history.location.pathname.split('/')

      return Promise.resolve({ ...data, category: urlData[1], title: urlData[2] })
    }

    // check category url is 'admin' or not
    const categoryUrlAdminCheck = (data: ReceiveDataParams): Promise<object> => {
      if (data.category.trim() !== 'admin') {
        return Promise.resolve(data)
      }
      return Promise.reject(new Error('관리자 이름의 카테고리는 없습니다 !'))
    }

    // check title url data s real exist or not
    const titleUrlDataExistCheck = async (data: ReceiveDataParams): Promise<object> => {
      const showPostData = await showPost({ category: data.category, title: data.title, type: 0 }).catch((err: any) => {
        this.setState({
          wrongUrl: true
        })
        toast(err.response.data.message)
      })
      return Promise.resolve({ ...data, showPostData })
    }

    // all process is done
    const allProcessDone = (data: ReceiveDataParams): void => {
      // all process is done
    }

    // error handler
    const onError = (err: Error): void => {
      this.setState({
        wrongUrl: true
      })
    }

    // Promise
    receiveUrlData({ category: '', title: '', showPostData: '' })
      .then(categoryUrlAdminCheck)
      .then(titleUrlDataExistCheck)
      .then(allProcessDone)
      .catch(onError)
  }

  // Optimization rendering problem
  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    if (nextProps !== this.props || nextState !== this.state) {
      return true
    }
    return false
  }

  public render(): JSX.Element {
    const { postPending, title, category, subTitle, date } = this.props

    // check url
    const showPost = (data: State) => {
      // if url is good
      // right post name
      // 'admin' string is not in the url
      if (data.wrongUrl === false) {
        return (
          <React.Fragment>
            <div className="post-view-title-and-category">
              <h1 className="post-view-title">{title}</h1>
              <h2 className="post-view-category">{category}</h2>
            </div>
            <p className="post-view-sub-title">{subTitle}</p>
            <MarkDownRendererShowContainer />
            <div className="category-child-date">
              {date[0] + date[1] + date[2] + date[3]}년 {date[5] + date[6]}월 {date[8] + date[9]}일
            </div>
          </React.Fragment>
        )
      }
      // url is not good
      // not right post name or
      // 'admin' string is in the url
      return <NotFound />
    }

    // check [this.props.postPending]
    // if value is true, it is still pending data
    // if value is false, data is comes already
    const checkLoading = (data: boolean) => {
      // if data already comes
      if (!data) {
        return showPost(this.state)
      }
      // data still loading
      return <LoadingCircle />
    }

    return <React.Fragment>{checkLoading(postPending)}</React.Fragment>
  }
}

export default withRouter(PostSelect)
