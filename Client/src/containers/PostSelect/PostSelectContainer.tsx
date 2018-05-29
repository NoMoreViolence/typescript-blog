import * as React from 'react'
import PostSelect from 'components/Templates/PostSelect'

import { ShowPostState, PostActions } from 'store/modules/Post'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators } from 'redux'

interface Props {
  show: ShowPostState
  PostActions: typeof PostActions
}

const PostSelectContainer: React.SFC<Props> = Props => (
  <PostSelect
    category={Props.show.category}
    title={Props.show.title}
    subTitle={Props.show.subTitle}
    mainText={Props.show.mainText}
    date={Props.show.date}
    showPost={Props.PostActions.getPost}
  />
)

export default connect(
  ({ Post }: StoreState) => ({
    show: Post.show
  }),
  dispatch => ({ PostActions: bindActionCreators(PostActions, dispatch) })
)(PostSelectContainer)
