// 实例方法: target 指向类的原型
// 静态方法: target 指向类的构造函数
// descriptor: 对应 object.defineProperty 那 4 个属性
function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // console.log(target)
  // descriptor.writable = false   // line: 22 的修改无效
  descriptor.value = () => 'modify by decorator'
}

class Test {
  private name: string
  constructor(name: string) {
    this.name = name
  }
  @getNameDecorator
  getName() {
    return this.name
  }
}

const test = new Test('genji')
// test.getName = () => '123'
console.log(test.getName())
