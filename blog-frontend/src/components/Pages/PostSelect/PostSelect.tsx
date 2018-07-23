import * as React from 'react'
import PostSelectContainer from 'containers/PostSelect/PostSelectContainer'

import './PostSelect.css'
// call the support PL's code highlighting
// http://prismjs.com/#languages-list
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-typescript.min.js'
import 'prismjs/components/prism-jsx.min.js'
import 'prismjs/components/prism-css.min.js'
import 'prismjs/components/prism-tsx.min.js'
import 'prismjs/components/prism-c.min.js'

const PostSelect: React.SFC = () => (
  <div className="post-container">
    <div className="post-view-container">
      <PostSelectContainer />
    </div>
  </div>
)

export default PostSelect
