export class View {
  $el: HTMLElement
  constructor(sid: string) {
    this.$el = document.getElementById(sid)
    // CALL METHODS
    if(this.$el !== null) {
      this.$el.ondragstart = function() { // turn off browser d'n'd
        return false;
      }
      this.toDragHorizon()
    }
  }

  toDragHorizon() {
    this.moveItem = this.moveItem.bind(this)
    this.$el.addEventListener('mousedown', this.moveItem)
  }
  moveItem(event) {
    this.moveAtCenter(event)
    this.moveAtCenter = this.moveAtCenter.bind(this)
    document.addEventListener('mousemove', this.moveAtCenter)
  }
  moveAtCenter(event) {
    let centerOfElemUnderCursor: number = event.pageX - this.$el.offsetWidth
    this.$el.style.left = centerOfElemUnderCursor / 2 + 'px';
  }
}


module.exports = View