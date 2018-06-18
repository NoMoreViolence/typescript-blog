import * as React from 'react'

import CategoryChange from 'components/Templates/Admin/CategoryChange'

import { CategoryActions, CategoryStateInside } from 'store/modules/Category'
import { PostActions } from 'store/modules/Post'
import { LoginActions } from 'store/modules/Login'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store/modules'

interface Props {
  loginLogined: boolean
  category: CategoryStateInside[]
  changeCategoryInputValue: string
  changeCategoryCategoryValue: string
  CategoryActions: typeof CategoryActions
  PostActions: typeof PostActions
  LoginActions: typeof LoginActions
}

const CategoryChangeContainer = (Props: Props) => {
  return (
    <CategoryChange
      loginLogined={Props.loginLogined}
      category={Props.category}
      categoryLoad={Props.CategoryActions.getCategory}
      changeCategoryInputValue={Props.changeCategoryInputValue}
      changeCategoryInputChange={Props.CategoryActions.changeCategoryInputChange}
      changeCategorySelectValue={Props.changeCategoryCategoryValue}
      changeCategorySelectChange={Props.CategoryActions.changeCategoryCategoryChange}
      changeCategory={Props.CategoryActions.changeCategory}
      logout={Props.LoginActions.logout}
      categoryDone={Props.CategoryActions.categoryDone}
      postDone={Props.PostActions.postDone}
    />
  )
}

export default connect(
  ({ Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    category: Category.categoryCategory,
    changeCategoryInputValue: Category.changeCategoryInputValue,
    changeCategoryCategoryValue: Category.changeCategoryCategoryValue
  }),
  dispatch => ({
    CategoryActions: bindActionCreators(CategoryActions, dispatch),
    PostActions: bindActionCreators(PostActions, dispatch),
    LoginActions: bindActionCreators(LoginActions, dispatch)
  })
)(CategoryChangeContainer)
