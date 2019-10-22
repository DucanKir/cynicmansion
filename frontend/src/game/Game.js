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
      empty: [],
      showDropdown: false,
      dropdownBtnText: 'Морда лица',
      faceButtonsText: 'Глаза',
      formData: {},
      appliedBeard: '',
      appliedBoobs: '',
      appliedBrows: '',
      appliedClothes: {},
      appliedEyes: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/Eyes0.png',
      appliedGlasses: '',
      appliedHair: '',
      appliedHands: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/Hands11.png',
      appliedHats: '',
      appliedHeads: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/Head1.png',
      appliedLegs: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/Legs2_0.png',
      appliedMasks: '',
      appliedMouths: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/Mouth6.png',

    }
    this.sortImages = this.sortImages.bind(this)
    this.previousBackground = this.previousBackground.bind(this)
    this.nextBackground = this.nextBackground.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.switchControlPanelTab = this.switchControlPanelTab.bind(this)
    this.switchFaceTab = this.switchFaceTab.bind(this)
    this.setEyesButtons = this.setEyesButtons.bind(this)
    this.setBrowsButtons = this.setBrowsButtons.bind(this)
    this.setMouthButtons = this.setMouthButtons.bind(this)
    this.setHandsButtons = this.setHandsButtons.bind(this)
    this.setLegsButtons = this.setLegsButtons.bind(this)
    this.setBoobsButtons = this.setBoobsButtons.bind(this)
    this.setClothesButtons = this.setClothesButtons.bind(this)
    this.setHairButtons = this.setHairButtons.bind(this)
    this.setBeardButtons = this.setBeardButtons.bind(this)
    this.setGlassesButtons = this.setGlassesButtons.bind(this)
    this.setHatsButtons = this.setHatsButtons.bind(this)
    this.setMasksButtons = this.setMasksButtons.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.applyBodyPart = this.applyBodyPart.bind(this)
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

  toggleDropdown() {
    this.setState({ showDropdown: !this.state.showDropdown })
  }

  switchControlPanelTab(e) {
    this.setState({
      dropdownBtnText: e.target.name,
      showDropdown: false
    })
  }

  switchFaceTab(e) {
    this.setState({
      faceButtonsText: e.target.name
    })
  }

  setEyesButtons() {
    const images = this.state.eyes
    return(
      <div className='buttonsContainer'>
        {images.map(image =>
          <div
          key={image.id}
          style={{backgroundImage: `url(${image.url})`}}
          className='eyesButton'
          id={image.name}
          onClick={this.applyBodyPart}
          name='appliedEyes'>

          </div>
        )}
      </div>
    )
  }

  setBrowsButtons() {
    const images = this.state.brows
    return(
      <div className='buttonsContainer'>
        {images.map(image =>
          <div
          key={image.id}
          id={image.name}
          style={{backgroundImage: `url(${image.url})`}}
          className='browsButton'
          onClick={this.applyBodyPart}
          name='appliedBrows'>

          </div>
        )}
      </div>
    )
  }

  setMouthButtons() {
    const images = this.state.mouths
    return(
      <div className='buttonsContainer'>
        {images.map(image =>
          <div
          key={image.id}
          id={image.name}
          style={{backgroundImage: `url(${image.url})`}}
          className='mouthButton'
          onClick={this.applyBodyPart}
          name='appliedMouths'>

          </div>
        )}
      </div>
    )
  }

  setHandsButtons() {
    const images = this.state.hands
    return(
      <div className='buttonsContainer'>
        {images.map(image =>
          <div
          key={image.id}
          id={image.name}
          style={{backgroundImage: `url(${image.url}), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Head1.png), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Body.png)`}}
          className='handsButton'
          onClick={this.applyBodyPart}
          name='appliedHands'>

          </div>
        )}
      </div>
    )
  }

  setLegsButtons() {
    const images = this.state.legs
    return(
      <div className='buttonsContainer'>
        {images.map(image =>
          <div
          key={image.id}
          id={image.name}
          style={{backgroundImage: `url(${image.url}), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Head1.png), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Body.png)`}}
          className='legsButton'
          onClick={this.applyBodyPart}
          name='appliedLegs'>

          </div>
        )}
      </div>
    )
  }

  setBoobsButtons() {
    const images = this.state.boobs
    return(
      <div className='buttonsContainer'>
        {images.map(image =>
          <div
          key={image.id}
          id={image.name}
          style={{backgroundImage: `url(${image.url}), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Head1.png), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Body.png)`}}
          className='boobsButton'
          onClick={this.applyBodyPart}
          name='appliedBoobs'>

          </div>
        )}
      </div>
    )
  }

  setClothesButtons() {
    const images = this.state.clothes
    return(
      <div className='buttonsContainer'>
        {images.map(image =>
          <div
          key={image.id}
          id={image.name}
          style={ image.name === 'Clothes_15' || image.name === 'Clothes_36' ||image.name === 'Clothes_37' ||image.name === 'Clothes_38' ||image.name === 'Clothes_39' ||image.name === 'Clothes_40' ||image.name === 'Clothes_41' ||image.name === 'Clothes_42' ||image.name === 'Clothes_43' ||image.name === 'Clothes_44' ||image.name === 'Clothes_78' ? {backgroundImage: `url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Head1.png), url(${image.url}), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Legs2_0.png)`} : {backgroundImage: `url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Head1.png), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Hands1.png), url(${image.url}), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Legs2_0.png)`}}
          className='clothesButton'
          onClick={this.applyBodyPart}
          name='appliedClothes'>

          </div>
        )}
      </div>
    )
  }

  setHairButtons() {
    const images = this.state.hair
    return(
      <div className='buttonsContainer'>
        {images.map(image =>
          <div
          key={image.id}
          id={image.name}
          style={{backgroundImage: `url(${image.url}), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Head1.png)`}}
          className='hairButton'
          onClick={this.applyBodyPart}
          name='appliedHair'>

          </div>
        )}
      </div>
    )
  }

  setBeardButtons() {
    const images = this.state.beards
    return(
      <div className='buttonsContainer'>
        {images.map(image =>
          <div
          key={image.id}
          id={image.name}
          style={{backgroundImage: `url(${image.url}), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Head1.png)`}}
          className='hairButton'
          onClick={this.applyBodyPart}
          name='appliedBeard'>

          </div>
        )}
      </div>
    )
  }
  setGlassesButtons() {
    const images = this.state.glasses
    return(
      <div className='buttonsContainer'>
        {images.map(image =>
          <div
          key={image.id}
          id={image.name}
          style={{backgroundImage: `url(${image.url}), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Head1.png)`}}
          className='hairButton'
          onClick={this.applyBodyPart}
          name='appliedGlasses'>

          </div>
        )}
      </div>
    )
  }

  setHatsButtons() {
    const images = this.state.hats
    return(
      <div className='buttonsContainer'>
        {images.map(image =>
          <div
          key={image.id}
          id={image.name}
          style={{backgroundImage: `url(${image.url}), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Head1.png)`}}
          className='hairButton'
          onClick={this.applyBodyPart}
          name='appliedHats'>

          </div>
        )}
      </div>
    )
  }
  setMasksButtons() {
    const images = this.state.masks
    console.log(images)
    return(
      <div className='buttonsContainer'>
        {images.map(image =>
          <div
          key={image.id}
          id={image.name}
          style={{backgroundImage: `url(${image.url}), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Head1.png)`}}
          className='hairButton'
          onClick={this.applyBodyPart}
          name='appliedMasks'>

          </div>
        )}
        <div style={{backgroundImage: `url(${this.state.scars[0].url}), url(https://s3.eu-west-2.amazonaws.com/cynic.game.images/Head1.png)`}}
        className='hairButton'
        onClick={this.applyBodyPart}
        name='appliedMasks'
        id={this.state.scars[0].url}>

        </div>
      </div>
    )
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  applyBodyPart(e) {
    const stateName = e.target.getAttribute('name')
    const imgName = e.target.id

    const returnObj = {}
    const pattern = imgName.substring(3, 0).toLowerCase()
    let targetState =''

    Object.keys(this.state).filter (key => {
      if(key.includes(pattern)) {
        targetState = key
      }
    })
    console.log(this.state[targetState])
    this.state[targetState].filter(obj => {
      if(obj.name == imgName){
        returnObj[stateName] = obj
      }
    })

    this.setState(returnObj)

  }

  render(){
    if (!this.state.backgrounds[0]) return 'Loading...'
    console.log()
    return (
      <div className="gamefield" style={{backgroundImage: `url(${this.state.backgrounds[this.state.backgrCount].url})`}}>
        <div>
          <button onClick={this.previousBackground}>previous</button>
          <button onClick={this.nextBackground}>next</button>
        </div>
        <div className='clothes' style={{backgroundImage: `url(${this.state.appliedClothes.url})`}}>

        </div>
        <div className='legs' style={{backgroundImage: `url(${this.state.appliedLegs.url})`}}>

        </div>
        <div className='hands' style={{backgroundImage: `url(${this.state.appliedHands.url})`}}>

        </div>
        <div className='head' style={{backgroundImage: `url(${this.state.appliedHeads})`}}>

        </div>
        <div className='hair' style={{backgroundImage: `url(${this.state.appliedHair.url})`}}>

        </div>
        <div className='eyes' style={{backgroundImage: `url(${this.state.appliedEyes.url})`}}>

        </div>
        <div className='mouth' style={{backgroundImage: `url(${this.state.appliedMouths.url})`}}>

        </div>
        <div className='brows' style={{backgroundImage: `url(${this.state.appliedBrows.url})`}}>

        </div>
        <div className='mask' style={{backgroundImage: `url(${this.state.appliedMasks.url})`}}>

        </div>
        <div className='hat' style={{backgroundImage: `url(${this.state.appliedHats.url})`}}>

        </div>
        <div className='beard' style={{backgroundImage: `url(${this.state.appliedBeard.url})`}}>

        </div>
        <div className='boobs' style={{backgroundImage: `url(${this.state.appliedBoobs.url})`}}>

        </div>
        <div className='glasses' style={{backgroundImage: `url(${this.state.appliedGlasses.url})`}}>

        </div>
        <div className={!this.state.formData.text ? "" : 'pointer'}>

        </div>
        <div className='characterText'>
          {this.state.formData.text}
        </div>
        <input ref="field" onChange={this.handleChange} name='text' className="input is-small input-width" type="text" placeholder="Реплика персонажа" />
        <div  className="controlPanel">
          <div>
            <div className="dropdown">
              <button onClick={this.toggleDropdown} className="dropbtn">{this.state.dropdownBtnText}</button>
              <div id="myDropdown" className={` ${this.state.showDropdown ? 'openDropdown' : 'hideDropdown'}`}>
                <a href="#"
                  onClick={this.switchControlPanelTab}
                  name='Морда лица'
                >Морда лица</a>
                <a href="#"
                  onClick={this.switchControlPanelTab}
                  name='Конечности'
                >Конечности</a>
                <a href="#"
                  onClick={this.switchControlPanelTab}
                  name='Шмот'
                >Шмот</a>
                <a href="#"
                  onClick={this.switchControlPanelTab}
                  name='Волосы'
                >Волосы</a>
                <a href="#"
                  onClick={this.switchControlPanelTab}
                  name='Всякое'
                >Всякое</a>
              </div>
            </div>
          </div>
          <div className='tab'>
            <div className={` ${this.state.dropdownBtnText === 'Морда лица' ? 'showTab' : 'hideTab'}`}>
              <div className="faceBtns">
                <button
                  onClick={this.switchFaceTab}
                  className="extradropbtn" name="Глаза">Глаза</button>
                <button
                  onClick={this.switchFaceTab}
                  className="extradropbtn" name="Рот">Рот</button>
                <button
                  onClick={this.switchFaceTab}
                  className="extradropbtn" name="Брови">Брови</button>
              </div >
              <div className={` ${this.state.faceButtonsText === 'Глаза' ? 'showTab' : 'hideTab'}`}>
                {this.setEyesButtons()}
              </div>
              <div className={` ${this.state.faceButtonsText === 'Рот' ? 'showTab' : 'hideTab'}`}>
                {this.setMouthButtons()}
              </div>
              <div className={` ${this.state.faceButtonsText === 'Брови' ? 'showTab' : 'hideTab'}`}>
                {this.setBrowsButtons()}
              </div>
            </div>
            <div className={` ${this.state.dropdownBtnText === 'Конечности' ? 'showTab' : 'hideTab'}`}>
              <h1>Руки</h1>
              {this.setHandsButtons()}
              <br />
              <h1>Ноги</h1>
              {this.setLegsButtons()}
              <br />
              <h1>Сиськи</h1>
              {this.setBoobsButtons()}
              <br />
            </div>
            <div className={` ${this.state.dropdownBtnText === 'Шмот' ? 'showTab' : 'hideTab'}`}>
              {this.setClothesButtons()}
            </div>
            <div className={` ${this.state.dropdownBtnText === 'Волосы' ? 'showTab' : 'hideTab'}`}>
              {this.setHairButtons()}
            </div>
            <div className={` ${this.state.dropdownBtnText === 'Всякое' ? 'showTab' : 'hideTab'}`}>
              {this.setBeardButtons()}
              {this.setGlassesButtons()}
              {this.setHatsButtons()}
              {this.setMasksButtons()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Game
