import * as React from 'react'
import CategoryAll from 'components/Templates/CategoryAll'

import { CategoryStateInside } from 'store/modules/Category'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'

interface Props {
  category: CategoryStateInside[]
}

class CategoryAllContainer extends React.Component<Props> {
  public render() {
    return <CategoryAll category={this.props.category} />
  }
}

export default connect(
  ({ Category }: StoreState) => ({ category: Category.categoryCategory }),
  dispatch => ({})
)(CategoryAllContainer)
