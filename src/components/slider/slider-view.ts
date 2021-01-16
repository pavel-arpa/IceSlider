export class View {
  $el: HTMLElement
  constructor(sid: string) {
    this.$el = document.getElementById(sid)
    // CALL METHODS
    if(this.$el !== null) {
      this.toDragHorizon()
    }
  }
  private toDragHorizon() {
    this.mousemoveHandler = this.mousemoveHandler.bind(this)
    this.$el.addEventListener('mousedown', this.mousemoveHandler);
  }
  private mousemoveHandler(event) {
    console.log(1);
  }
}


module.exports = View