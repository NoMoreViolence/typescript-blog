import * as React from 'react'

import MarkDownRenderer from 'lib/MarkDownRenderer'

import { connect } from 'react-redux'
import { StoreState } from 'store/modules'
// markdown editor & renderer css file
import 'prismjs/themes/prism-okaidia.css'
// call the support PL's code highlighting
// http://prismjs.com/#languages-list
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-typescript.min.js'
import 'prismjs/components/prism-jsx.min.js'
import 'prismjs/components/prism-css.min.js'
import 'prismjs/components/prism-tsx.min.js'
import 'prismjs/components/prism-c.min.js'

interface Props {
  mainText: string
}

const MarkDownRendererShowContainer: React.SFC<Props> = Props => <MarkDownRenderer markdown={Props.mainText} />

export default connect(({ Post }: StoreState) => ({ mainText: Post.show.mainText }))(MarkDownRendererShowContainer)
