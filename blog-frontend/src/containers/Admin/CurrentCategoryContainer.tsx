import * as React from 'react'

import CurrentCategory from 'components/Templates/Admin/CurrentCategory'

import { CategoryStateInside } from 'store/modules/Category'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'

interface Props {
  category: CategoryStateInside[]
}
const CurrentCategoryContainer: React.SFC<Props> = Props => <CurrentCategory category={Props.category} />

export default connect(({ Category }: StoreState) => ({
  category: Category.categoryCategory
}))(CurrentCategoryContainer)
