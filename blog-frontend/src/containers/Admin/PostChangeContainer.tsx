import * as React from 'react'

import PostChange from 'components/Templates/Admin/PostChange/PostChange'

import { CategoryStateInside, CategoryActions } from 'store/modules/Category'
import { PostActions, GetPostBringAPIInterface, PutChangeAPIInterface } from 'store/modules/Post'
import { LoginActions } from 'store/modules/Login'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators, Dispatch } from 'redux'

interface Props {
  loginLogined: boolean
  category: CategoryStateInside[]
  selectCategory: string
  newCategory: string
  selectTitle: string
  newTitle: string
  subTitle: string
  mainText: string
  changePending: boolean
}

interface Method {
  // Data Get
  getCategory: () => any
  getPost: (value: GetPostBringAPIInterface) => any
  // Post action
  changePutPostCategorySelectChange: (value: string) => void
  changePutPostCategoryChange: (value: string) => void
  changePutPostTitleSelectChange: (value: string) => void
  changePutPost: (value: PutChangeAPIInterface) => any
  // Done
  categoryDone: () => void
  postDone: () => void
  // Error
  changePutPostError: (value: string) => void
  logout: () => void
}

const PostChangeContainer: React.SFC<Props & Method> = Props => (
  <PostChange
    // Login
    loginLogined={Props.loginLogined}
    // Category array
    category={Props.category}
    // Post state
    selectCategory={Props.selectCategory}
    newCategory={Props.newCategory}
    selectTitle={Props.selectTitle}
    newTitle={Props.newTitle}
    subTitle={Props.subTitle}
    mainText={Props.mainText}
    changePending={Props.changePending}
    // Method
    // Category
    loadCategory={Props.getCategory}
    // Post
    loadPost={Props.getPost}
    // Change Method
    changeSelectCategory={Props.changePutPostCategorySelectChange}
    changeCategory={Props.changePutPostCategoryChange}
    changeSelectTitle={Props.changePutPostTitleSelectChange}
    changePost={Props.changePutPost}
    changePostError={Props.changePutPostError}
    // Ending method
    postDone={Props.postDone}
    categoryDone={Props.categoryDone}
    logout={Props.logout}
  />
)

export default connect<Props, Method, void>(
  ({ Post, Category, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    category: Category.categoryCategory,
    selectCategory: Post.change.selectCategory,
    selectTitle: Post.change.selectTitle,
    newCategory: Post.change.category,
    newTitle: Post.change.title,
    subTitle: Post.change.subTitle,
    mainText: Post.change.mainText,
    changePending: Post.change.changePending
  }),
  (dispatch: Dispatch) => ({
    // loading methdo
    getCategory: bindActionCreators(CategoryActions.getCategory, dispatch),
    getPost: bindActionCreators(PostActions.getPost, dispatch),
    // Post change method
    changePutPostCategorySelectChange: bindActionCreators(PostActions.changePutPostCategorySelectChange, dispatch),
    changePutPostCategoryChange: bindActionCreators(PostActions.changePutPostCategoryChange, dispatch),
    changePutPostTitleSelectChange: bindActionCreators(PostActions.changePutPostTitleSelectChange, dispatch),
    changePutPost: bindActionCreators(PostActions.changePutPost, dispatch),
    changePutPostError: bindActionCreators(PostActions.changePutPostError, dispatch),
    // Ending method
    categoryDone: bindActionCreators(CategoryActions.categoryDone, dispatch),
    postDone: bindActionCreators(PostActions.postDone, dispatch),
    logout: bindActionCreators(LoginActions.logout, dispatch)
  })
)(PostChangeContainer)
