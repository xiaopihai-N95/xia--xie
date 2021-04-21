// 不能向多个同名的 get/set 访问器应用修饰器。
function setNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  descriptor.writable = false
}

class Test {
  private name_: string
  constructor(name: string) {
    this.name_ = name
  }
  get name() {
    return this.name_
  }
  @setNameDecorator
  set name(name: string) {
    this.name_ = name
  }
}

const test = new Test('genji')
test.name = 'lucio'  // error
console.log(test.name)