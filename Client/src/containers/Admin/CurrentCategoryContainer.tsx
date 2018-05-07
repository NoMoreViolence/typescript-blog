import * as React from 'react'

import CurrentCategory from 'components/Templates/Admin/CurrentCategory'

import { CategoryStateInside } from 'store/modules/Category'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'

interface Props {
  category: [CategoryStateInside]
}
class CurrentCategoryContainer extends React.Component<Props> {
  public render() {
    return <CurrentCategory category={this.props.category} />
  }
}

export default connect(
  ({ Category }: StoreState) => ({
    category: Category.categoryCategory
  }),
  dispatch => ({})
)(CurrentCategoryContainer)
