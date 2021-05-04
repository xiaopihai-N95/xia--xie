import 'reflect-metadata'

function showData(target: typeof User) {
  for (let key in target.prototype) {
    console.log(Reflect.getMetadata('data', target.prototype, key))  // 可以打印出 name, age
    // 说明方法的解释器优先于类的解释器的
  }
}

function setData(dataKey: string, prop: string) {
  return function (target: User, key: string) {
    Reflect.defineMetadata(dataKey, prop, target, key)
  }
}

@showData
class User {
  name = 'Tracer'
  @Reflect.metadata('data', 'name')
  getName() {

  }

  /* @Reflect.metadata('data', 'age') */
  @setData('data', 'age')
  getAge() {

  }
}