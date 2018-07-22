import * as React from 'react'
import RippleContainer from 'containers/Ripple/RippleContainer'

import './Ripple.css'

const Ripple: React.SFC = () => (
  <div className="root-ripple-container">
    <div className="ripple-container">
      <RippleContainer />
    </div>
  </div>
)
export default Ripple
