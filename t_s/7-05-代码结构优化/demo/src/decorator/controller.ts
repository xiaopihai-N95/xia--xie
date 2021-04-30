import 'reflect-metadata'
import { RequestHandler } from 'express'
import router from '../router'

export const Controller = function (root: string) {
  return function (target: new (...args: any[]) => {}) {
    for (let key in target.prototype) {
      const path = Reflect.getMetadata('path', target.prototype, key) as string
      const method = Reflect.getMetadata('method', target.prototype, key) as 'get' | 'post'
      const middleware: RequestHandler = Reflect.getMetadata('middleware', target.prototype, key)
      const handler = target.prototype[key]
      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`
        if (middleware) {
          router[method](fullPath, middleware, handler)
        } else {
          router[method](fullPath, handler)
        }
      }
    }
  }
}
