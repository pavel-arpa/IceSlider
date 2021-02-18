class SVText {
  view: ViewT;

  constructor(view) {
    this.view = view
  }

  start() {
    this.view.$value.textContent = String(this.view.options.min)
  }

  toWriteInDOM() {
    this.view.$value.textContent = String(this.view.stepValue)
  }
}


export default SVText