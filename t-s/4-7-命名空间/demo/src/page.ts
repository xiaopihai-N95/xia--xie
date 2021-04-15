// 清晰的依赖关系注释, 以///<reference path="xxx"/>形式写
///<reference path="./components.ts"/>

namespace Home {
  export class Page {
    user: Components.User = {
      name: 'dell'
    }
    constructor() {
      new Components.Header()
      new Components.Content()
      new Components.Footer()
    }
  }
}