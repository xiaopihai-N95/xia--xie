import { RequestHandler } from 'express'
import 'reflect-metadata'
import { CrowlerController, LoginController } from '../controller'

export const Use = function (middleware: RequestHandler) {
  return function (target: CrowlerController | LoginController, key: string) {
    Reflect.defineMetadata('middleware', middleware, target, key)
  }
}