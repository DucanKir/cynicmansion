import React from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-svg-core'
import '@fortawesome/free-solid-svg-icons'
import '@fortawesome/react-fontawesome'


import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './components/pages/Home'
import Navbar from './components/common/Navbar'

import 'bulma'
import './style.scss'

class App extends React.Component {

  render(){
    return (
      <HashRouter>
        <Navbar />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </HashRouter>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
