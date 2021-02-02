import View from './components/slider/ice-slider_view'
import Model from './components/slider/ice-slider_model'
import Presenter from './components/slider/ice-slider_presenter'

document.body.innerHTML = '<div id="ice-slider"></div>'

const _model = new Model()
const _view = new View()


describe('VIEW: ====================', () => {
  const basicTemplate = `
  <div class="ice-slider__text-wrapper">
    <h3 class="ice-slider__title" data-type="is__title">Range slider</h3>
    <span class="ice-slider__value" data-type="is__current-val">15000</span></div>
  <div class="ice-slider__slider">
    <div class="ice-slider__point"></div>
    <div class="ice-slider__floating-value">
      <span>100</span>
    </div>
    <div class="ice-slider__range"></div>
    <div class="ice-slider__line"></div>
  </div>
  `
  const options: Options = {
    id: 'ice-slider',
    pointSize: 16,
    lineHeight: 6
  }
  
  describe('Setting up options', () => {

    test('setOptions should be defined', () => {
      expect(_view.setOptions).toBeDefined()
    })

    test('options are equal to the passed ones', () => {
      _view.setOptions(options)
      expect(_view.options).toBe(options)
    })
  })



  describe('Rendring by basic template', () => {
    test('basic template was installed', () => {
      _view.render(_model.template)
      expect(document.getElementById(_view.options.id).innerHTML).toBe(_model.template)
    })
  })



  describe('Main HTMLElements initialization', () => {
    _view.setOptions(options)
    _view.initProps()

    test('$el', () => {
      expect(_view.$el).toBeDefined()
    })
    test('$points', () => {
      expect(_view.$points).toBeDefined()
    })
    test('$range', () => {
      expect(_view.$range).toBeDefined()
    })
    test('$line', () => {
      expect(_view.$line).toBeDefined()
    })
    test('$floatingValue', () => {
      expect(_view.$floatingValue).toBeDefined()
    })
  })



  describe('Set up components', () => {
    _view.setOptions(options)
    _view.render(_model.template)
    _view.initProps()
    _view.initComponents()
    
    test('SVPoint', () => {
      expect(_view.SVPoint).toBeDefined()
    })
    test('SVFloatingValue', () => {
      expect(_view.SVFloatingValue).toBeDefined()
    })
    test('SVRange', () => {
      expect(_view.SVRange).toBeDefined()
    })
    test('SVLine', () => {
      expect(_view.SVLine).toBeDefined()
    })
  })
})
