import * as React from 'react'
import './Admin.css'
// 공통 에디터 전용 css 적용
import 'components/commonCSS/editor.css'

// category
import CurrentCategoryContainer from 'containers/Admin/CurrentCategoryContainer'
import CategoryAddContainer from 'containers/Admin/CategoryAddContainer'
import CategoryChangeContainer from 'containers/Admin/CategoryChangeContainer'
import CategoryDeleteContainer from 'containers/Admin/CategoryDeleteContainer'
// post
import PostAddContainer from 'containers/Admin/PostAddContainer'
import PostChangeContainer from 'containers/Admin/PostChangeContainer'
import PostDeleteContainer from 'containers/Admin/PostDeleteContainer'

import 'codemirror/mode/markdown/markdown' // 마크다운 문법 색상
// 마크다운 내부에 들어가는 코드 색상
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/css/css'
import 'codemirror/mode/shell/shell'
// CodeMirror 를 위한 CSS 스타일
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/material.css'

const Admin: React.SFC = () => {
  const styled = {
    marginTop: '5%'
  }
  return (
    <React.Fragment>
      <div className="layout-container">
        <h1 style={styled}>Category</h1>
        <CurrentCategoryContainer />
        <CategoryAddContainer />
        <CategoryChangeContainer />
        <CategoryDeleteContainer />
      </div>
      <div className="layout-container">
        <h1 style={styled}>Post</h1>
      </div>
      <PostAddContainer />
      <PostChangeContainer />
      <PostDeleteContainer />
    </React.Fragment>
  )
}

export default Admin
