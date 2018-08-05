import * as React from 'react'

import MarkDownEditor from 'lib/MarkDownEditor'

import { PostActions } from 'store/modules/Post'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
import { bindActionCreators, Dispatch } from 'redux'

interface Props {
  // Values
  title: string
  subTitle: string
  mainText: string
  failedWithNoDataTitle: boolean
  failedWithNoDataSubTitle: boolean
  failedWithNoDataMainText: boolean
}

interface Method {
  // Method
  changePutPostTitleChange: (value: string) => void
  changePutPostSubTitleChange: (value: string) => void
  changePutPostMainTextChange: (value: string) => void
  changePutPostError: (value: string) => void
}

const MarkDownEditorChangeContainer: React.SFC<Props & Method> = Props => (
  <MarkDownEditor
    // Value
    title={Props.title}
    subTitle={Props.subTitle}
    MainText={Props.mainText}
    titleError={Props.failedWithNoDataTitle}
    subTitleError={Props.failedWithNoDataSubTitle}
    mainTextError={Props.failedWithNoDataMainText}
    // Method
    changeTitle={Props.changePutPostTitleChange}
    changeSubTitle={Props.changePutPostSubTitleChange}
    changeMainText={Props.changePutPostMainTextChange}
    errorHandler={Props.changePutPostError}
  />
)

export default connect<Props, Method, void>(
  ({ Post }: StoreState) => ({
    title: Post.change.title,
    subTitle: Post.change.subTitle,
    mainText: Post.change.mainText,
    failedWithNoDataTitle: Post.change.failedWithNoDataTitle,
    failedWithNoDataSubTitle: Post.change.failedWithNoDataSubTitle,
    failedWithNoDataMainText: Post.change.failedWithNoDataMainText
  }),
  (dispatch: Dispatch) => ({
    changePutPostTitleChange: bindActionCreators(PostActions.changePutPostTitleChange, dispatch),
    changePutPostSubTitleChange: bindActionCreators(PostActions.changePutPostSubTitleChange, dispatch),
    changePutPostMainTextChange: bindActionCreators(PostActions.changePutPostMainTextChange, dispatch),
    changePutPostError: bindActionCreators(PostActions.changePutPostError, dispatch)
  })
)(MarkDownEditorChangeContainer)
