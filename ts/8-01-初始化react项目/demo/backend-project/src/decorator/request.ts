import 'reflect-metadata'
import { CrowlerController, LoginControlller } from '../controller'

const routerFactory = (type: string) => {
  return function (path: string) {
    return function (target: typeof CrowlerController.prototype | typeof LoginControlller.prototype, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}

export const Get = routerFactory('get')
export const Post = routerFactory('post')
