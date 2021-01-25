function getTemplate(): string {
  return `
  <div class="ice-slider__text-wrapper">
    <h3 class="ice-slider__title" data-type="is__title">Range slider</h3>
    <span class="ice-slider__value" data-type="is__current-val">15000</span></div>
  <div class="ice-slider__slider"><div class="ice-slider__point">
    </div><div class="ice-slider__range"></div>
    <div class="ice-slider__line-bg"></div>
  </div>
  `
}

interface OptionsPoint {
  pointSize: number;
}

export class ViewPoint {
  options: OptionsPoint;
  $el: HTMLElement;
  $points: NodeListOf<HTMLElement>;
  $lineBg: HTMLElement;

  constructor(id: string, options: OptionsPoint) {
    // PROPERTIES
    this.options = options;
    this.$el = document.getElementById(id)
    this.render()
    this.$points = this.$el.querySelectorAll('.ice-slider__point')
    this.$lineBg = this.$el.querySelector('.ice-slider__line-bg')
    
    // CALL METHODS
    if(this.$el !== null) {
      this.$points[0].ondragstart = () => false // turn off browser d'n'd
      this.setup()
      this.toDragHorizon()
      console.log(document);

      // LISTENERS
      this.resetPointSize()
    }
  }

  private render() {
    this.$el.innerHTML = getTemplate()
  }

  private setup() {
    this.$points[0].style.width = this.$points[0].style.height = this.options.pointSize + 'px'
    this.$points[0].style.left = this.$points[0].offsetLeft - this.options.pointSize / 2 + 'px'
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

  resizeWindowHadler(event) {
    let pointOffsetLeft: number = this.$points[0].offsetLeft - this.$points[0].offsetWidth / 2
    let lineBgOffsetLeft: number = this.$lineBg.offsetLeft
    let difference: number = pointOffsetLeft - lineBgOffsetLeft

    let lineBgWidth: number = this.$lineBg.offsetWidth
    // let relativePosition: number = 



    // console.log(difference)
    
  }

  resetPointSize() {
    this.resizeWindowHadler = this.resizeWindowHadler.bind(this)
    window.addEventListener('resize', this.resizeWindowHadler)
  }

}



// =====================================================================
export class ViewRange {
  $el: HTMLElement;

  constructor(id: string) {
    this.$el = document.getElementById(id)

  }
}







module.exports = { ViewPoint, ViewRange }
