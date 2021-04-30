import 'reflect-metadata'
import { CrowlerController, LoginController } from '../controller'

function RouterFactory(type: string) {
  return function (path: string) {
    return function (target: CrowlerController | LoginController, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}

export const Get = RouterFactory('get')
export const Post = RouterFactory('post')
