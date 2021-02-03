// =========== MODEL ===========
class Model {
  constructor() {
  }

  initData(options): Options {
    return options
  }

  get template(): string {
    return `
    <div class="ice-slider__text-wrapper">
      <h3 class="ice-slider__title" data-type="is__title">Range slider</h3>
      <span class="ice-slider__value" data-type="is__current-val"></span></div>
    <div class="ice-slider__slider">
      <div class="ice-slider__point"></div>
      <div class="ice-slider__floating-value">
        <span></span>
      </div>
      <div class="ice-slider__range"></div>
      <div class="ice-slider__line"></div>
    </div>
    `
  }
}





// =========== EXPORT ===========
export default Model
