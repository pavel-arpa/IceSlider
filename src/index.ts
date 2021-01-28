const { Model } = require('./components/slider/ice-slider_model')
const { View } = require('./components/slider/ice-slider_view')
const { Presenter } = require('./components/slider/ice-slider_presenter')


import './styles/null.scss'
import './styles/montserrat.scss'
import './styles/fonts.scss'


// IMPORTS
function importAll(resolve: any): any {
  resolve.keys().forEach(resolve);
}
importAll(require.context('../src/components', true, /\.ts$|\.scss$/));


(function($) {
  $.fn.extend({
    iceSlider: function(options: Options) {
      const model = new Model()
      const view = new View()
      const presenter = new Presenter(view, model, options)
      console.log('--> The plugin was installed successfully');
      
  }})
}(jQuery))

$('#ice-slider').iceSlider({
  id: 'ice-slider',
  pointSize: 16
})