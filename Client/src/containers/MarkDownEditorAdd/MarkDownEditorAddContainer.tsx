import * as React from 'react'

import MarkDownEditor from 'lib/MarkDownEditor'

import { PostActions, AddPostState } from 'store/modules/Post'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators } from 'redux'

interface Props {
  add: AddPostState
  addPostPostTitleChange: (value: string) => never
  addPostPostSubTitleChange: (value: string) => never
  addPostPostMainTextChange: (value: string) => never
  addPostPostError: (value: string) => never
}

const MarkDownEditorAddContainer: React.SFC<Props> = Props => (
  <MarkDownEditor
    title={Props.add.title}
    changeTitle={Props.addPostPostTitleChange}
    subTitle={Props.add.subTitle}
    changeSubTitle={Props.addPostPostSubTitleChange}
    MainText={Props.add.mainText}
    changeMainText={Props.addPostPostMainTextChange}
    titleError={Props.add.failedWithNoDataTitle}
    subTitleError={Props.add.failedWithNoDataSubTitle}
    mainTextError={Props.add.failedWithNoDataMainText}
    errorHandler={Props.addPostPostError}
  />
)

export default connect(
  ({ Post }: StoreState) => ({ add: Post.add }),
  dispatch => ({
    addPostPostTitleChange: bindActionCreators(PostActions.addPostPostTitleChange, dispatch),
    addPostPostSubTitleChange: bindActionCreators(PostActions.addPostPostSubTitleChange, dispatch),
    addPostPostMainTextChange: bindActionCreators(PostActions.addPostPostMainTextChange, dispatch),
    addPostPostError: bindActionCreators(PostActions.addPostPostError, dispatch)
  })
)(MarkDownEditorAddContainer)
