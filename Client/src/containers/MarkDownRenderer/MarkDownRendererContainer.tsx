import * as React from 'react'

import MarkDownRenderer from 'lib/MarkDownRenderer'

import { PostState } from 'store/modules/Post'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'

interface Props {
  type: string
  PostState: PostState
}

class MarkDownEditorContainer extends React.Component<Props> {
  public shouldComponentUpdate(nextProps: Props) {
    if (nextProps.PostState[this.props.type].mainText !== this.props.PostState[this.props.type].mainText) {
      return true
    }
    return false
  }

  public render() {
    const { PostState } = this.props

    return <MarkDownRenderer markdown={PostState[this.props.type].mainText} />
  }
}

export default connect(
  ({ Post }: StoreState) => ({ PostState: Post }),
  dispatch => ({})
)(MarkDownEditorContainer)
