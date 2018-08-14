import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import * as helmet from 'react-helmet'

interface State {
  title: string
}

// interface LocationInterface {
//   pathname: string
//   urlArray: string[]
//   title: string
//   changeTitle: string
// }

class Helmet extends React.Component<RouteComponentProps<any>, State> {
  public state = {
    title: 'NMV Blog'
  }

  public render() {
    // For title
    const { pathname } = this.props.history.location
    const titleData = pathname.split('/')
    const lastTitle = titleData[titleData.length - 1]

    return (
      <helmet.default>
        {lastTitle === '' ? <title>{this.state.title}</title> : <title>{this.state.title + ' - ' + lastTitle}</title>}
      </helmet.default>
    )
  }
}

export default withRouter(Helmet)
