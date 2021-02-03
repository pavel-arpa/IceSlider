// IMPORTS
import Model from './components/slider/ice-slider_model'
import View from './components/slider/ice-slider_view'
import Presenter from './components/slider/ice-slider_presenter'

import './styles/null.scss'
import './styles/montserrat.scss'
import './styles/fonts.scss'

function importAll(resolve: any): any {
  resolve.keys().forEach(resolve);
}
importAll(require.context('../src/components', true, /\.ts$|\.scss$/));



// ASSIGMENTS
(function($) {
  $.fn.extend({
    iceSlider: function(options: Options) {
      const model = new Model()
      const view = new View()
      const presenter = new Presenter(view, model, options)
      console.log('--> The plugin was installed successfully');
      
  }})
}(jQuery))



// INIT
$('#ice-slider').iceSlider({
  id: 'ice-slider',
  pointSize: 16,
  lineHeight: 6,
  min: 500,
  max: 5000,
  step: 50
})