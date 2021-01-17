interface Options {
  // sliderWidth: number;
}

export class View {
  options: Options;
  $el: HTMLElement;
  $points: NodeListOf<HTMLElement>;
  $lineBg: HTMLElement;

  constructor(id: string, options: Options) {
    this.$el = document.getElementById(id)
    this.$points = this.$el.querySelectorAll('.ice-slider__point')
    this.$lineBg = this.$el.querySelector('.ice-slider__line-bg')

    this.options = options;
    
    // CALL METHODS
    if(this.$el !== null) {
      this.$points[0].ondragstart = () => false // turn off browser d'n'd
      this.toDragHorizon()
    }
  }

  toDragHorizon() {
    this.moveItem = this.moveItem.bind(this)
    this.removeMoveItem = this.removeMoveItem.bind(this)

    this.$points[0].addEventListener('mousedown', this.moveItem)
    document.addEventListener('mouseup', this.removeMoveItem)
  }

  moveItem(event) {
    this.moveAtCenter(event)
    this.moveAtCenter = this.moveAtCenter.bind(this)
    document.addEventListener('mousemove', this.moveAtCenter)
  }

  moveAtCenter(event) {  
    let centerOfElemUnderCursor: number = event.pageX - this.$points[0].offsetWidth / 2
    let offsetLeftSliderFIRST: number = this.$lineBg.offsetLeft - this.$points[0].offsetWidth / 2
    let offsetLeftSliderSECOND: number = this.$lineBg.offsetLeft - this.$points[0].offsetWidth / 2 + this.$lineBg.offsetWidth

    let isOutsideLeft: boolean = centerOfElemUnderCursor < offsetLeftSliderFIRST
    let isOutsideRight: boolean = centerOfElemUnderCursor > offsetLeftSliderSECOND

    if (!isOutsideLeft && !isOutsideRight) {
      this.$points[0].style.left = centerOfElemUnderCursor + 'px';
    } else if (isOutsideLeft) {
      this.$points[0].style.left = offsetLeftSliderFIRST + 'px';
    } else {
      this.$points[0].style.left = offsetLeftSliderSECOND + 'px';
    }
  }

  removeMoveItem(event) {
    document.removeEventListener('mousemove', this.moveAtCenter)
  }
}


module.exports = View