class SVLine {
  view: ViewT;
  length: number;

  constructor(view) {
    this.view = view
  }
  
  start() {
    this.setupOptions()
    this.resizeLine()
  }

  setupOptions() {
    if(this.view.options.vertical) {
      this.view.$line.style.width = this.view.options.lineHeight + 'px'
      this.view.$line.style.height = this.view.options.length + 'px'
    } else {
      this.view.$line.style.height = this.view.options.lineHeight + 'px'
    }
    this.view.$line.style.borderRadius = this.view.options.pointSize + 'px'
  }

  resizeLine() {
    this.resizeLineHandler = this.resizeLineHandler.bind(this)
    window.addEventListener('resize', this.resizeLineHandler)
  }

  resizeLineHandler() {
    this.toUpdateVar()
    // Saving relative position of point when line is changing
    let proportion: number = this.view.position / this.view.currentLineWidth
    this.pointOffset = proportion * this.length - this.view.options.pointSize / 2 + 'px'

    this.toUpdateCurrentX(proportion)
    this.toUpdateLineWidth()
  }

  toUpdateVar() {
    if (this.view.options.vertical) {
      this.length = this.view.$line.offsetHeight
    } else {
      this.length = this.view.$line.offsetWidth
    }
  }

  toUpdateLineWidth() {
    this.toUpdateVar()
    this.view.currentLineWidth = this.length
    // if (this.view.options.vertical) {
    //   this.view.currentLineWidth = this.view.$line.offsetHeight
    // } else {
    //   this.view.currentLineWidth = this.view.$line.offsetWidth
    // }
  }
  
  toUpdateCurrentX(proportion) {
    this.view.position = proportion * this.length
    // if (this.view.options.vertical) {
    //   this.view.currentX = proportion * this.view.$line.offsetHeight
    // } else {
    //   this.view.currentX = proportion * this.view.$line.offsetWidth
    // }
  }

  set pointOffset(value: string) {
    if (this.view.options.vertical) {
      this.view.$points[0].style.marginTop = value
    } else {
      this.view.$points[0].style.marginLeft = value
    }
  }
}



export default SVLine