import * as React from 'react'

import MarkDownRenderer from 'lib/MarkDownRenderer'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'

interface Props {
  mainText: string
}

const MarkDownRendererShowContainer: React.SFC<Props> = Props => <MarkDownRenderer markdown={Props.mainText} />

export default connect(({ Post }: StoreState) => ({ mainText: Post.show.mainText }))(MarkDownRendererShowContainer)
