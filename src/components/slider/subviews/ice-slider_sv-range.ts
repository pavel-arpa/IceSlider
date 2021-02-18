class SVRange {
  view: ViewT;

  constructor(view) {
    this.view = view
  }
  
  start() {
    this.setupOptions()
    this.rangeBG()
  }

  setupOptions() {
    this.view.$range.style.height = this.view.options.lineHeight + 'px'
    this.view.$range.style.borderRadius = this.view.options.pointSize + 'px'
  }

  rangeBG() {
    let observer = new MutationObserver(() => {
      this.view.$range.style.width = this.view.currentX + 'px'
    })
    observer.observe(this.view.$points[0], {
      attributes: true
    })
  }


}


export default SVRange