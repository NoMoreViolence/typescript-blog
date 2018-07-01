import * as React from 'react'
import PostSelect from 'components/Templates/PostSelect'

import { PostActions } from 'store/modules/Post'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators } from 'redux'

interface Props {
  pending: boolean
  category: string
  title: string
  subTitle: string
  date: number
  PostActions: typeof PostActions
}

const PostSelectContainer: React.SFC<Props> = Props => (
  <PostSelect
    postPending={Props.pending}
    category={Props.category}
    title={Props.title}
    subTitle={Props.subTitle}
    date={Props.date}
    showPost={Props.PostActions.getPost}
  />
)

export default connect(
  ({ Post }: StoreState) => ({
    category: Post.show.category,
    title: Post.show.title,
    subTitle: Post.show.subTitle,
    date: Post.show.date,
    pending: Post.load.pending
  }),
  dispatch => ({ PostActions: bindActionCreators(PostActions, dispatch) })
)(PostSelectContainer)
