import { Router, Request, Response, NextFunction, RequestHandler } from 'express'
import 'reflect-metadata'
import LoginController from './LoginController'
import getResponseData from '../utils/util'

/* enum Method {
  get = 'get',
  post = 'post'
} */

interface Middleware {
  (req: Request, res: Response, next: NextFunction): void
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
    const method = Reflect.getMetadata('method', target.prototype, key) as 'get' | 'post'
    const middleware = Reflect.getMetadata('middleware', target.prototype, key)
    const handler = target.prototype[key]
    // Reflect.getMetadata 的返回值是 any 类型, 即 method 是 any 类型
    // router[method] 的 method 是字符串类型, 但更加严格地说是特定的字符串, 表示请求方式的字符串(例如: 'get', 'post')
    // 所以解决报错的方式有类型断言和借助枚举类型
    if (path && method && handler) {
      router[method](path, middleware, handler)
    } else {
      router[method](path, handler)
    }
  }
}

export const checkLogin: Middleware = (req, res, next) => {
  const isLogin = req.session?.login
  if (isLogin) {
    next()
  } else {
    // res.send('请先登录')
    res.json(getResponseData(null, '请先登录'))
  }
}

export function GetData(path: string) {
  return function(target: any, key: string) {
    Reflect.defineMetadata('path', path, target.prototype, key)
  }
}

export function CrowlerDescriptor(middleware: Middleware) {
  return function (target: any) {
    for (let key in target.prototype) {
      const path = Reflect.getMetadata('path', target.prototype, key)
      const handler = target.prototype[key]
      path && handler && router.get(path, middleware, handler)
    }
  }
}


export const Use = function (middleware: RequestHandler) {
  return function (target: any, key: string) {
    Reflect.defineMetadata('middleware', middleware, target, key)
  }
}