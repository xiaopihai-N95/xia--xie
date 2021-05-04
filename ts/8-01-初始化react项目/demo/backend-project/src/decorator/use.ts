import { RequestHandler } from 'express'
import 'reflect-metadata'
import { CrowlerController } from '../controller'

export const Use = function (middleware: RequestHandler) {
  return function (target: typeof CrowlerController.prototype, key: string) {
    const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target, key) || []
    middlewares.push(middleware)
    Reflect.defineMetadata('middlewares', middlewares, target, key)
  }
}
