import * as React from 'react'

import CategoryDelete from 'components/Templates/Admin/CategoryDelete'

import { CategoryActions, CategoryStateInside } from 'store/modules/Category'
import { PostActions } from 'store/modules/Post'
import { LoginActions } from 'store/modules/Login'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginLogined: boolean
  category: CategoryStateInside[]
  deleteCategoryInputValue: string
  deleteCategoryCategoryValue: string
  CategoryActions: typeof CategoryActions
  PostActions: typeof PostActions
  LoginActions: typeof LoginActions
}

const CategoryDeleteContainer: React.SFC<Props> = Props => (
  <CategoryDelete
    loginLogined={Props.loginLogined}
    category={Props.category}
    categoryLoad={Props.CategoryActions.getCategory}
    deleteCategoryInputValue={Props.deleteCategoryInputValue}
    deleteCategoryInputChange={Props.CategoryActions.deleteCategoryInputChange}
    deleteCategorySelectValue={Props.deleteCategoryCategoryValue}
    deleteCategorySelectChange={Props.CategoryActions.deleteCategoryCategoryChange}
    deleteCategory={Props.CategoryActions.deleteCategory}
    logout={Props.LoginActions.logout}
    categoryDone={Props.CategoryActions.categoryDone}
    postDone={Props.PostActions.postDone}
  />
)

export default connect(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    category: Category.categoryCategory,
    deleteCategoryInputValue: Category.deleteCategoryInputValue,
    deleteCategoryCategoryValue: Category.deleteCategoryCategoryValue
  }),
  dispatch => ({
    CategoryActions: bindActionCreators(CategoryActions, dispatch),
    PostActions: bindActionCreators(PostActions, dispatch),
    LoginActions: bindActionCreators(LoginActions, dispatch)
  })
)(CategoryDeleteContainer)
