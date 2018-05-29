import * as React from 'react'

import './LoadingBar.css'

const LoadingBar: React.SFC = () => (
  <div className="loading-bar-container">
    <div className="loading-bar">
      <div className="spinnerBlock">
        <span className="circle" />
        <span className="circle" />
        <span className="circle" />
        <span className="circle" />
        <span className="circle" />
        <span className="circle" />
        <span className="circle" />
      </div>
    </div>
  </div>
)

export default LoadingBar
