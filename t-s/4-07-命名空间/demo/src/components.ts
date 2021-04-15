namespace Components {
  export namespace SubComponents {
    export class Test {

    }
  }
  export interface User{
    name: string
  }
  export class Header {
    constructor() {
      const ele = document.createElement('div')
      ele.innerText = 'This is header'
      document.body.appendChild(ele)
    }
  }
  
  export class Content {
    constructor() {
      const ele = document.createElement('div')
      ele.innerText = 'This is Content'
      document.body.appendChild(ele)
    }
  }
  
  export class Footer {
    constructor() {
      const ele = document.createElement('div')
      ele.innerText = 'This is footer'
      document.body.appendChild(ele)
    }
  }
}