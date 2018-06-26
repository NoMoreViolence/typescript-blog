import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// css module
import 'components/commonCSS/layout.css'
import 'components/commonCSS/cardView.css'
import 'components/commonCSS/button.css'
import 'components/commonCSS/color.css'

// Pages
import Basic from 'components/Pages/Basic'
import Login from 'components/Pages/Login'
import Header from 'components/Pages/Header'
import CategoryAll from 'components/Pages/CategoryAll'
import CategorySelect from 'components/Pages/CategorySelect'
import Admin from 'components/Pages/Admin'
import PostSelect from 'components/Pages/PostSelect'
import Ripple from './Pages/Ripple'

import ProgressBar from 'lib/ProgressBar'

class App extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <ProgressBar />
        <div className="main">
          <Basic />
          <ToastContainer />
          <Header />

          <Route exact={true} path="/" component={CategoryAll} />

          <Switch>
            <Route exact={true} path="/admin" component={Admin} />
            <Route exact={true} path="/:category" component={CategorySelect} />
          </Switch>

          <Switch>
            <Route exact={true} path="/admin/login" component={Login} />
            <Route
              exact={true}
              path="/:category/:post"
              render={() => (
                <React.Fragment>
                  <PostSelect />
                  <Ripple />
                </React.Fragment>
              )}
            />
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}

export default App
