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
  addPostPostTitleChange: (value: string) => void
  addPostPostSubTitleChange: (value: string) => void
  addPostPostMainTextChange: (value: string) => void
  addPostPostError: (value: string) => void
}

const MarkDownEditorAddContainer: React.SFC<Props & Method> = Props => (
  <MarkDownEditor
    // Value
    title={Props.title}
    subTitle={Props.subTitle}
    MainText={Props.mainText}
    titleError={Props.failedWithNoDataTitle}
    subTitleError={Props.failedWithNoDataSubTitle}
    mainTextError={Props.failedWithNoDataMainText}
    // Method
    changeTitle={Props.addPostPostTitleChange}
    changeSubTitle={Props.addPostPostSubTitleChange}
    changeMainText={Props.addPostPostMainTextChange}
    errorHandler={Props.addPostPostError}
  />
)

export default connect<Props, Method, void>(
  ({ Post }: StoreState) => ({
    title: Post.add.title,
    subTitle: Post.add.subTitle,
    mainText: Post.add.mainText,
    failedWithNoDataTitle: Post.add.failedWithNoDataTitle,
    failedWithNoDataSubTitle: Post.add.failedWithNoDataSubTitle,
    failedWithNoDataMainText: Post.add.failedWithNoDataMainText
  }),
  (dispatch: Dispatch) => ({
    addPostPostTitleChange: bindActionCreators(PostActions.addPostPostTitleChange, dispatch),
    addPostPostSubTitleChange: bindActionCreators(PostActions.addPostPostSubTitleChange, dispatch),
    addPostPostMainTextChange: bindActionCreators(PostActions.addPostPostMainTextChange, dispatch),
    addPostPostError: bindActionCreators(PostActions.addPostPostError, dispatch)
  })
)(MarkDownEditorAddContainer)
