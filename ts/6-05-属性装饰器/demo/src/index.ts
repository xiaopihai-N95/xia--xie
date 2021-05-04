// 装饰器接收就下面这2个参数
function setNameDecorator(target: any, key: string): any {
  console.log(target, key)
  // 自己构建属性描述符
  /* const descriptor: PropertyDescriptor = {
    writable: true
  }
  return descriptor */
  target[key] = 'mccree'
}

class Test {
  @setNameDecorator
  name = 'genji'
}

const test = new Test()
// test.name = 'zigelar'
// 属性装饰器无法修改属性值, 最多在原型上设置一个同名的属性通过原型链访问到
console.log((test as any).__proto__.name)
