declare global {
  interface Window {
      view:any;
  }
}


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
window.view = [];

(function($) {
  let opt: Options = {
    id: 'ice-slider',
    pointSize: 16,
    lineHeight: 6,
    min: 700,
    max: 4900,
    step: 140,
    floatingValue: true,
    vertical: false,
  }
  $.fn.extend({
    iceSlider: function(options: Options) {
      const model = new Model()
      const view = new View()
      window.view.push(view);
      const presenter = new Presenter(view, model, options)
      console.log('--> The plugin was installed successfully');
      
  }})
}(jQuery))



// INIT
$('#ice-slider').iceSlider({
  id: 'ice-slider',
  pointSize: 16,
  lineHeight: 6,
  min: 0,
  max: 990,
  step: 33,
  floatingValue: true,
})

$('#ice-slider-v').iceSlider({
  id: 'ice-slider-v',
  pointSize: 16,
  lineHeight: 6,
  min: 0,
  max: 990,
  step: 33,
  floatingValue: true,
  length: 200,
  vertical: true,
})