import { Router } from 'express'

export const router = Router()

// 装饰器接受的路径与对应的方法绑定
export function get(path: string) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('path', path, target, key)
  }
}

// 类装饰器统一获取路径
// 对于没有使用装饰器的方法会遍历到一个 undefined
export function Controller(target: any) {
  // 循环类中的属性方法
  for (let key in target.prototype) {
    // console.log(Reflect.getMetadata('path', target.prototype, key))
    // 提取原型中对应方法的元数据
    const path = Reflect.getMetadata('path', target.prototype, key)
    // 获取原型中对应方法
    const handler = target.prototype[key]
    // 如果 path 存在就创建路由
    path && router.get(path, handler)
  }
}
