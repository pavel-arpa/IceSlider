interface Options extends Object {
  id: string;
  pointSize: number;
  lineHeight: number;
  min: number;
  max: number;
  step: number;
}

interface ViewT extends Object {
  [key: string]: any;

  setOptions(options: Options): void;
  render(template): void;
  initComp(): void;
  initProps(): void;
  initSubViews(): void;
  update(sender: object, event: string): void;
}
