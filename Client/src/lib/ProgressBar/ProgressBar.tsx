import * as React from 'react'
import { CategoryState } from 'store/modules/Category'
import { LoadPostState, AddPostState, ChangePostState, DeletePostState } from 'store/modules/Post'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'

import * as Progressbar from 'air-progressbar'

interface Props {
  category: CategoryState
  loadPost: LoadPostState
  addPost: AddPostState
  changePost: ChangePostState
  deletePost: DeletePostState
}

// real
class ProgressBar extends React.Component<Props> {
  public state = { loading: 0 }
  public componentDidUpdate(PrevProps: Props) {
    // awiejfo;eawfj
  }
  public render() {
    return (
      <Progressbar.Line
        percent={this.state.loading}
        strokeWidth={0.5}
        strokeColor="#2DB7F5"
        tailColor="gray"
        strokeLinecap="round"
      />
    )
  }
}

// container
const ProgressBarContainer: React.SFC<Props> = Props => (
  <ProgressBar
    category={Props.category}
    loadPost={Props.loadPost}
    addPost={Props.addPost}
    changePost={Props.changePost}
    deletePost={Props.deletePost}
  />
)

// export
export default connect(({ Category, Post }: StoreState) => ({
  category: Category,
  loadPost: Post.load,
  addPost: Post.add,
  changePost: Post.change,
  deletePost: Post.delete
}))(ProgressBarContainer)
