import * as React from 'react'

import './ProgressBar.css'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'

interface Props {
  categoryPending: boolean
  addCategoryPending: boolean
  changeCategoryPending: boolean
  deleteCategoryPending: boolean
  loadPostPending: boolean
  addPostPending: boolean
  changePostPending: boolean
  deletePostPending: boolean
  topRipplePending: boolean
  childRipplePending: boolean
  addRipplePending: boolean
  changeRipplePending: boolean
  deleteRipplePending: boolean
}

interface ProgressBarMainProps {
  categoryPending: boolean
  addCategoryPending: boolean
  changeCategoryPending: boolean
  deleteCategoryPending: boolean
  loadPostPending: boolean
  addPostPending: boolean
  changePostPending: boolean
  deletePostPending: boolean
  topRipplePending: boolean
  childRipplePending: boolean
  addRipplePending: boolean
  changeRipplePending: boolean
  deleteRipplePending: boolean
}

// real
class ProgressBar extends React.Component<ProgressBarMainProps> {
  public state = { loading: 100 }
  public componentDidUpdate(prevProps: ProgressBarMainProps) {
    const {
      categoryPending,
      addCategoryPending,
      changeCategoryPending,
      deleteCategoryPending,
      loadPostPending,
      addPostPending,
      changePostPending,
      deletePostPending,
      topRipplePending,
      childRipplePending,
      addRipplePending,
      changeRipplePending,
      deleteRipplePending
    } = this.props

    if (this.props !== prevProps) {
      if (
        categoryPending === true ||
        addCategoryPending === true ||
        changeCategoryPending === true ||
        deleteCategoryPending === true ||
        loadPostPending === true ||
        addPostPending === true ||
        changePostPending === true ||
        deletePostPending === true ||
        topRipplePending === true ||
        childRipplePending === true ||
        addRipplePending === true ||
        changeRipplePending === true ||
        deleteRipplePending === true
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
    categoryPending={Props.categoryPending}
    addCategoryPending={Props.addCategoryPending}
    changeCategoryPending={Props.changeCategoryPending}
    deleteCategoryPending={Props.deleteCategoryPending}
    loadPostPending={Props.loadPostPending}
    addPostPending={Props.addPostPending}
    changePostPending={Props.changePostPending}
    deletePostPending={Props.deletePostPending}
    topRipplePending={Props.topRipplePending}
    childRipplePending={Props.childRipplePending}
    addRipplePending={Props.addRipplePending}
    changeRipplePending={Props.changeRipplePending}
    deleteRipplePending={Props.deleteRipplePending}
  />
)

// export
export default connect(({ Category, Post, Ripple }: StoreState) => ({
  categoryPending: Category.categoryPending,
  addCategoryPending: Category.addCategoryPending,
  changeCategoryPending: Category.changeCategoryPending,
  deleteCategoryPending: Category.deleteCategoryPending,
  loadPostPending: Post.load.loadingPending,
  addPostPending: Post.add.addPending,
  changePostPending: Post.change.changePending,
  deletePostPending: Post.delete.deletePending,
  topRipplePending: Ripple.topLoad.pending,
  childRipplePending: Ripple.childLoad.pending,
  addRipplePending: Ripple.addRippleState.pending,
  changeRipplePending: Ripple.changeRippleState.pending,
  deleteRipplePending: Ripple.deleteRippleState.pending
}))(ProgressBarContainer)
