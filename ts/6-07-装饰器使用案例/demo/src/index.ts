const userInfo: any = undefined

// 这是使用装饰器时传入的值
function catchError(param: string) {
  // 这是方法装饰器固定的传值
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value
    // 原方法的传值在这里 arg
    descriptor.value = function (arg: string) {
      try {
        oldValue()
        // console.log(arg)
      } catch (e) {
        console.log(`${param} 不存在, 参数: ${arg}`)
      }
    }
  }
}

class Test {
  @catchError('userInfo.name')
  getName(param: string) {
    /* try {
      return userInfo.name
    } catch (e) {
      console.log('userInfo.name 不存在')
    } */
    return userInfo.name
  }
  @catchError('userInfo.age')
  getAge() {
    /* try {
      return userInfo.age
    } catch (e) {
      console.log('userInfo.age 不存在')
    } */
    return userInfo.age
  }
}

const test = new Test()
test.getName('test')
// test.getAge()