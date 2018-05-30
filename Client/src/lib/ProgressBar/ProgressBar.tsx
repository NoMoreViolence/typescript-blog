import * as React from 'react'

import './ProgressBar.css'

import { CategoryState } from 'store/modules/Category'
import { LoadPostState, AddPostState, ChangePostState, DeletePostState } from 'store/modules/Post'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'

interface Props {
  category: CategoryState
  loadPost: LoadPostState
  addPost: AddPostState
  changePost: ChangePostState
  deletePost: DeletePostState
}

interface ProgressBarMainProps {
  loadCategoryPending?: boolean
  addCategoryPending?: boolean
  changeCategoryPending?: boolean
  deleteCategoryPending?: boolean
  loadPostPending?: boolean
  addPostPending?: boolean
  changePostPending?: boolean
  deletePostPending?: boolean
}

// real
class ProgressBar extends React.Component<ProgressBarMainProps> {
  public state = { loading: 0 }
  public componentDidUpdate(prevProps: ProgressBarMainProps) {
    const {
      loadCategoryPending,
      addCategoryPending,
      changeCategoryPending,
      deleteCategoryPending,
      loadPostPending,
      addPostPending,
      changePostPending,
      deletePostPending
    } = this.props

    if (this.props !== prevProps) {
      if (
        loadCategoryPending === true ||
        addCategoryPending === true ||
        changeCategoryPending === true ||
        deleteCategoryPending === true ||
        loadPostPending === true ||
        addPostPending === true ||
        changePostPending === true ||
        deletePostPending === true
      ) {
        this.setState({
          loading: 40
        })
      } else {
        this.setState({ loading: 100 })
      }
    }
    return true
  }
  public render() {
    const style = {
      width: `${this.state.loading}%`
    }
    return (
      <div className="progress-container">
        <div className="progress-bar-custom">
          <div className="progress-loading-bar" style={style} />
        </div>
      </div>
    )
  }
}

// container
const ProgressBarContainer: React.SFC<Props> = Props => (
  <ProgressBar
    loadCategoryPending={Props.category.categoryPending}
    addCategoryPending={Props.category.addCategoryPending}
    changeCategoryPending={Props.category.changeCategoryPending}
    deleteCategoryPending={Props.category.deleteCategoryPending}
    loadPostPending={Props.loadPost.pending}
    addPostPending={Props.addPost.pending}
    changePostPending={Props.changePost.pending}
    deletePostPending={Props.deletePost.pending}
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
