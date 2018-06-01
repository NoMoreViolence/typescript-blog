import * as React from 'react'

import { CategoryStateInside, CategoryActions } from 'store/modules/Category'
import { PostActions, DeletePostState } from 'store/modules/Post'
import PostDelete from 'components/Templates/Admin/PostDelete'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators } from 'redux'

interface Props {
  delete: DeletePostState
  category: CategoryStateInside[]
  PostActions: typeof PostActions
  CategoryActions: typeof CategoryActions
}

class PostDeleteContainer extends React.Component<Props> {
  public render() {
    return (
      <PostDelete
        category={this.props.category}
        delete={this.props.delete}
        loadCategory={this.props.CategoryActions.getCategory}
        loadPost={this.props.PostActions.getPost}
        changeCategorySelect={this.props.PostActions.deleteDeleteCategorySelectChange}
        changeTitleSelect={this.props.PostActions.deleteDeletePostTitleSelectChange}
        deleteCategory={this.props.PostActions.deleteDeletePost}
        postDone={this.props.PostActions.postDone}
        categoryDone={this.props.CategoryActions.categoryDone}
      />
    )
  }
}

export default connect(
  ({ Post, Category }: StoreState) => ({
    delete: Post.delete,
    category: Category.categoryCategory
  }),
  dispatch => ({
    CategoryActions: bindActionCreators(CategoryActions, dispatch),
    PostActions: bindActionCreators(PostActions, dispatch)
  })
)(PostDeleteContainer)
