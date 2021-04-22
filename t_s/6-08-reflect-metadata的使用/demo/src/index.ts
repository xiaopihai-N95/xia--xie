import 'reflect-metadata'

const user = {
  name: 'zigelar'
}

// 数据 key value 目标对象
Reflect.defineMetadata('data', 'test', user)

console.log(user)  // 这样看不到定义的元数据

console.log(Reflect.getMetadata('data', user))

//! 当作装饰器使用
//^ 定义在类上
@Reflect.metadata('data', 'classtest')
class User {
  //~ 定义在属性上
  @Reflect.metadata('nameData', 'nameValue')
  name = 'lucio'
}

// 打印类的装饰器
console.log(Reflect.getMetadata('data', User))
// 打印属性(方法)的装饰器
console.log(Reflect.getMetadata('nameData', User.prototype, 'name'))
