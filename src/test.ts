const _View = require('./components/slider/slider-view.ts')

describe('VIEW: ====================', () => {
  const view = new _View('item')

  
  describe('Main HTMLElement "$el"', () => {
    test('should be defined', () => {
      expect(view.$el).toBeDefined()
    })
  })
  describe('toDragHorizon', () => {
    test('should be defined', () => {
      expect(view.toDragHorizon).toBeDefined()
    })
  })
  describe('mousemoveHandler', () => {
    test('should be defined', () => {
      expect(view.mousemoveHandler).toBeDefined()
    })
  })
})
