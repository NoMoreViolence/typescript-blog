import * as React from 'react'

import { CategoryStateInside, CategoryActions } from 'store/modules/Category'
import { PostAddAPIInterface, PostActions } from 'store/modules/Post'

import PostAdd from 'components/Templates/Admin/PostAdd'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators, Dispatch } from 'redux'
import { LoginActions } from 'store/modules/Login'

interface Props {
  loginLogined: boolean
  category: CategoryStateInside[]
  addPending: boolean
  addCategory: string
  addTitle: string
  addSubTitle: string
  addMainText: string
}

interface Method {
  // Category Data Get
  getCategory: () => any
  // Add Post
  addPostCategoryChange: (value: string) => void
  addPostPost: (value: PostAddAPIInterface) => any
  // Done
  categoryDone: () => void
  postDone: () => void
  // Error
  addPostPostError: (value: string) => void
  logout: () => void
}

const PostAddContainer: React.SFC<Props & Method> = Props => (
  <PostAdd
    // Login
    loginLogined={Props.loginLogined}
    // Get Category Data
    loadCategory={Props.getCategory}
    // Category Data
    category={Props.category}
    // Add Post State
    addPending={Props.addPending}
    addCategory={Props.addCategory}
    addTitle={Props.addTitle}
    addSubTitle={Props.addSubTitle}
    addMainText={Props.addMainText}
    // Change Category
    changeCategory={Props.addPostCategoryChange}
    addPost={Props.addPostPost}
    // Done
    categoryDone={Props.categoryDone}
    postDone={Props.postDone}
    // Error
    postError={Props.addPostPostError}
    logout={Props.logout}
  />
)

export default connect<Props, Method, void>(
  ({ Category, Post, Login }: StoreState) => ({
    loginLogined: Login.loginLogined,
    category: Category.categoryCategory,
    addPending: Post.add.addPending,
    addCategory: Post.add.category,
    addTitle: Post.add.title,
    addSubTitle: Post.add.subTitle,
    addMainText: Post.add.mainText
  }),
  (dispatch: Dispatch) => ({
    getCategory: bindActionCreators(CategoryActions.getCategory, dispatch),
    addPostCategoryChange: bindActionCreators(PostActions.addPostCategoryChange, dispatch),
    addPostPost: bindActionCreators(PostActions.addPostPost, dispatch),
    categoryDone: bindActionCreators(CategoryActions.categoryDone, dispatch),
    postDone: bindActionCreators(PostActions.postDone, dispatch),
    addPostPostError: bindActionCreators(PostActions.addPostPostError, dispatch),
    logout: bindActionCreators(LoginActions.logout, dispatch)
  })
)(PostAddContainer)
