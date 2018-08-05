import * as React from 'react'

import CategoryChange from 'components/Templates/Admin/CategoryChange'

import { CategoryActions, CategoryStateInside, PatchCategoryChangeAPIInterface } from 'store/modules/Category'
import { PostActions } from 'store/modules/Post'
import { LoginActions } from 'store/modules/Login'

import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginLogined: boolean
  category: CategoryStateInside[]
  changeCategoryPending: boolean
  changeCategoryInputValue: string
  changeCategorySelectValue: string
}

interface Method {
  getCategory: () => any
  changeCategoryInputChange: (value: string) => void
  changeCategorySelectChange: (value: string) => void
  changeCategory: (value: PatchCategoryChangeAPIInterface) => any
  categoryDone: () => void
  // Post actions
  postDone: () => void
  // Login actions
  logout: () => void
}

const CategoryChangeContainer: React.SFC<Props & Method> = Props => (
  <CategoryChange
    loginLogined={Props.loginLogined}
    category={Props.category}
    categoryLoad={Props.getCategory}
    changeCategoryInputValue={Props.changeCategoryInputValue}
    changeCategoryInputChange={Props.changeCategoryInputChange}
    changeCategorySelectValue={Props.changeCategorySelectValue}
    changeCategorySelectChange={Props.changeCategorySelectChange}
    changeCategory={Props.changeCategory}
    categoryDone={Props.categoryDone}
    postDone={Props.postDone}
    logout={Props.logout}
    pending={Props.changeCategoryPending}
  />
)

export default connect<Props, Method, void>(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    category: Category.categoryCategory,
    changeCategoryPending: Category.changeCategoryPending,
    changeCategoryInputValue: Category.changeCategoryInputValue,
    changeCategorySelectValue: Category.changeCategorySelectValue
  }),
  (dispatch: Dispatch) => ({
    getCategory: bindActionCreators(CategoryActions.getCategory, dispatch),
    changeCategoryInputChange: bindActionCreators(CategoryActions.changeCategoryInputChange, dispatch),
    changeCategorySelectChange: bindActionCreators(CategoryActions.changeCategorySelectChange, dispatch),
    changeCategory: bindActionCreators(CategoryActions.changeCategory, dispatch),
    categoryDone: bindActionCreators(CategoryActions.categoryDone, dispatch),
    postDone: bindActionCreators(PostActions.postDone, dispatch),
    logout: bindActionCreators(LoginActions.logout, dispatch)
  })
)(CategoryChangeContainer)
