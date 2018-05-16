import * as React from 'react'
import CategorySelectContainer from 'containers/CategorySelect/CategorySelectContainer'
import { RouteComponentProps, withRouter } from 'react-router-dom'

class CategorySelect extends React.Component<RouteComponentProps<any>> {
  public render() {
    return <React.Fragment>{this.props.match.url !== '/admin' && <CategorySelectContainer />}</React.Fragment>
  }
}

export default withRouter(CategorySelect)
