import * as React from 'react'
import PostSelect from 'components/Templates/PostSelect'

import { PostActions, GetPostBringAPIInterface } from 'store/modules/Post'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators, Dispatch } from 'redux'

interface Props {
  pending: boolean
  category: string
  title: string
  subTitle: string
  date: number
}

interface Method {
  getPost: (value: GetPostBringAPIInterface) => any
}

const PostSelectContainer: React.SFC<Props & Method> = Props => (
  <PostSelect
    postPending={Props.pending}
    category={Props.category}
    title={Props.title}
    subTitle={Props.subTitle}
    date={Props.date}
    showPost={Props.getPost}
  />
)

export default connect<Props, Method, void>(
  ({ Post }: StoreState) => ({
    pending: Post.load.loadingPending,
    category: Post.show.category,
    title: Post.show.title,
    subTitle: Post.show.subTitle,
    date: Post.show.date
  }),
  (dispatch: Dispatch) => ({ getPost: bindActionCreators(PostActions.getPost, dispatch) })
)(PostSelectContainer)
