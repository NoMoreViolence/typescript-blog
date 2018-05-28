import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// css 모듈
import 'components/commonCSS/layout.css'
import 'components/commonCSS/cardView.css'
import 'components/commonCSS/button.css'

// 페이지들
import Basic from 'components/Pages/Basic'
import Login from 'components/Pages/Login'
import Header from 'components/Pages/Header'
import CategoryAll from 'components/Pages/CategoryAll'
import CategorySelect from 'components/Pages/CategorySelect'
import Admin from 'components/Pages/Admin'

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Basic />
        <ToastContainer />
        <Header />

        <Switch>
          <Route exact={true} path="/admin/login" component={Login} />
          <Route exact={true} path="/admin" component={Admin} />
        </Switch>

        <Route exact={true} path="/" component={CategoryAll} />
        {/* url="/" 부터 url="/:category" 까지, 메인이나 특정 카테고리에 따른 포스트들을 보여줌 */}
        <Route exact={true} path="/:category" component={CategorySelect} />
      </React.Fragment>
    )
  }
}

export default App
