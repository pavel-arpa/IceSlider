class SVFloatingValue {
  view: ViewT;

  constructor(view) {
    this.view = view
  }
  
  
  start() {
    this.toFloat()
    if (this.view.options.vertical) {
      this.view.$floatingValue.style.marginLeft = this.view.options.pointSize + 50 + 'px'
    } else {
      this.view.$floatingValue.style.marginBottom = this.view.options.pointSize + 30 + 'px'
    }
  }


  toFloat () {
    this.removeCurrentValueHandler = this.removeCurrentValueHandler.bind(this)
    this.currentValue = this.currentValue.bind(this)
    
    this.view.$points[0].addEventListener('mousedown', this.currentValue)
    document.addEventListener('mouseup', this.removeCurrentValueHandler)
    // TOUCHES
    this.view.$points[0].addEventListener('touchstart', this.currentValue)
    document.addEventListener('touchend', this.removeCurrentValueHandler)
  }


  currentValue() {
    this.currentValueHandler = this.currentValueHandler.bind(this)

    document.addEventListener('mousemove', this.currentValueHandler)
    // TOUCHES
    document.addEventListener('touchmove', this.currentValueHandler)
  }


  currentValueHandler() {
    this.view.$floatingValue.style.opacity = '1'
    this.view.$floatingValue.style.left = 'auto'
    this.floatingValueOffset(this.view.position)
    this.view.$floatingValue.firstElementChild.textContent = String(this.view.stepValue)
  }


  floatingValueOffset(value) {
    if (this.view.options.vertical) {
      this.view.$floatingValue.style.marginTop = value - this.view.$floatingValue.offsetWidth / 2 + 'px'
    } else {
      this.view.$floatingValue.style.marginLeft = value - this.view.$floatingValue.offsetWidth / 2 + 'px'
    }
  }


  removeCurrentValueHandler() {
    this.view.$floatingValue.style.opacity = '0'
    setTimeout(() => {
      this.view.$floatingValue.style.left = '-2000px'
    }, 300)
    document.removeEventListener('mousemove', this.currentValueHandler)
    // TOUCHES
    document.removeEventListener('touchmove', this.currentValueHandler)
  }


  delete() {
    document.removeEventListener('mousemove', this.currentValueHandler)
    this.view.$points[0].removeEventListener('mousedown', this.currentValue)
    document.removeEventListener('mouseup', this.removeCurrentValueHandler)
    // TOUCHES
    document.removeEventListener('touchmove', this.currentValueHandler)
    this.view.$points[0].removeEventListener('touchstart', this.currentValue)
    document.removeEventListener('touchend', this.removeCurrentValueHandler)
  }
}


export default SVFloatingValue