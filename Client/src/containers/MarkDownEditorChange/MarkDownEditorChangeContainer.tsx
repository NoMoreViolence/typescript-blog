import * as React from 'react'

import MarkDownEditor from 'lib/MarkDownEditor'

import { PostActions, ChangePostState } from 'store/modules/Post'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators } from 'redux'

interface Props {
  change: ChangePostState
  changePutPostTitleChange: (value: string) => never
  changePutPostSubTitleChange: (value: string) => never
  changePutPostMainTextChange: (value: string) => never
  changePutPostError: (value: string) => never
}

const MarkDownEditorChangeContainer: React.SFC<Props> = Props => (
  <MarkDownEditor
    title={Props.change.title}
    changeTitle={Props.changePutPostTitleChange}
    subTitle={Props.change.subTitle}
    changeSubTitle={Props.changePutPostSubTitleChange}
    MainText={Props.change.mainText}
    changeMainText={Props.changePutPostMainTextChange}
    titleError={Props.change.failedWithNoDataTitle}
    subTitleError={Props.change.failedWithNoDataSubTitle}
    mainTextError={Props.change.failedWithNoDataMainText}
    errorHandler={Props.changePutPostError}
  />
)

export default connect(
  ({ Post }: StoreState) => ({ change: Post.change }),
  dispatch => ({
    changePutPostTitleChange: bindActionCreators(PostActions.changePutPostTitleChange, dispatch),
    changePutPostSubTitleChange: bindActionCreators(PostActions.changePutPostSubTitleChange, dispatch),
    changePutPostMainTextChange: bindActionCreators(PostActions.changePutPostMainTextChange, dispatch),
    changePutPostError: bindActionCreators(PostActions.changePutPostError, dispatch)
  })
)(MarkDownEditorChangeContainer)
