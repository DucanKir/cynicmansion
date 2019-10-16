import React from 'react'
import axios from 'axios'
import Promise from 'bluebird'

class Game extends React.Component {

  constructor() {
    super()
    this.state = {
      images: []
    }
  }
  componentDidMount(){
    axios.get('/api/images/')
      .then(res => this.setState({ images: res.data}))
  }

  render() {
    if (!this.state.images) return 'Loading...'
    console.log(this.state.images)
    return (
      <section className="section gamefield">

      </section>
    )
  }
}

export default Game
