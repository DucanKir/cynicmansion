import React from 'react'
import axios from 'axios'

class Game extends React.Component {

  constructor() {
    super()
    this.state = {
      backgrCount: 0,
      gameStart: false,
      backgrounds: [],
      additionalBackgrounds: [],
      addBkgr: [],
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
      showBgDropdown: false,
      dropdownBtnText: 'Морда лица',
      faceButtonsText: 'Глаза',
      formData: {},
      appliedBeard: '',
      appliedBoobs: '',
      appliedBrows: '',
      appliedClothes: {url: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/Body.png'},
      appliedEyes: {url: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/Eyes0.png'},
      appliedGlasses: '',
      appliedHair: '',
      appliedHands: {url: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/Hands1.png'},
      appliedHats: '',
      appliedHeads: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/Head1.png',
      appliedLegs: {url: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/Legs2_0.png'},
      appliedMasks: '',
      appliedMouths: {url: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/Mouth6.png'},
      heHidden: false,
      haHidden: false,
      leHidden: false,
      eyHidden: false,
      moHidden: false,
      brHidden: false,
      clZindex: 0,
      eySliderValue: 0,
      moSliderValue: 0,
      brSliderValue: 0,
      boSliderValue: 400,
      textHeight: 0
    }

    this.startGame = this.startGame.bind(this)
    this.sortImages = this.sortImages.bind(this)
    this.previousBackground = this.previousBackground.bind(this)
    this.nextBackground = this.nextBackground.bind(this)
    this.setBackground = this.setBackground.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.toggleBgDropdown = this.toggleBgDropdown.bind(this)
    this.closeDropdown = this.closeDropdown.bind(this)
    this.closeBgDropdown = this.closeBgDropdown.bind(this)
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
    this.handleEyesSliderChange = this.handleEyesSliderChange.bind(this)
    this.handleMouthSliderChange = this.handleMouthSliderChange.bind(this)
    this.handleBrowsSliderChange = this.handleBrowsSliderChange.bind(this)
    this.handleBodySliderChange = this.handleBodySliderChange.bind(this)
    this.sortBodyImages = this.sortBodyImages.bind(this)
    this.setDefaultBody = this.setDefaultBody.bind(this)
    this.resetPart = this.resetPart.bind(this)
    this.setBackgroundDropdown = this.setBackgroundDropdown.bind(this)
  }

  
  startGame() {
    this.setState({gameStart: true})
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
      if(this.state.backgrCount-1 == 9){
        this.setState({ addBkgr: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/AddBkgr10_1.png', backgrCount: this.state.backgrCount-1  })
      } else {
        this.setState({ addBkgr: '', backgrCount: this.state.backgrCount-1  })
      }
    } else {
      this.setState({ backgrCount: this.state.backgrounds.length-1, addBkgr: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/AddBkgr11_1.png' })
    }
  }

  nextBackground(){
    if(this.state.backgrCount !== this.state.backgrounds.length-1) {
      if(this.state.backgrCount+1 == 9){
        this.setState({ addBkgr: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/AddBkgr10_1.png', backgrCount: this.state.backgrCount+1  })
      } else if (this.state.backgrCount+1 == 10){
        this.setState({ addBkgr: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/AddBkgr11_1.png', backgrCount: this.state.backgrCount+1  })
      } else {
        this.setState({ addBkgr: '', backgrCount: this.state.backgrCount+1  })
      }
    } else this.setState({ backgrCount: 0, addBkgr: '', })

  }

  setBackground(e){
    let images = this.state.backgrounds
    images.filter(image => {
      if(image.url === e.target.id) {
        if(image.name.split('_')[1]-1 == 9){
          this.setState({backgrCount: image.name.split('_')[1]-1, addBkgr: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/AddBkgr10_1.png'})
        } else if (image.name.split('_')[1]-1 == 10){
          this.setState({backgrCount: image.name.split('_')[1]-1, addBkgr: 'https://s3.eu-west-2.amazonaws.com/cynic.game.images/AddBkgr11_1.png'})
        } else {
          this.setState({backgrCount: image.name.split('_')[1]-1, addBkgr: ''})
        }
      }

    })
  }

  setBackgroundDropdown(){
    let images = this.state.backgrounds
    this.sortBodyImages(images)

    return(
      <div>
        {images.map(image =>
          <div onClick={this.setBackground} key={image.url} id={image.url} style={{backgroundImage: `url(${image.url})`, height: "80px", width: "150px", backgroundSize: "100%", backgroundRepeat: "no-repeat", border: '1px solid black'}}>

          </div>
        )}
      </div>
    )
  }
  setDefaultBody() {
    this.setState({appliedHands: this.state.hands[0]})
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
        empty: this.sortImages(res.data, 'No'),


      }))

  }

  componentDidUpdate(){
    if (this.state.formData.text && this.state.textHeight !== this.refs.text.clientHeight){
      this.setState({textHeight: this.refs.text.clientHeight})

    }
    console.log(this.props)
  }

  toggleDropdown() {
    this.setState({ showDropdown: !this.state.showDropdown })
  }
  toggleBgDropdown() {
    this.setState({ showBgDropdown: !this.state.showBgDropdown })
  }

  closeDropdown() {
    this.setState({ showDropdown: false, showBgDropdown: false  })
  }

  closeBgDropdown() {
    this.setState({showBgDropdown: false  })
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

  sortBodyImages(array) {
    array.sort((a, b) => {
      return +(a.name.split('_')[1]) - +(b.name.split('_')[1])
    })
  }

  setEyesButtons() {
    let images = this.state.eyes
    this.sortBodyImages(images)

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
    this.sortBodyImages(images)

    return(
      <div className='buttonsContainer'>
        <div
          className='browsButton'
          onClick={this.resetPart}
          id='appliedBrows'>
          <i className="fas fa-times clear"></i>
        </div>
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
    this.sortBodyImages(images)

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
    this.sortBodyImages(images)

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
    this.sortBodyImages(images)

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
    this.sortBodyImages(images)

    return(
      <div className='buttonsContainer'>
        <div
          className='boobsButton'
          onClick={this.resetPart}
          id='appliedBoobs'>
          <i className="fas fa-times clear"></i>
        </div>
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
    this.sortBodyImages(images)

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
    this.sortBodyImages(images)

    return(
      <div className='buttonsContainer'>
        <div
          className='hairButton'
          onClick={this.resetPart}
          id='appliedHair'>
          <i className="fas fa-times clear"></i>
        </div>
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
    this.sortBodyImages(images)

    return(
      <div className='buttonsContainer'>
        <div
          className='hairButton'
          onClick={this.resetPart}
          id='appliedBeard'>
          <i className="fas fa-times clear"></i>
        </div>
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
    this.sortBodyImages(images)

    return(
      <div className='buttonsContainer'>
        <div
          className='hairButton'
          onClick={this.resetPart}
          id='appliedGlasses'>
          <i className="fas fa-times clear"></i>
        </div>
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
    this.sortBodyImages(images)

    return(
      <div className='buttonsContainer'>
        <div
          className='hairButton'
          onClick={this.resetPart}
          id='appliedHats'>
          <i className="fas fa-times clear"></i>
        </div>
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
    this.sortBodyImages(images)

    return(
      <div className='buttonsContainer'>
        <div
          className='hairButton'
          onClick={this.resetPart}
          id='appliedMasks'>
          <i className="fas fa-times clear"></i>
        </div>
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
    let position = 0

    let returnObj = {}
    const pattern = imgName.substring(3, 0).toLowerCase()
    let targetState =''

    Object.keys(this.state).filter (key => {
      if(key.includes(pattern)) {
        targetState = key
      }
    })

    this.state[targetState].filter(obj => {
      if(obj.name == imgName){
        console.log(obj.position)
        position = obj.position
        returnObj[stateName] = obj
      }
    })

    if (pattern == 'clo'){
      if (position == 3) {
        returnObj = {...returnObj, haHidden: true, clZindex: 2, leHidden: false, haHidden: true}
      } else if (position == 2){
        returnObj = {...returnObj, haHidden: false, clZindex: 2, leHidden: false, haHidden: false}
      } else if (position == 4){
        returnObj = {...returnObj, haHidden: false, clZindex: 1, leHidden: true, haHidden: true}
      } else {
        returnObj = {...returnObj, haHidden: false, clZindex: 1, leHidden: false, haHidden: false}
      }
    } else if (pattern == 'mas') {
      if (position == 2) {
        returnObj = {...returnObj, eyHidden: false, moHidden: true, brHidden: false, heHidden: false}
      } else if (position == 3) {
        returnObj = {...returnObj, eyHidden: true, moHidden: true, brHidden: true, heHidden: false}
      } else if (position == 4) {
        returnObj = {...returnObj, eyHidden: true, moHidden: true, brHidden: true, heHidden: true}
      } else {
        returnObj = {...returnObj, eyHidden: false, moHidden: false, brHidden: false, heHidden: false}
      }
    }
    this.setState(returnObj)
  }

  resetPart(e){

    this.setState({[e.target.id]: '', eyHidden: false, moHidden: false, brHidden: false, heHidden: false})
  }

  handleEyesSliderChange(e) {
    this.setState({eySliderValue: e.target.value})
  }
  handleBrowsSliderChange(e) {
    this.setState({brSliderValue: e.target.value})
  }
  handleMouthSliderChange(e) {
    this.setState({moSliderValue: e.target.value})
  }
  handleBodySliderChange(e) {
    this.setState({boSliderValue: e.target.value, })
  }

  render(){
    if (!this.state.backgrounds[0]) {
      return (
        <div className="gamefield">
          <div className='splashscreen'>
            <h1 className="version">V2.0</h1>
            <h1 className="splashtext">Loading...</h1>
          </div>
        </div>
      )
    }
    console.log()
    return (
      <div className="gamefield" style={{backgroundImage: `url(${this.state.backgrounds[this.state.backgrCount].url})`}}
      >
        <div className='splashscreen' style={this.state.gameStart ? {display: 'none'} : {display: 'flex'}}>
        <h1 className="version">V2.0</h1>
        <button onClick={this.startGame}className="startButton" >Жмяк</button>
        </div>
        <div className='chooseBkgr'>
          <button className='chooseBkgrButton' onClick={this.previousBackground}>Туда</button>

          <div className="dropdown">
            <div id="myDropdown" className={this.state.showBgDropdown ? 'openBgDropdown' : 'hideBgDropdown'}>
            {this.setBackgroundDropdown()}
            </div>
            <button onClick={this.toggleBgDropdown} className="dropbtnBg">Выбрать фон&nbsp;&nbsp; <i className="fas fa-caret-down"></i></button>
          </div>
          <button className='chooseBkgrButton' onClick={this.nextBackground}>Сюда</button>
        </div>
        <div className='back' onClick={this.closeDropdown} style={{backgroundImage: `url(${this.state.addBkgr})`}}>
        </div>
        <div className="bodyContainer" onClick={this.closeDropdown}>
          <div className='clothes' style={{backgroundImage: `url(${this.state.appliedClothes.url})`, zIndex: this.state.clZindex, backgroundSize: `${this.state.boSliderValue}px 515px`}}>

          </div>
          <div className={!this.state.leHidden ? 'legs' : ""} style={{backgroundImage: `url(${this.state.appliedLegs.url})`, backgroundSize: `${this.state.boSliderValue}px 515px`}}>

          </div>
          <div className={!this.state.haHidden ? 'hands' : ""} style={{backgroundImage: `url(${this.state.appliedHands.url})`, backgroundSize: `${this.state.boSliderValue}px 515px`}}>

          </div>
          <div className={!this.state.heHidden ? 'head' : ""} style={{backgroundImage: `url(${this.state.appliedHeads})`}}>

          </div>
          <div className='mask' style={{backgroundImage: `url(${this.state.appliedMasks.url})`}}>

          </div>
          <div className='hair' style={{backgroundImage: `url(${this.state.appliedHair.url})`}}>

          </div>
          <div className={!this.state.eyHidden ? 'eyes' : ""} style={{backgroundImage: `url(${this.state.appliedEyes.url})`, top: `${this.state.eySliderValue}px`}}>

          </div>
          <div className={!this.state.moHidden ? 'mouth' : ""} style={{backgroundImage: `url(${this.state.appliedMouths.url})`, top: `${this.state.moSliderValue}px`}}>

          </div>
          <div className='brows' style={{backgroundImage: `url(${this.state.appliedBrows.url})`, top: `${this.state.brSliderValue}px`}}>

          </div>
          <div className='hat' style={{backgroundImage: `url(${this.state.appliedHats.url})`}}>

          </div>
          <div className='beard' style={{backgroundImage: `url(${this.state.appliedBeard.url})`}}>

          </div>
          <div className='boobs' style={{backgroundImage: `url(${this.state.appliedBoobs.url})`}}>

          </div>
          <div className='glasses' style={{backgroundImage: `url(${this.state.appliedGlasses.url})`}}>

          </div>
        </div>
        <div className={!this.state.formData.text ? "" : 'pointer'}>

        </div>
        <div className='characterText' ref='text' style={{top: `${100-this.state.textHeight}px`}}>
          {this.state.formData.text}
        </div>
        <input maxLength='100' ref="field" onChange={this.handleChange} name='text' className="input is-small input-width charInput" type="text" placeholder="Реплика персонажа" />
        <div  className="controlPanel" onClick={this.closeBgDropdown}>
          <div>
            <div className="dropdown">
              <button onClick={this.toggleDropdown} className="dropbtn">{this.state.dropdownBtnText}&nbsp;&nbsp; <i className="fas fa-caret-down"></i></button>
              <div id="myDropdown" className={` ${this.state.showDropdown ? 'openDropdown' : 'hideDropdown'}`}>
                <a href="#"
                  onClick={this.switchControlPanelTab}
                  name='Морда лица'
                >Морда лица</a>
                <a href="#"
                  onClick={this.switchControlPanelTab}
                  name='Конечности и тушка'
                >Конечности и тушка</a>
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
            <div className={this.state.showDropdown ? 'openShade' : 'closeShade'} onClick={this.closeDropdown}>
            </div>
            <div className={this.state.dropdownBtnText === 'Морда лица' ? 'showTab' : 'hideTab'}>
              <div className="faceBtns">
                <button
                  onClick={this.switchFaceTab}
                  className={this.state.faceButtonsText === 'Глаза' ? "extradropbtnActive" : "extradropbtn"} name="Глаза">Глаза</button>
                <button
                  onClick={this.switchFaceTab}
                  className={this.state.faceButtonsText === 'Рот' ? "extradropbtnActive" : "extradropbtn"} name="Рот">Рот</button>
                <button
                  onClick={this.switchFaceTab}
                  className={this.state.faceButtonsText === 'Брови' ? "extradropbtnActive" : "extradropbtn"} name="Брови">Брови</button>
              </div >
              <div className={this.state.faceButtonsText === 'Глаза' ? 'showTab' : 'hideTab'}>
                <div className="sliderContainer">
                  <h1>Положение глаз</h1>
                  <input
                  type="range"
                  min="-15"
                  max="15"
                  className="slider"
                  value={this.state.eySliderValue}
                  id="eyesRange"
                  step="5"
                  onChange={this.handleEyesSliderChange} />
                </div>
                {this.setEyesButtons()}
              </div>
              <div className={this.state.faceButtonsText === 'Рот' ? 'showTab' : 'hideTab'}>
                <div className="sliderContainer">
                  <h1>Положение рта</h1>
                  <input
                  type="range"
                  min="-15"
                  max="15"
                  className="slider"
                  value={this.state.moSliderValue}
                  id="eyesRange"
                  step="5"
                  onChange={this.handleMouthSliderChange} />
                </div>
                {this.setMouthButtons()}
              </div>
              <div className={` ${this.state.faceButtonsText === 'Брови' ? 'showTab' : 'hideTab'}`}>
                <div className="sliderContainer">
                  <h1>Положение бровей</h1>
                  <input
                  type="range"
                  min="-15"
                  max="15"
                  className="slider"
                  value={this.state.brSliderValue}
                  id="eyesRange"
                  step="5"
                  onChange={this.handleBrowsSliderChange} />
                </div>
                {this.setBrowsButtons()}
              </div>
            </div>
            <div className={` ${this.state.dropdownBtnText === 'Конечности и тушка' ? 'showTab' : 'hideTab'}`}>
              <div className="sliderContainer">
                <h1>Размер тушки</h1>
                <input
                type="range"
                min="350"
                max="450"
                className="slider"
                value={this.state.boSliderValue}
                id="eyesRange"
                step="5"
                onChange={this.handleBodySliderChange} />
              </div>
              <br />
              <h1>Руки</h1>
              {this.setHandsButtons()}
              <h1>Ноги</h1>
              {this.setLegsButtons()}
              <h1>Сиськи!</h1>
              {this.setBoobsButtons()}
            </div>
            <div className={` ${this.state.dropdownBtnText === 'Шмот' ? 'showTab' : 'hideTab'}`}>
              {this.setClothesButtons()}
            </div>
            <div className={` ${this.state.dropdownBtnText === 'Волосы' ? 'showTab' : 'hideTab'}`}>
              {this.setHairButtons()}
            </div>
            <div className={` ${this.state.dropdownBtnText === 'Всякое' ? 'showTab' : 'hideTab'}`}>
              <h1>Растительность</h1>
              {this.setBeardButtons()}
              <h1>Очки</h1>
              {this.setGlassesButtons()}
              <h1>Головные уборы</h1>
              {this.setHatsButtons()}
              <h1>Маски</h1>
              {this.setMasksButtons()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Game
