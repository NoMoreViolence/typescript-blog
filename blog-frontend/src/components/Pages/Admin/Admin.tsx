import * as React from 'react'

import './Admin.css'

// category
import CurrentCategoryContainer from 'containers/Admin/CurrentCategoryContainer'
import CategoryAddContainer from 'containers/Admin/CategoryAddContainer'
import CategoryChangeContainer from 'containers/Admin/CategoryChangeContainer'
import CategoryDeleteContainer from 'containers/Admin/CategoryDeleteContainer'
// post
import PostAddContainer from 'containers/Admin/PostAddContainer'
import PostChangeContainer from 'containers/Admin/PostChangeContainer'
import PostDeleteContainer from 'containers/Admin/PostDeleteContainer'

// markdown editor & renderer css file
import 'prismjs/themes/prism-okaidia.css'
// call the support PL's code highlighting
// http://prismjs.com/#languages-list
import 'prismjs/components/prism-bash.min.js'
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-typescript.min.js'
import 'prismjs/components/prism-jsx.min.js'
import 'prismjs/components/prism-css.min.js'
import 'prismjs/components/prism-tsx.min.js'
import 'prismjs/components/prism-c.min.js'
import 'prismjs/components/prism-flow.min.js'

// color of markdown syntax
import 'codemirror/mode/markdown/markdown'
// markdown colorSet for PL
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/css/css'
import 'codemirror/mode/shell/shell'
// CodeMirror Css Style
import 'codemirror/lib/codemirror.css'
import 'components/commonCSS/editorTheme-seti.css'

const Admin: React.SFC = () => {
  return (
    <React.Fragment>
      <div className="layout-container">
        <div className="admin-warning">
          # 주의사항: 하나의 작업을 완료하게 되면 진행중인 다른 작업들은 모두 사라집니다 #
        </div>
        <h1 className="admin-logo">Category</h1>
        <CurrentCategoryContainer />
        <CategoryAddContainer />
        <CategoryChangeContainer />
        <CategoryDeleteContainer />
      </div>
      <div className="layout-container">
        <h1 className="admin-logo">Post</h1>
      </div>
      <PostAddContainer />
      <PostChangeContainer />
      <PostDeleteContainer />
    </React.Fragment>
  )
}

export default Admin
