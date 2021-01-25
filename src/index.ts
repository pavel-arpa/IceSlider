const { ViewPoint, ViewRange } = require('./components/slider/ice-slider_view')

import './styles/null.scss'
import './styles/montserrat.scss'
import './styles/fonts.scss'


// IMPORTS
function importAll(resolve: any): any {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../src/components', true, /\.ts$|\.scss$/));
// =============================================================

const viewPoint = new ViewPoint('ice-slider', {
  pointSize: 16
});
const viewRange = new ViewRange('ice-slider');


(<any>window).viewPoint = viewPoint;
(<any>window).viewRange = viewRange;
// (<any>window).viewPoint = viewPoint;


