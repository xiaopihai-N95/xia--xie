// 3个参数: 原型 方法名 参数位置下标
function paramDecorator(target: any, method: string, paramIndex: number): any {
  console.log(target, method, paramIndex)
}

class Test {
  getInfo(@paramDecorator name: string, age: number) {
    console.log(name, age)
  }
}

const test = new Test()
test.getInfo('genji', 40)
