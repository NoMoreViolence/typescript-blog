import * as React from 'react'

import PostDelete from 'components/Templates/Admin/PostDelete'

import { CategoryStateInside, CategoryActions } from 'store/modules/Category'
import { PostActions, DeleteDeleteAPIInterface, GetPostBringAPIInterface } from 'store/modules/Post'
import { LoginActions } from 'store/modules/Login'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators } from 'redux'

interface Props {
  // State
  loginLogined: boolean
  categories: CategoryStateInside[]
  category: string
  showTitle: string
  title: string
  showSubTitle: string
  deletePending: boolean
  // Loading
  getCategory: () => never
  getPost: (value: GetPostBringAPIInterface) => never
  // Deleting
  deleteDeleteCategorySelectChange: (value: string) => never
  deleteDeletePostTitleSelectChange: (value: string) => never
  deleteDeletePost: (value: DeleteDeleteAPIInterface) => never
  // Ending
  categoryDone: () => never
  postDone: () => never
  logout: () => never
}

const PostChangeContainer: React.SFC<Props> = Props => (
  <PostDelete
    // Delete values
    loginLogined={Props.loginLogined}
    category={Props.categories}
    deleteCategory={Props.category}
    deleteShowTitle={Props.showTitle}
    deleteTitle={Props.title}
    deleteSubTitle={Props.showSubTitle}
    deletePending={Props.deletePending}
    // Loading method
    loadCategory={Props.getCategory}
    loadPost={Props.getPost}
    // Delete method
    changeCategorySelect={Props.deleteDeleteCategorySelectChange}
    changeTitleSelect={Props.deleteDeletePostTitleSelectChange}
    deletePost={Props.deleteDeletePost}
    // Ending method
    categoryDone={Props.categoryDone}
    postDone={Props.postDone}
    logout={Props.logout}
  />
)

export default connect(
  ({ Post, Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    categories: Category.categoryCategory,
    category: Post.delete.category,
    showTitle: Post.delete.showTitle,
    title: Post.delete.title,
    showSubTitle: Post.delete.subTitle,
    deletePending: Post.delete.deletePending
  }),
  dispatch => ({
    getCategory: bindActionCreators(CategoryActions.getCategory, dispatch),
    getPost: bindActionCreators(PostActions.getPost, dispatch),
    deleteDeleteCategorySelectChange: bindActionCreators(PostActions.deleteDeleteCategorySelectChange, dispatch),
    deleteDeletePostTitleSelectChange: bindActionCreators(PostActions.deleteDeletePostTitleSelectChange, dispatch),
    deleteDeletePost: bindActionCreators(PostActions.deleteDeletePost, dispatch),
    categoryDone: bindActionCreators(CategoryActions.categoryDone, dispatch),
    postDone: bindActionCreators(PostActions.postDone, dispatch),
    logout: bindActionCreators(LoginActions.logout, dispatch)
  })
)(PostChangeContainer)
