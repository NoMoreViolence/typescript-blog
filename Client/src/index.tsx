import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MainComponent from 'components/MainComponent'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import store from './store'
// Reactstrap css submit
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <Provider store={store}>
    <MainComponent />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
