import * as React from 'react'

import MarkDownRenderer from 'lib/MarkDownRenderer'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'

interface Props {
  mainText: string
}

const MarkDownRendererDeleteContainer: React.SFC<Props> = Props => <MarkDownRenderer markdown={Props.mainText} />

export default connect<Props, void, void>(({ Post }: StoreState) => ({ mainText: Post.delete.mainText }))(
  MarkDownRendererDeleteContainer
)
