import * as React from 'react'

import PostChange from 'components/Templates/Admin/PostChange/PostChange'

import { CategoryStateInside, CategoryActions } from 'store/modules/Category'
import { ChangePostState, PostActions } from 'store/modules/Post'
import { LoginActions } from 'store/modules/Login'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators } from 'redux'

interface Props {
  loginLogined: boolean
  change: ChangePostState
  category: CategoryStateInside[]
  CategoryActions: typeof CategoryActions
  PostActions: typeof PostActions
  LoginActions: typeof LoginActions
}

const PostChangeContainer: React.SFC<Props> = Props => (
  <PostChange
    loginLogined={Props.loginLogined}
    logout={Props.LoginActions.logout}
    category={Props.category}
    loadCategory={Props.CategoryActions.getCategory}
    loadPost={Props.PostActions.getPost}
    change={Props.change}
    changeCategorySelect={Props.PostActions.changePutPostCategorySelectChange}
    changeCategory={Props.PostActions.changePutPostCategoryChange}
    changeTitleSelect={Props.PostActions.changePutPostTitleSelectChange}
    changePost={Props.PostActions.changePutPost}
    postDone={Props.PostActions.postDone}
    categoryDone={Props.CategoryActions.categoryDone}
    postError={Props.PostActions.changePutPostError}
  />
)

export default connect(
  ({ Post, Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    change: Post.change,
    category: Category.categoryCategory
  }),
  dispatch => ({
    CategoryActions: bindActionCreators(CategoryActions, dispatch),
    PostActions: bindActionCreators(PostActions, dispatch),
    LoginActions: bindActionCreators(LoginActions, dispatch)
  })
)(PostChangeContainer)
