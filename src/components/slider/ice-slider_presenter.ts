import Model from "./ice-slider_model";
import View from "./ice-slider_view";

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
    view.initComp()
    view.initProps()
    view.initSubViews()
  }
}





// =========== EXPORT ===========
export default Presenter