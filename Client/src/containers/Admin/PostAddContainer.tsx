import * as React from 'react'

import { CategoryStateInside, CategoryActions } from 'store/modules/Category'
import { AddPostState, PostActions } from 'store/modules/Post'
import PostAdd from 'components/Templates/Admin/PostAdd'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators } from 'redux'

interface Props {
  add: AddPostState
  category: CategoryStateInside[]
  PostActions: typeof PostActions
  CategoryActions: typeof CategoryActions
}

class PostAddContainer extends React.Component<Props> {
  public render() {
    return (
      <PostAdd
        category={this.props.category}
        add={this.props.add}
        changeCategory={this.props.PostActions.addPostCategoryChange}
        changeTitle={this.props.PostActions.addPostPostTitleChange}
        changeSubTitle={this.props.PostActions.addPostPostSubTitleChange}
        changeMainText={this.props.PostActions.addPostPostMainTextChange}
        addPost={this.props.PostActions.addPostPost}
        postDone={this.props.PostActions.postDone}
        categoryDone={this.props.CategoryActions.categoryDone}
      />
    )
  }
}

export default connect(
  ({ Post, Category }: StoreState) => ({
    add: Post.add,
    category: Category.categoryCategory
  }),
  dispatch => ({
    CategoryActions: bindActionCreators(CategoryActions, dispatch),
    PostActions: bindActionCreators(PostActions, dispatch)
  })
)(PostAddContainer)
