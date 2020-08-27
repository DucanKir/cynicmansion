import React from 'react'
import ReactDOM from 'react-dom'
import '@fortawesome/fontawesome-svg-core'
import '@fortawesome/free-solid-svg-icons'
import '@fortawesome/react-fontawesome'

import Game from '../../game/Game'
import Comments from '../common/Comments'


class Home extends React.Component {

  componentDidMount(){
    
  }

  render(){
    return (
      <div>
        <div className="gamecontainer" >
          <Game />
        </div>
        <div>
          <Comments />
        </div>
        
      </div>
    )
  }
}

export default Home
