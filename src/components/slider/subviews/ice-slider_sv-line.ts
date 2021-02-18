class SVLine {
  view: ViewT;

  constructor(view) {
    this.view = view
  }
  
  start() {
    this.setupOptions()
    this.resizeLine()
  }

  setupOptions() {
    this.view.$line.style.height = this.view.options.lineHeight + 'px'
    this.view.$line.style.borderRadius = this.view.options.pointSize + 'px'
  }

  resizeLine() {
    this.resizeLineHandler = this.resizeLineHandler.bind(this)
    window.addEventListener('resize', this.resizeLineHandler)
  }

  resizeLineHandler() {
    // Saving relative position of point when line is changing
    let proportion: number = this.view.currentX / this.view.currentLineWidth
    this.view.$points[0].style.marginLeft = proportion * this.view.$line.offsetWidth - this.view.options.pointSize / 2 + 'px'

    this.toUpdateView(proportion)
  }

  toUpdateView(proportion) {
    this.view.currentX = proportion * this.view.$line.offsetWidth
    this.view.currentLineWidth = this.view.$line.offsetWidth
  }
}



export default SVLine