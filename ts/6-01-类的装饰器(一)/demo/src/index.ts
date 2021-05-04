// 类的装饰器
// 本质是一个函数
// 接收的参数是构造函数
// 通过 @ 符号来使用
// 要在 tsconfig.json 中的实验选项打开, 才不会报错
// 装饰器在类创建好的时候会立即执行一次, 和实例化无关
function testDecorator(constructor: any) {
  constructor.prototype.getName = () => {
    console.log('decorator')
  }
  console.log('decorator')
}

function testDecorator1(constructor: any) {
  constructor.prototype.getName = () => {
    console.log('decorator1')
  }
  console.log('decorator1')
}

// 可以用一个工厂模式判断使用哪个装饰器装饰类
function factoryDecorator(param: number) {
  if (param === 1) {
    return testDecorator
  }
  return testDecorator1
}

// 先使用的装饰器后执行, 即先收集到的装饰器后执行
// @testDecorator1
// @testDecorator
@factoryDecorator(1)
class Test { }


const test = new Test();
(test as any).getName()
// console.log(test.constructor.prototype)