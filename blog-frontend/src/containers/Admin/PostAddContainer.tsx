import * as React from 'react'

import { CategoryStateInside, CategoryActions } from 'store/modules/Category'
import { AddPostState, PostActions } from 'store/modules/Post'
import { LoginActions } from 'store/modules/Login'

import PostAdd from 'components/Templates/Admin/PostAdd'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators } from 'redux'

interface Props {
  loginLogined: boolean
  add: AddPostState
  category: CategoryStateInside[]
  CategoryActions: typeof CategoryActions
  PostActions: typeof PostActions
  LoginActions: typeof LoginActions
}

const PostAddContainer: React.SFC<Props> = Props => (
  <PostAdd
    loginLogined={Props.loginLogined}
    logout={Props.LoginActions.logout}
    category={Props.category}
    add={Props.add}
    changeCategory={Props.PostActions.addPostCategoryChange}
    addPost={Props.PostActions.addPostPost}
    postDone={Props.PostActions.postDone}
    categoryDone={Props.CategoryActions.categoryDone}
    loadCategory={Props.CategoryActions.getCategory}
    postError={Props.PostActions.addPostPostError}
  />
)

export default connect(
  ({ Category, Post, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    add: Post.add,
    category: Category.categoryCategory
  }),
  dispatch => ({
    CategoryActions: bindActionCreators(CategoryActions, dispatch),
    PostActions: bindActionCreators(PostActions, dispatch),
    LoginActions: bindActionCreators(LoginActions, dispatch)
  })
)(PostAddContainer)
