// =========== TYPES ===========
interface Options extends Object {
  id: string;
  pointSize: number;
}




// =========== PRESENTER ===========
class Presenter {
  view: View;
  model: Model;

  constructor(view: View, model: Model, options: Options) {
    this.view = view
    this.model = model

    let data = model.initData(options)
    view.setOptions(data)
    view.render(model.template)
    view.initProps()
    view.initComponents()
  }
}





// =========== EXPORT ===========
module.exports = { Presenter }