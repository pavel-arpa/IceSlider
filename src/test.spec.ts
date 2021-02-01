// const { testView } = require('./components/slider/ice-slider_view.ts')



describe('VIEW point: ====================', () => {
  document.body.innerHTML = '<div id="ice-slider"></div>'

  const _model = new Model()
  const _view = new View()
  // const _presenter = new Presenter(_view, _model, {
  //   id: 'ice-slider',
  //   pointSize: 16
  // })
  
  describe('Main HTMLElement "$el"', () => {
    test('should be defined', () => {
      // expect(_view).toBe('16px')
    })
  })

  // describe('Setting up styles', () => {
  //   test('size of point', () => {
  //     expect(_vP.$el).toBeDefined()
  //   })
  // })

  // describe('toDragHorizon', () => {
  //   test('should be defined', () => {
  //     expect(_vP.toDragHorizon).toBeDefined()
  //   })
  // })

  // describe('moveItem', () => {
  //   test('should be defined', () => {
  //     expect(_vP.moveItem).toBeDefined()
  //   })
  // })

  // describe('moveAtCenter', () => {
  //   test('should be defined', () => {
  //     expect(_vP.moveItem).toBeDefined()
  //   })
  // })
})
