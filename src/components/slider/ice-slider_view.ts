// =========== TYPES ===========
interface Options extends Object {
  id: string;
  pointSize: number;
  lineHeight: number;
}





// ========== SUBVIEWS ==========
class SVPoint {
  view: View;
  currentX: number;
  currentLineWidth: number;

  constructor(view) {
    this.view = view
    this.currentX = 0
    this.currentLineWidth = this.view.$line.offsetWidth
  }

  start() {
    this.setupOptions()
    this.toDragHorizon()
  }
  
  setupOptions() {
    this.view.$points[0].style.width = this.view.options.pointSize + 'px'
    this.view.$points[0].style.height = this.view.options.pointSize + 'px'
    this.view.$points[0].style.marginLeft = - this.view.options.pointSize / 2 + 'px'
  }

  toDragHorizon() {
    this.moveItem = this.moveItem.bind(this)
    this.removeMoveItem = this.removeMoveItem.bind(this)

    this.view.$points[0].addEventListener('mousedown', this.moveItem)
    document.addEventListener('mouseup', this.removeMoveItem)
  }
  
  moveItem(event) {
    this.moveAtCenter(event)
    this.moveAtCenter = this.moveAtCenter.bind(this)
    document.addEventListener('mousemove', this.moveAtCenter)
  }
  
  removeMoveItem(event) {
    document.removeEventListener('mousemove', this.moveAtCenter)
    this.toTurnOnUserSelect()
  }

  moveAtCenter(event) {
    this.toTurnOffUserSelect()

    let centerOfEl: number = event.pageX - this.view.options.pointSize / 2
    let offsetLeftFIRST: number = this.view.$line.offsetLeft - this.view.options.pointSize / 2
    let offsetLeftSECOND: number = this.view.$line.offsetLeft - this.view.options.pointSize / 2 + this.view.$line.offsetWidth

    // Checking, if the cursor is behind the slider on the right or left
    let isOutsideLeft: boolean = centerOfEl < offsetLeftFIRST
    let isOutsideRight: boolean = centerOfEl > offsetLeftSECOND

    if (!isOutsideLeft && !isOutsideRight) {
      this.view.$points[0].style.marginLeft = event.pageX - this.view.$line.offsetLeft - this.view.options.pointSize / 2 + 'px';
    } else if (isOutsideLeft) {
      this.view.$points[0].style.marginLeft = - this.view.options.pointSize / 2 + 'px';
    } else {
      this.view.$points[0].style.marginLeft = this.view.$line.offsetWidth - this.view.options.pointSize / 2 + 'px';
    }
    
    this.currentX = Number(this.view.$points[0].style.marginLeft.slice(0, -2)) + this.view.options.pointSize / 2
    this.currentLineWidth = this.view.$line.offsetWidth
  }

  toTurnOffUserSelect() {
    document.body.style.userSelect = 'none'
  }

  toTurnOnUserSelect() {
    document.body.style.userSelect = 'auto'
  }
}



class SVFloatingValue {
  view: View;

  constructor(view) {
    this.view = view
  }
  
  start() {
    this.toFloat()
  }

  toFloat () {
    this.removeCurrentValueHandler = this.removeCurrentValueHandler.bind(this)
    this.currentValue = this.currentValue.bind(this)
    
    this.view.$points[0].addEventListener('mousedown', this.currentValue)
    document.addEventListener('mouseup', this.removeCurrentValueHandler)
  }

  currentValue() {
    this.currentValueHandler = this.currentValueHandler.bind(this)
    document.addEventListener('mousemove', this.currentValueHandler)
  }

  currentValueHandler() {
    this.view.$floatingValue.style.opacity = '1'
    this.view.$floatingValue.style.left = 'auto'
    this.view.$floatingValue.style.marginLeft = this.view.SVPoint.currentX - this.view.$floatingValue.offsetWidth / 2 + 'px'
    this.view.$floatingValue.firstElementChild.textContent = String(this.view.SVPoint.currentX)
  }

  removeCurrentValueHandler() {
    this.view.$floatingValue.style.opacity = '0'
    setTimeout(() => {
      this.view.$floatingValue.style.left = '-2000px'
    }, 300)
    document.removeEventListener('mousemove', this.currentValueHandler)
  }
}



class SVRange {
  view: View;

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
      this.view.$range.style.width = this.view.SVPoint.currentX + 'px'
    })
    observer.observe(this.view.$points[0], {
      attributes: true
    })
  }


}



class SVLine {
  view: View;

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
    let proportion: number = this.view.SVPoint.currentX / this.view.SVPoint.currentLineWidth
    this.view.$points[0].style.marginLeft = proportion * this.view.$line.offsetWidth - this.view.options.pointSize / 2 + 'px'

    // Update values
    this.view.SVPoint.currentX = proportion * this.view.$line.offsetWidth
    this.view.SVPoint.currentLineWidth = this.view.$line.offsetWidth

  }
}






// ========== MAIN VIEW ==========
class View {
  options: Options;
  $el: HTMLElement;
  $points: NodeListOf<HTMLElement>;
  $range: HTMLElement;
  $line: HTMLElement;
  $floatingValue: HTMLElement;

  SVPoint: SVPoint;
  SVFloatingValue: SVFloatingValue;
  SVRange: SVRange;
  SVLine: SVLine;
  // =============

  setOptions(options: Options) {
    this.options = options
    console.log('Options setup:   succes')
  }
  
  render(template) {
    document.getElementById(this.options.id).innerHTML = template
    console.log('Template uploading:   succes')
  }

  initProps() {
    this.$el = document.getElementById(this.options.id)
    this.$points = this.$el.querySelectorAll('.ice-slider__point')
    this.$range = this.$el.querySelector('.ice-slider__range')
    this.$line = this.$el.querySelector('.ice-slider__line')
    this.$floatingValue = this.$el.querySelector('.ice-slider__floating-value')
    console.log('Properties init:   succes')
  }

  initComponents() {
    this.SVPoint = new SVPoint(this)
    this.SVFloatingValue = new SVFloatingValue(this)
    this.SVRange = new SVRange(this)
    this.SVLine = new SVLine(this)

    this.SVPoint.start()
    this.SVFloatingValue.start()
    this.SVRange.start()
    this.SVLine.start()

    console.log('Components init:   succes')
  }
}





// ========== EXPORT ==========
module.exports = { View }