import 'reflect-metadata'
import { RequestHandler } from 'express'
import router from '../router'

export const Controller = function (root: string) {
  return function (target: new (...args: any[]) => {}) {
    for (let key in target.prototype) {
      const path = Reflect.getMetadata('path', target.prototype, key) as string
      const method = Reflect.getMetadata('method', target.prototype, key) as 'get' | 'post'
      const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key)
      const handler = target.prototype[key]
      if (path && method) {
        const fullPath = root === '/' ? path : `${root}${path}`
        if (middlewares?.length) {
          router[method](fullPath, ...middlewares, handler)
        } else {
          router[method](fullPath, handler)
        }
      }
    }
  }
}
