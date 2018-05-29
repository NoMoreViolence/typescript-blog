import * as React from 'react'

import './NotFound.css'

const NotFound: React.SFC = () => {
  const marginStyle = {
    marginTop: '2.5%'
  }
  return (
    <div style={marginStyle} className="layout-container not-found">
      <section className="error-container">
        <span>OPPS..</span>
        <div>
          <span>4</span>
          <span>
            <span className="screen-reader-text">0</span>
          </span>
          <span>4</span>
        </div>
      </section>
    </div>
  )
}

export default NotFound
