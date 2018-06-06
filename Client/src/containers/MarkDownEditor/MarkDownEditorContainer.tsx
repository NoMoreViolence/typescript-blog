import * as React from 'react'

import MarkDownEditor from 'lib/MarkDownEditor'

import { PostActions, PostState } from 'store/modules/Post'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators } from 'redux'

interface Props {
  type: string
  resource: string
  PostState: PostState
  PostActions: typeof PostActions
}

class MarkDownEditorContainer extends React.Component<Props> {
  public state = {
    titleChange: [this.props.type + this.props.resource] + 'PostTitleChange',
    subTitleChange: [this.props.type + this.props.resource] + 'PostSubTitleChange',
    mainTextChange: [this.props.type + this.props.resource] + 'PostMainTextChange',
    submitError: [this.props.type + this.props.resource] + 'PostError'
  }

  public shouldComponentUpdate(nextProps: Props) {
    if (
      nextProps.PostState[this.props.type].title !== this.props.PostState[this.props.type].title ||
      nextProps.PostState[this.props.type].subTitle !== this.props.PostState[this.props.type].subTitle ||
      nextProps.PostState[this.props.type].mainText !== this.props.PostState[this.props.type].mainText ||
      nextProps.PostState[this.props.type].failedWithNoDataTitle !==
        this.props.PostState[this.props.type].failedWithNoDataTitle ||
      nextProps.PostState[this.props.type].failedWithNoDataSubTitle !==
        this.props.PostState[this.props.type].failedWithNoDataSubTitle ||
      nextProps.PostState[this.props.type].failedWithNoDataMainText !==
        this.props.PostState[this.props.type].failedWithNoDataMainText
    ) {
      return true
    }
    return false
  }

  public render() {
    const { PostState, PostActions } = this.props

    return (
      <MarkDownEditor
        title={PostState[this.props.type].title}
        changeTitle={PostActions[this.state.titleChange]}
        subTitle={PostState[this.props.type].subTitle}
        changeSubTitle={PostActions[this.state.subTitleChange]}
        MainText={PostState[this.props.type].mainText}
        changeMainText={PostActions[this.state.mainTextChange]}
        titleError={PostState[this.props.type].failedWithNoDataTitle}
        subTitleError={PostState[this.props.type].failedWithNoDataSubTitle}
        mainTextError={PostState[this.props.type].failedWithNoDataMainText}
        errorHandler={PostActions[this.state.submitError]}
      />
    )
  }
}

export default connect(
  ({ Post }: StoreState) => ({ PostState: Post }),
  dispatch => ({
    PostActions: bindActionCreators(PostActions, dispatch)
  })
)(MarkDownEditorContainer)
