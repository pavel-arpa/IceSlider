class SVPoint {
  view: ViewT;
  newPosition: number;
  lineLength: number;
  offset: number;

  constructor(view) {
    this.view = view
    this.newPosition = 0
  }


  start() {
    this.setupOptions()
    this.toDragHorizon()
  }
  
  
  setupOptions() {
    this.view.$points[0].style.width = this.view.options.pointSize + 'px'
    this.view.$points[0].style.height = this.view.options.pointSize + 'px'
    this.view.$points[0].style.marginLeft = - this.view.options.pointSize / 2 + 'px'
    // v
    // this.view.$points[0].style.marginTop = - this.view.options.pointSize / 2 + 'px'

  }


  toDragHorizon() {
    this.moveItem = this.moveItem.bind(this)
    this.removeMoveItem = this.removeMoveItem.bind(this)

    this.view.$points[0].addEventListener('mousedown', this.moveItem)
    document.addEventListener('mouseup', this.removeMoveItem)
    this.view.$points[0].addEventListener('touchstart', this.moveItem)
    document.addEventListener('touchend', this.removeMoveItem)
  }

  
  moveItem(event) {
    this.moveAtCenter(event)
    this.moveAtCenter = this.moveAtCenter.bind(this)
    document.addEventListener('mousemove', this.moveAtCenter)
    document.addEventListener('touchmove', this.moveAtCenter)
  }

  
  removeMoveItem(event) {
    document.removeEventListener('touchmove', this.moveAtCenter)
    document.removeEventListener('mousemove', this.moveAtCenter)
    this.toTurnOnUserSelect()
  }


  moveAtCenter(event) {
    let pos: number
    
    if (event.type.slice(0, 5) === 'touch') {
      if (this.view.options.vertical) {
        pos = event.changedTouches[0].pageY
      } else {
        pos = event.changedTouches[0].pageX
      }
    } else {
      if (this.view.options.vertical) {
        pos = event.pageY
      } else {
        pos = event.pageX
      }
    }
    
    this.toUpdateLineLength()
    this.toUpdateOffset()
    this.toTurnOffUserSelect()
    this.dividingOnSteps(pos)

    // Positions
    let centerOfEl: number = pos - this.view.options.pointSize / 2
    let offsetFIRST: number = this.offset - this.view.options.pointSize / 2
    let offsetSECOND: number = this.offset - this.view.options.pointSize / 2 + this.lineLength
    // console.log(offsetFIRST, offsetSECOND);
    

    // Checking, if the cursor is behind the slider on the right or left
    let isOutsideLeft: boolean = centerOfEl < offsetFIRST
    let isOutsideRight: boolean = centerOfEl > offsetSECOND

    if (!isOutsideLeft && !isOutsideRight) {
      this.toChangeMargin(this.newPosition - this.view.options.pointSize / 2)
    } else if (isOutsideLeft) {
      this.toChangeMargin(- this.view.options.pointSize / 2)
    } else {
      this.toChangeMargin(this.lineLength - this.view.options.pointSize / 2)
    }
    
    this.toUpdateCurrentX()
    this.view.update(SVPoint, 'rewriting text value')
    this.view.update(SVPoint, 'update line width')
  }


  toTurnOffUserSelect() {
    document.body.style.userSelect = 'none'
  }


  toTurnOnUserSelect() {
    document.body.style.userSelect = 'auto'
  }


  dividingOnSteps(pos: number) {
    let countSteps: number = this.view.range / this.view.options.step
    let sizeOfOneStep: number = this.lineLength / Math.ceil(countSteps)
    let currentPosition: number = pos - this.offset
    
    if (Math.round(currentPosition / sizeOfOneStep) * sizeOfOneStep != this.newPosition) {
      this.newPosition = Math.round(currentPosition / sizeOfOneStep) * sizeOfOneStep
      
      let isInner: boolean = ((this.newPosition - this.view.options.pointSize / 2) < this.lineLength) && (this.newPosition > 0)
      
      if (isInner) {
        this.view.stepValue = this.view.options.min + (Math.round(currentPosition / sizeOfOneStep) * this.view.options.step)
      } else if (this.newPosition - this.view.options.pointSize / 2 >= this.lineLength) {
        this.view.stepValue = this.view.options.max
      } else if (this.newPosition - this.view.options.pointSize / 2  < 0) {
        this.view.stepValue = this.view.options.min
      }
    }
  }


  toUpdateCurrentX() {
    this.view.position = this.getMargin();
  }


  toUpdateLineLength() {
    if (this.view.options.vertical) {
      this.lineLength = this.view.$line.offsetHeight
    } else {
      this.lineLength = this.view.$line.offsetWidth
    }
  }


  toUpdateOffset() {
    if (this.view.options.vertical) {
      this.offset = this.view.$line.offsetTop
    } else {
      this.offset = this.view.$line.offsetLeft
    }
  }


  toChangeMargin(value: number) {
    if (this.view.options.vertical) {
      this.view.$points[0].style.marginTop = value + 'px'
    } else {
      this.view.$points[0].style.marginLeft = value + 'px'
    }
  }

  getMargin() {
    if (this.view.options.vertical) {
      return this.view.$points[0].style.marginTop.slice(0, -2)
    } else {
      return this.view.$points[0].style.marginLeft.slice(0, -2)
    }
  }
}

export default SVPoint