const View = require('./components/slider/ice-slider_view.ts')

import './styles/null.scss'
import './styles/montserrat.scss'
import './styles/fonts.scss'


// IMPORTS
function importAll(resolve: any): any {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../src/components', true, /\.ts$|\.scss$/));
// =============================================================

const view = new View('item');

(<any>window).s = view;

