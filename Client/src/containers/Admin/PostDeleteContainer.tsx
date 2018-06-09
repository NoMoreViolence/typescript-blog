import * as React from 'react'

import PostDelete from 'components/Templates/Admin/PostDelete'

import { CategoryStateInside, CategoryActions } from 'store/modules/Category'
import { PostActions, DeletePostState } from 'store/modules/Post'
import { LoginActions } from 'store/modules/Login'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators } from 'redux'

interface Props {
  loginLogined: boolean
  delete: DeletePostState
  category: CategoryStateInside[]
  CategoryActions: typeof CategoryActions
  PostActions: typeof PostActions
  LoginActions: typeof LoginActions
}

const PostChangeContainer: React.SFC<Props> = Props => {
  return (
    <PostDelete
      loginLogined={Props.loginLogined}
      logout={Props.LoginActions.logout}
      category={Props.category}
      deleteCategory={Props.delete.category}
      deleteTitle={Props.delete.title}
      deleteShowTitle={Props.delete.showTitle}
      deleteSubTitle={Props.delete.showTitle}
      changeCategorySelect={Props.PostActions.deleteDeleteCategorySelectChange}
      changeTitleSelect={Props.PostActions.deleteDeletePostTitleSelectChange}
      deletePost={Props.PostActions.deleteDeletePost}
      loadPost={Props.PostActions.getPost}
      categoryDone={Props.CategoryActions.categoryDone}
      postDone={Props.PostActions.postDone}
      loadCategory={Props.CategoryActions.getCategory}
    />
  )
}

export default connect(
  ({ Post, Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    delete: Post.delete,
    category: Category.categoryCategory
  }),
  dispatch => ({
    CategoryActions: bindActionCreators(CategoryActions, dispatch),
    PostActions: bindActionCreators(PostActions, dispatch),
    LoginActions: bindActionCreators(LoginActions, dispatch)
  })
)(PostChangeContainer)
