import SVPoint from './subviews/ice-slider_sv-point'
import SVFloatingValue from './subviews/ice-slider_sv-floating-value'
import SVRange from './subviews/ice-slider_sv-range'
import SVLine from './subviews/ice-slider_sv-line'
import SVText from './subviews/ice-slider_sv-text'


// ========== MAIN VIEW ==========
class View implements ViewT {
  options: Options;
  range: number;

  $el: HTMLElement;
  $points: NodeListOf<HTMLElement>;
  $range: HTMLElement;
  $line: HTMLElement;
  $floatingValue: HTMLElement;
  $value: HTMLElement;

  SVPoint: SVPoint;
  SVFloatingValue: SVFloatingValue;
  SVRange: SVRange;
  SVLine: SVLine;
  SVText: SVText;

  position: number;
  currentLineWidth: number;
  stepValue: number;
  // =============

  setOptions(options: Options) {
    this.options = options
    this.range = options.max - options.min
  }

  
  render(template) {
    document.getElementById(this.options.id).innerHTML = template
  }
  

  initComp() {
    this.$el = document.getElementById(this.options.id)
    this.$points = this.$el.querySelectorAll('.ice-slider__point')
    this.$range = this.$el.querySelector('.ice-slider__range')
    this.$line = this.$el.querySelector('.ice-slider__line')
    this.$floatingValue = this.$el.querySelector('.ice-slider__floating-value')
    this.$value = this.$el.querySelector('.ice-slider__value')

    if (this.options.vertical) {
      this.$el.classList.add('ice-slider_vertical')
      this.$el.querySelector('.ice-slider__slider').classList.add('ice-slider__slider_vertical')
      this.$el.querySelector('.ice-slider__text-wrapper').classList.add('ice-slider__text-wrapper_vertical')
    } else {
      this.$el.classList.add('ice-slider_horizontal')
      this.$el.querySelector('.ice-slider__slider').classList.add('ice-slider__slider_horizontal')
      this.$el.querySelector('.ice-slider__text-wrapper').classList.add('ice-slider__text-wrapper_horizontal')
    }
  }


  initProps() {
    if(this.options.vertical) {
      this.currentLineWidth = this.$line.offsetHeight
    } else {
      this.currentLineWidth = this.$line.offsetWidth
    }
    this.position = 0
    this.stepValue = 0
  }


  initSubViews() {
    this.SVPoint = new SVPoint(this)
    this.options.floatingValue === true ? this.SVFloatingValue = new SVFloatingValue(this) : true
    this.SVRange = new SVRange(this)
    this.SVLine = new SVLine(this)
    this.SVText = new SVText(this)

    this.SVPoint.start()
    this.options.floatingValue === true ? this.SVFloatingValue.start() : true
    this.SVRange.start()
    this.SVLine.start()
    this.SVText.start()
  }


  // MEDIATOR PATTERN
  update(sender: object, event) {
    if(event == 'rewriting text value') {
      this.SVText.toWriteInDOM()
    }
    if(event == 'update line width') {
      this.SVLine.toUpdateLineWidth()
    }
  }
}





// ========== EXPORT ==========
export default View