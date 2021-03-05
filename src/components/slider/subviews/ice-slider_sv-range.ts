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
    if(this.view.options.vertical) {
      this.view.$range.style.width = this.view.options.lineHeight + 'px'
    } else {
      this.view.$range.style.height = this.view.options.lineHeight + 'px'
    }
    this.view.$range.style.borderRadius = this.view.options.pointSize + 'px'
  }


  rangeBG() {
    if(this.view.options.vertical) {
      let observer = new MutationObserver(() => {
        this.view.$range.style.height = this.view.position + 'px'
      })
      observer.observe(this.view.$points[0], {
        attributes: true
      })
    } else {
      let observer = new MutationObserver(() => {
        this.view.$range.style.width = this.view.position + 'px'
      })
      observer.observe(this.view.$points[0], {
        attributes: true
      })
    }
  }


}


export default SVRange