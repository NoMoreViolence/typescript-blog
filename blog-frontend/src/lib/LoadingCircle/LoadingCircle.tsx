import * as React from 'react'

import './LoadingCircle.css'
import { LoadingComponentProps } from 'react-loadable'

const LoadingCircle: React.SFC<LoadingComponentProps> = Props => (
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
