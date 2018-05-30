import * as React from 'react'

import './PostSelect.css'

import { GetPostBringAPIInterface } from 'store/modules/Post'

import NotFound from 'components/Pages/NotFound'
import LoadingCircle from 'lib/LoadingCircle'

import { withRouter, RouteComponentProps } from 'react-router-dom'
import MarkdownRender from 'lib/MarkDownRenderer'

interface Props {
  loading?: boolean
  category?: string
  title?: string
  subTitle?: string
  mainText?: string
  date?: number
  showPost: (value: GetPostBringAPIInterface) => any
}

interface HomeProps extends RouteComponentProps<any> {}

class PostSelect extends React.Component<Props & HomeProps> {
  public state = {
    thereIsNoAdminCategory: false
  }

  public async componentDidMount() {
    const data = await this.props.history.location.pathname.split('/')
    if (data[1] === 'admin') {
      this.setState({
        thereIsNoAdminCategory: true
      })
    } else {
      this.props.showPost({ category: data[1], title: data[2], type: 0 })
    }
  }

  public render() {
    const marginStyle = {
      marginTop: '2.5%'
    }
    return (
      <div style={marginStyle} className="layout-container">
        {this.props.loading === true ? (
          <LoadingCircle />
        ) : (
          <React.Fragment>
            {this.state.thereIsNoAdminCategory !== true ? (
              <div className="post-view-container">
                <div className="post-view-title-and-category">
                  <h1 className="post-view-title">{this.props.title}</h1>
                  <h2 className="post-view-category">{this.props.category}</h2>
                </div>
                <p className="post-view-sub-title">{this.props.subTitle}</p>
                <MarkdownRender markdown={this.props.mainText} />
              </div>
            ) : (
              <NotFound />
            )}
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default withRouter(PostSelect)
