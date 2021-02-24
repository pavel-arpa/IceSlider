import View from './components/slider/ice-slider_view'
import Model from './components/slider/ice-slider_model'
import Presenter from './components/slider/ice-slider_presenter'

document.body.innerHTML = '<div id="ice-slider"></div>'

const _model = new Model()
const _view = new View()
const options: Options = {
  id: 'ice-slider',
  pointSize: 16,
  lineHeight: 6,
  min: 0,
  max: 150,
  step: 15,
  floatingValue: true
}



describe('===== VIEW: =====', () => {
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
    _view.initComp()

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
    _view.initComp()
    _view.initProps()
    _view.initSubViews()
    
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





// ==\= VALUES =/==
const event = {
  pageX: 130
}

Object.defineProperty(_view.$line, 'offsetWidth', {value: 150})
Object.defineProperty(_view.$line, 'offsetLeft', {value: 100})
_view.$points[0].style.marginLeft = '20px'
let prop: number = 0.5




describe('===== SVPoint: =====', () => {

  describe('Dividing on steps', () => {
    _view.SVPoint.dividingOnSteps(event.pageX)
  
    test('correctly step size', () => {
      expect(_view.stepValue).toBe(30)
    })
  })

  describe('Updating values', () => {
    _view.SVPoint.toUpdateCurrentX()
  
    test('current X', () => {
      expect(_view.currentX).toBe(28)
    })
  })
})


describe('===== SVLine: =====', () => {

  describe('Updating values', () => {
    test('current X', () => {
      _view.SVLine.toUpdateCurrentX(prop)
      expect(_view.currentX).toBe(75)
    })
    test('current Line Width', () => {
      _view.SVLine.toUpdateLineWidth()
      expect(_view.currentLineWidth).toBe(150)
    })
  })

})



describe('===== SVText: =====', () => {

  describe('to write current step position', () => {
    test('current X', () => {
      _view.SVText.toWriteInDOM()
      expect(Number(_view.$value.textContent)).toBe(30)
    })
  })

})
