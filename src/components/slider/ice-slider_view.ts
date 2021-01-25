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

export class ViewMain {
  $el: HTMLElement;
  $points: NodeListOf<HTMLElement>;
  $line: HTMLElement;

  constructor(id: string) {
    // PROPERTIES
    this.$el = document.getElementById(id)
    this.$el.querySelector('.ice-slider__slider') != undefined ? 0 : this.render()
    this.$points = this.$el.querySelectorAll('.ice-slider__point')
    this.$line = this.$el.querySelector('.ice-slider__line-bg')
    
  }
  protected render() {
    this.$el.innerHTML = getTemplate()
  }
}





// ===================================================================================
export class ViewPoint extends ViewMain {
  options: OptionsPoint;

  constructor(id: string, options: OptionsPoint) {
    super(id)
    this.options = options
    
    // CALL METHODS
    if(this.$el !== null) {
      this.$points[0].ondragstart = () => false // turn off browser d'n'd
      this.setup()
      this.toDragHorizon()
    }
  }

  private setup() {
    this.$points[0].style.width = this.$points[0].style.height = this.options.pointSize + 'px'
    this.$points[0].style.marginLeft = - this.options.pointSize / 2 + 'px'
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
    let offsetLeftSliderFIRST: number = this.$line.offsetLeft - this.$points[0].offsetWidth / 2
    let offsetLeftSliderSECOND: number = this.$line.offsetLeft - this.$points[0].offsetWidth / 2 + this.$line.offsetWidth

    let isOutsideLeft: boolean = centerOfElemUnderCursor < offsetLeftSliderFIRST
    let isOutsideRight: boolean = centerOfElemUnderCursor > offsetLeftSliderSECOND

    if (!isOutsideLeft && !isOutsideRight) {
      this.$points[0].style.marginLeft = event.pageX - this.$line.offsetLeft - this.$points[0].offsetWidth / 2 + 'px';
    } else if (isOutsideLeft) {
      this.$points[0].style.marginLeft = - this.$points[0].offsetWidth / 2 + 'px';
    } else {
      this.$points[0].style.marginLeft = this.$line.offsetWidth - this.$points[0].offsetWidth / 2 + 'px';
    }
    
  }

  removeMoveItem(event) {
    document.removeEventListener('mousemove', this.moveAtCenter)
  }
}





// ===================================================================================
export class ViewLine extends ViewMain {
  constructor(id: string) {
    super(id)
    
    // CALL METHODS
    if(this.$el !== null) {
      this.resizeLine()
    }
  }
  
  resizeLine() {
    this.resizeLineHandler = this.resizeLineHandler.bind(this)
    window.addEventListener('resize', this.resizeLineHandler)
  }

  resizeLineHandler() {
    // let lineWidth = this.$line.offsetWidth
    // let marginPoint = this.$points[0].style.marginLeft
    // console.log(marginPoint);
    
  }
}





// =================================================================================
class ViewRange {
  constructor(id: string) {
  }
}




// =================================================================================
class View {
  point: object;
  line: object;
  range: object;

  constructor(id: string, options: OptionsPoint) {
    this.point = new ViewPoint(id, options)
    this.line = new ViewLine(id)
  }
}


module.exports = { View, ViewPoint, ViewRange, ViewLine }