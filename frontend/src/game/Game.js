import React from 'react'
import axios from 'axios'
import Promise from 'bluebird'

class Game extends React.Component {

  constructor() {
    super()
    this.state = {
      backgrCount: 0,
      backgrounds: [],
      additionalBackgrounds: [],
      beards: [],
      boobs: [],
      brows: [],
      clothes: [],
      eyes: [],
      glasses: [],
      hair: [],
      hands: [],
      hats: [],
      heads: [],
      legs: [],
      masks: [],
      mouths: [],
      scars: [],
      empty: []
    }
    this.sortImages = this.sortImages.bind(this)
    this.previousBackground = this.previousBackground.bind(this)
    this.nextBackground = this.nextBackground.bind(this)
  }

  sortImages(imgs, pattern){
    const backgrList = []
    imgs.filter(img => {
      if(img.name.includes(pattern)) {
        backgrList.push(img)
      }
    })
    return backgrList
  }
  previousBackground(){
    if(this.state.backgrCount !== 0) {
      this.setState({ backgrCount: this.state.backgrCount-1 })
    } else this.setState({ backgrCount: this.state.backgrounds.length-1 })

    if(this.state.backgrounds[this.state.backgrCount-1].name.includes('10') || this.state.backgrounds[this.state.backgrCount-1].name.includes('11')){
      console.log('additional bcgr required')
    }
  }
  nextBackground(){
    if(this.state.backgrCount !== this.state.backgrounds.length-1) {
      this.setState({ backgrCount: this.state.backgrCount+1 })
    } else this.setState({ backgrCount: 0 })

    if(this.state.backgrounds[this.state.backgrCount+1].name.includes('10') || this.state.backgrounds[this.state.backgrCount+1].name.includes('11')){
      console.log('additional bcgr required')
    }
  }

  componentDidMount(){
    axios.get('/api/images/')
      .then(res => this.setState({
        backgrounds: this.sortImages(res.data, 'Backgr'),
        additionalBackgrounds: this.sortImages(res.data, 'Add'),
        beards: this.sortImages(res.data, 'Beard'),
        boobs: this.sortImages(res.data, 'Boo'),
        brows: this.sortImages(res.data, 'Brow'),
        clothes: this.sortImages(res.data, 'Clot'),
        eyes: this.sortImages(res.data, 'Eye'),
        glasses: this.sortImages(res.data, 'Glass'),
        hair: this.sortImages(res.data, 'Hai'),
        hands: this.sortImages(res.data, 'Hand'),
        hats: this.sortImages(res.data, 'Hat'),
        heads: this.sortImages(res.data, 'Head'),
        legs: this.sortImages(res.data, 'Leg'),
        masks: this.sortImages(res.data, 'Mask'),
        mouths: this.sortImages(res.data, 'Mout'),
        scars: this.sortImages(res.data, 'Scar'),
        empty: this.sortImages(res.data, 'No')

      }))
  }

  render() {
    if (!this.state.backgrounds[0]) return 'Loading...'
    console.log(this.state)
    return (
      <section className="section container gamefield" style={{backgroundImage: `url(${this.state.backgrounds[this.state.backgrCount].url})`}}>
        <button onClick={this.previousBackground}>previous</button>
        <button onClick={this.nextBackground}>next</button>
      </section>
    )
  }
}

export default Game
