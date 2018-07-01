import * as React from 'react'

import MarkDownRenderer from 'lib/MarkDownRenderer'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'

interface Props {
  mainText: string
}

const MarkDownRendererChangeContainer: React.SFC<Props> = Props => <MarkDownRenderer markdown={Props.mainText} />

export default connect(({ Post }: StoreState) => ({ mainText: Post.change.mainText }))(MarkDownRendererChangeContainer)
