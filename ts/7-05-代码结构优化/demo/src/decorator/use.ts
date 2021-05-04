import { RequestHandler } from 'express'
import 'reflect-metadata'
import { CrowlerController, LoginController } from '../controller'

export const Use = function (middleware: RequestHandler) {
  return function (target: CrowlerController | LoginController, key: string) {
    const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target, key) || []
    middlewares.push(middleware)
    Reflect.defineMetadata('middlewares', middlewares, target, key)
  }
}