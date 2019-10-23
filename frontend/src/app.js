import React from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-svg-core'
import '@fortawesome/free-solid-svg-icons'
import '@fortawesome/react-fontawesome'

import Game from './game/Game'

import 'bulma'
import './style.scss'

class App extends React.Component {

  render(){
    return (
      <div>
        <h1>hi</h1>
        <div className="gamecontainer" >
          <Game />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
