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

const CategorySelectContainer: React.SFC<Props & RouteComponentProps<any>> = Props => {
  return (
    <CategorySelect
      posts={Props.Category}
      categoryLoaded={Props.categoryLoaded}
      categoryPending={Props.categoryPending}
      categoryError={Props.categoryError}
    />
  )
}

const component = connect<Props, void, void>(({ Category }: StoreState) => ({
  Category: Category.categoryCategory,
  categoryLoaded: Category.categoryLoaded,
  categoryPending: Category.categoryPending,
  categoryError: Category.categoryError
}))(CategorySelectContainer) as React.ComponentType<any>

export default withRouter(component)
