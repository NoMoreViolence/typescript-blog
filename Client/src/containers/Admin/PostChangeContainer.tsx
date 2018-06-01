import * as React from 'react'

import { CategoryStateInside, CategoryActions } from 'store/modules/Category'
import { ChangePostState, PostActions } from 'store/modules/Post'
import PostChange from 'components/Templates/Admin/PostChange/PostChange'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators } from 'redux'

interface Props {
  change: ChangePostState
  category: CategoryStateInside[]
  PostActions: typeof PostActions
  CategoryActions: typeof CategoryActions
}

class PostAddContainer extends React.Component<Props> {
  public render() {
    return (
      <PostChange
        category={this.props.category}
        loadCategory={this.props.CategoryActions.getCategory}
        loadPost={this.props.PostActions.getPost}
        change={this.props.change}
        changeCategorySelect={this.props.PostActions.changePutPostCategorySelectChange}
        changeCategory={this.props.PostActions.changePutPostCategoryChange}
        changeTitleSelect={this.props.PostActions.changePutPostTitleSelectChange}
        changeTitle={this.props.PostActions.changePutPostTitleChange}
        changeSubTitle={this.props.PostActions.changePutPostSubTitleChange}
        changeMainText={this.props.PostActions.changePutPostMainTextChange}
        changePost={this.props.PostActions.changePutPost}
        postDone={this.props.PostActions.postDone}
        categoryDone={this.props.CategoryActions.categoryDone}
      />
    )
  }
}

export default connect(
  ({ Post, Category }: StoreState) => ({
    change: Post.change,
    category: Category.categoryCategory
  }),
  dispatch => ({
    CategoryActions: bindActionCreators(CategoryActions, dispatch),
    PostActions: bindActionCreators(PostActions, dispatch)
  })
)(PostAddContainer)
