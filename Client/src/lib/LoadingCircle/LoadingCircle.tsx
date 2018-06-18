import * as React from 'react'

import './LoadingCircle.css'

const LoadingCircle: React.SFC = () => (
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

export default LoadingCircle
