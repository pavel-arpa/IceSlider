const { View } = require('./components/slider/ice-slider_view')

import './styles/null.scss'
import './styles/montserrat.scss'
import './styles/fonts.scss'


// IMPORTS
function importAll(resolve: any): any {
  resolve.keys().forEach(resolve);
}
importAll(require.context('../src/components', true, /\.ts$|\.scss$/));



// =============================================================
const view = new View('ice-slider', {
  pointSize: 16
});

(<any>window).view = view;



// const viewPoint = new ViewPoint('ice-slider', {
//   pointSize: 16
// });
// const viewLine = new ViewLine('ice-slider');
// const viewRange = new ViewRange('ice-slider');


// (<any>window).viewLine = viewLine;
// (<any>window).viewRange = viewRange;







