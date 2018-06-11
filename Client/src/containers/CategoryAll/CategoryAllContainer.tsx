import * as React from 'react'

import CategoryAll from 'components/Templates/CategoryAll'

import { CategoryStateInside } from 'store/modules/Category'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'

interface Props {
  category: CategoryStateInside[]
  categoryLoaded: boolean
  categoryPending: boolean
  categoryError: boolean
}

const CategoryAllContainer: React.SFC<Props> = Props => {
  return (
    <CategoryAll
      category={Props.category}
      categoryLoaded={Props.categoryLoaded}
      categoryPending={Props.categoryPending}
      categoryError={Props.categoryError}
    />
  )
}

export default connect(
  ({ Category }: StoreState) => ({
    category: Category.categoryCategory,
    categoryLoaded: Category.categoryLoaded,
    categoryPending: Category.categoryPending,
    categoryError: Category.categoryError
  }),
  dispatch => ({})
)(CategoryAllContainer)
