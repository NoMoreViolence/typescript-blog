import * as React from 'react'
import PostSelectContainer from 'containers/PostSelect/PostSelectContainer'

import './PostSelect.css'

const PostSelect: React.SFC = () => (
  <div className="post-container">
    <div className="post-view-container">
      <PostSelectContainer />
    </div>
  </div>
)

export default PostSelect
