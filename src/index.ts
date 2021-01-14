// IMPORTS
function importAll(resolve: any): any {
  resolve.keys().forEach(resolve);
}

importAll(require.context('../src/', true, /\.ts$|\.scss$/));
// =============================================================

class HelloMessage {
  constructor(public message: string) {}
}

const msg = new HelloMessage("Hi, John!")

console.log(msg)

