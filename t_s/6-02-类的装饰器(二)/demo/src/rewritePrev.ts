// 自己复习上一节的内容, 加上枚举类型是代码更可读
enum selectDecorator {
  DECORATOR,
  DECORATOR1
}

function testDecorator(constructor: any) {
  console.log('decorator')
}

function testDecorator1(constructor: any) {
  console.log('decorator1')
}

function factoryDecorator(param: number) {
  if (param === 0) {
    return testDecorator
  }
  return testDecorator1
}

@factoryDecorator(selectDecorator.DECORATOR1)
class Test { }

const test = new Test()
