import * as React from 'react'
import CategorySelect from 'components/Templates/CategorySelect'

// category Actions
import { CategoryActions, CategoryStateInside } from 'store/modules/Category'

// redux modules & State Type
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

import { withRouter, RouteComponentProps } from 'react-router-dom'

interface Props {
  Category: CategoryStateInside[]
  CategoryActions: typeof CategoryActions
}

class CategorySelectContainer extends React.Component<Props & RouteComponentProps<any>> {
  public render() {
    return (
      <React.Fragment>
        {this.props.match.url !== '/admin' && (
          <CategorySelect posts={this.props.Category} url={this.props.match.url.slice(1)} />
        )}
      </React.Fragment>
    )
  }
}

export default withRouter(
  connect(
    ({ Category }: StoreState) => ({
      Category: Category.categoryCategory
    }),
    dispatch => ({
      CategoryActions: bindActionCreators(CategoryActions, dispatch)
    })
  )(CategorySelectContainer)
)
