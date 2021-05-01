import 'reflect-metadata'

const routerFactory = (type: string) => {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata('path', path, target, key)
      Reflect.defineMetadata('method', type, target, key)
    }
  }
}

export const Get = routerFactory('get')
export const Post = routerFactory('post')
