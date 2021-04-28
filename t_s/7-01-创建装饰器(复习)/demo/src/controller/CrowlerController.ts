import { Router } from 'express'
import "reflect-metadata"
import { Request, Response } from 'express'
import Analyzer from '../utils/analyzer'
import Crowler from '../utils/crowler'
import getResponseData from '../utils/util'
import { Get, Use, Controller, checkLogin } from './decorator'

const router = Router()

@Controller
class CrowlerController {
  @Get('/getData')
  @Use(checkLogin)
  getData(req: Request, res: Response) {
    const key = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`
    const analyzerInstance = Analyzer.createInstance()
    new Crowler(url, analyzerInstance)
    // res.send('爬取成功')
    res.json(getResponseData(true))
  }
}

export default router
