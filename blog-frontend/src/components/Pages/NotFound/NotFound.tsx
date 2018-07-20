import * as React from 'react'

import './NotFound.css'

const NotFound: React.SFC = () => {
  return (
    <div className="layout-container">
      <div className="error-container">
        <div>
          <span>OPPS..</span>
        </div>
        <div>
          <span>404</span>
        </div>
      </div>
    </div>
  )
}

export default NotFound
