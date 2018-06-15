import * as React from 'react'
import CategorySelect from 'components/Templates/CategorySelect'

// category Actions
import { CategoryStateInside } from 'store/modules/Category'

// redux modules & State Type
import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { RouteComponentProps, withRouter } from 'react-router-dom'

interface Props {
  Category: CategoryStateInside[]
  categoryLoaded: boolean
  categoryPending: boolean
  categoryError: boolean
}

class CategorySelectContainer extends React.Component<Props & RouteComponentProps<any>> {
  public render() {
    return (
      <CategorySelect
        posts={this.props.Category}
        categoryLoaded={this.props.categoryLoaded}
        categoryPending={this.props.categoryPending}
        categoryError={this.props.categoryError}
      />
    )
  }
}

export default withRouter(
  connect(
    ({ Category }: StoreState) => ({
      Category: Category.categoryCategory,
      categoryLoaded: Category.categoryLoaded,
      categoryPending: Category.categoryPending,
      categoryError: Category.categoryError
    }),
    dispatch => ({})
  )(CategorySelectContainer)
)
