const View = require('./components/slider/slider-view.ts')


// IMPORTS
function importAll(resolve: any): any {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../src/components', true, /\.ts$|\.scss$/));
importAll(require.context('../src/styles', true, /\.ts$|\.scss$/));
// =============================================================

const view = new View('item');

(<any>window).s = view;

