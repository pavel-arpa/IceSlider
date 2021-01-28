// =========== TYPES ===========
interface Options extends Object {
  id: string;
  pointSize: number;
}





// ========== SUBVIEWS ==========
class SVPoint {
  view: View;

  constructor(view) {
    this.view = view
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
  }

  moveAtCenter(event) {  
    let centerOfEl: number = event.pageX - this.view.$points[0].offsetWidth / 2
    let offsetLeftFIRST: number = this.view.$line.offsetLeft - this.view.$points[0].offsetWidth / 2
    let offsetLeftSECOND: number = this.view.$line.offsetLeft - this.view.$points[0].offsetWidth / 2 + this.view.$line.offsetWidth

    // Checking, if the cursor is behind the slider on the right or left
    let isOutsideLeft: boolean = centerOfEl < offsetLeftFIRST
    let isOutsideRight: boolean = centerOfEl > offsetLeftSECOND

    if (!isOutsideLeft && !isOutsideRight) {
      this.view.$points[0].style.marginLeft = event.pageX - this.view.$line.offsetLeft - this.view.$points[0].offsetWidth / 2 + 'px';
    } else if (isOutsideLeft) {
      this.view.$points[0].style.marginLeft = - this.view.$points[0].offsetWidth / 2 + 'px';
    } else {
      this.view.$points[0].style.marginLeft = this.view.$line.offsetWidth - this.view.$points[0].offsetWidth / 2 + 'px';
    }
    
    // this.marginPoint = Number(this.$points[0].style.marginLeft.slice(0, -2)) + this.$points[0].offsetWidth / 2
    // this.prevLineWidth = this.$line.offsetWidth
  }


  // get getMarginPoint() {
  //   return this.marginPoint
  // }
}



class SVRange {
  constructor(view) {
    
  }
  
  start() {
    
  }
}



class SVLine {
  constructor(view) {
    
  }
  
  start() {
    
  }
}






// ========== MAIN VIEW ==========
class View {
  options: Options;
  $el: HTMLElement;
  $points: NodeListOf<HTMLElement>;
  $range: HTMLElement;
  $line: HTMLElement;

  SVPoint: SVPoint;
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
    console.log('Properties init:   succes')
  }

  initComponents() {
    this.SVPoint = new SVPoint(this)
    this.SVRange = new SVRange(this)
    this.SVLine = new SVLine(this)

    this.SVPoint.start()
    this.SVRange.start()
    this.SVLine.start()

    console.log('Components init:   succes')
  }
}





// ========== EXPORT ==========
module.exports = { View }