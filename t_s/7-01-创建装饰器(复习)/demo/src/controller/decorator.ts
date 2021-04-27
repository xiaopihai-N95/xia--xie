import { Router } from 'express'
import LoginController from './LoginController'

enum Method {
  get = 'get',
  post = 'post'
}

export const router = Router()

/* export function Get(path: string) {
  return function (target: typeof LoginController.prototype, key: string) {
    Reflect.defineMetadata('path', path, target, key)
    Reflect.defineMetadata('method', 'get', target, key)
  }
}

export function Post(path: string) {
  return function (target: typeof LoginController.prototype, key: string) {
    Reflect.defineMetadata('path', path, target, key)
    Reflect.defineMetadata('method', 'post', target, key)
  }
} */
// 高度相似, 冗余, 用工厂方式生成
export function getRequestDecorator(type: string) {
  return function (path: string) {
    return function (target: typeof LoginController.prototype, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}

export const Get = getRequestDecorator('get')
export const Post = getRequestDecorator('post')

export function Controller(target: any) {
  for (let key in target.prototype) {
    const path = Reflect.getMetadata('path', target.prototype, key)
    const method: Method = Reflect.getMetadata('method', target.prototype, key)
    const handler = target.prototype[key]
    path && method && handler && router[method](path, handler)
  }
}
