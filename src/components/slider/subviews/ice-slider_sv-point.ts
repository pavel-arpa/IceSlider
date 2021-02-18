class SVPoint {
  view: ViewT;
  newPosition: number;

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
  }

  toDragHorizon() {
    this.moveItem = this.moveItem.bind(this)
    this.removeMoveItem = this.removeMoveItem.bind(this)

    this.view.$points[0].addEventListener('mousedown', this.moveItem)
    document.addEventListener('mouseup', this.removeMoveItem)
  }
  
  moveItem(event) {
    this.moveAtCenter(event)
    this.moveAtCenter = this.moveAtCenter.bind(this)
    document.addEventListener('mousemove', this.moveAtCenter)
  }
  
  removeMoveItem(event) {
    document.removeEventListener('mousemove', this.moveAtCenter)
    this.toTurnOnUserSelect()
  }

  moveAtCenter(event) {
    this.toTurnOffUserSelect()
    this.dividingOnSteps(event)


    // Positions
    let centerOfEl: number = event.pageX - this.view.options.pointSize / 2
    let offsetLeftFIRST: number = this.view.$line.offsetLeft - this.view.options.pointSize / 2
    let offsetLeftSECOND: number = this.view.$line.offsetLeft - this.view.options.pointSize / 2 + this.view.$line.offsetWidth

    // Checking, if the cursor is behind the slider on the right or left
    let isOutsideLeft: boolean = centerOfEl < offsetLeftFIRST
    let isOutsideRight: boolean = centerOfEl > offsetLeftSECOND

    if (!isOutsideLeft && !isOutsideRight) {
      this.view.$points[0].style.marginLeft = this.newPosition - this.view.options.pointSize / 2 + 'px';
    } else if (isOutsideLeft) {
      this.view.$points[0].style.marginLeft = - this.view.options.pointSize / 2 + 'px';
    } else {
      this.view.$points[0].style.marginLeft = this.view.$line.offsetWidth - this.view.options.pointSize / 2 + 'px';
    }
    
    this.toUpdateView()
    this.view.update(SVPoint, 'rewriting text value')
  }

  toTurnOffUserSelect() {
    document.body.style.userSelect = 'none'
  }

  toTurnOnUserSelect() {
    document.body.style.userSelect = 'auto'
  }

  dividingOnSteps(event) {
    let countSteps: number = this.view.range / this.view.options.step
    let sizeOfOneStep: number = this.view.$line.offsetWidth / Math.ceil(countSteps)
    let currentPosition: number = event.pageX - this.view.$line.offsetLeft
    

    if (Math.round(currentPosition / sizeOfOneStep) * sizeOfOneStep != this.newPosition) {
      this.newPosition = Math.round(currentPosition / sizeOfOneStep) * sizeOfOneStep
      
      let isInner: boolean = ((this.newPosition - this.view.options.pointSize / 2) < this.view.$line.offsetWidth) && (this.newPosition > 0)
      
      if (isInner) {
        this.view.stepValue = this.view.options.min + (Math.round(currentPosition / sizeOfOneStep) * this.view.options.step)
      } else if (this.newPosition - this.view.options.pointSize / 2 >= this.view.$line.offsetWidth) {
        this.view.stepValue = this.view.options.max
      } else if (this.newPosition - this.view.options.pointSize / 2  < 0) {
        this.view.stepValue = this.view.options.min
      }
    }
  }

  toUpdateView() {
    this.view.currentX = Number(this.view.$points[0].style.marginLeft.slice(0, -2)) + this.view.options.pointSize / 2
    this.view.currentLineWidth = this.view.$line.offsetWidth
  }
}

export default SVPoint