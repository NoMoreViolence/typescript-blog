import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from 'components/App'

const MainComponent: React.SFC = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

export default MainComponent
