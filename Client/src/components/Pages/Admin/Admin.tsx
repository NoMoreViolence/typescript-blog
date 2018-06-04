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
