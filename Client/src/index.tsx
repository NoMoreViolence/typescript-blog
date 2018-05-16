import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MainComponent from 'components/MainComponent'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import store from './store'
// 리액트 스트랩 CSS 적용
import 'bootstrap/dist/css/bootstrap.min.css'
// Quill
import 'react-quill/dist/quill.snow.css' // ES6

ReactDOM.render(
  <Provider store={store}>
    <MainComponent />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
