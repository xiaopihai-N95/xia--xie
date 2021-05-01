import fs from 'fs'
import path from 'path'
import { Request, Response, NextFunction } from 'express'
import { Controller, Use, Get } from '../decorator'
import getResponseData from '../utils/util'
import Analyzer from '../utils/analyzer'
import Crowler from '../utils/crowler'

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = !!(req.session?.login)
  if (isLogin) {
    next()
  } else {
    // res.send('请先登录')
    res.json(getResponseData(null, '请先登录'))
  }
  console.log('first middleware')
}

const testSecondMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  console.log('second middleware')
  next()
}

@Controller('/abc')
export class CrowlerController {
  @Get('/getData')
  @Use(checkLogin)
  getData(req: Request, res: Response): void {
    const key = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`
    const crowlerAnalyzer = Analyzer.createInstance()
    new Crowler(url, crowlerAnalyzer)
    // res.send('爬取成功')
    res.json(getResponseData(true))
  }

  @Get('/showData')
  @Use(checkLogin)
  @Use(testSecondMiddleware)
  showData(req: Request, res: Response): void {
    try {
      const filePath = path.resolve(__dirname, '../../data/data.json')
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      // res.json(JSON.parse(fileContent))
      res.json(getResponseData(JSON.parse(fileContent)))
    } catch (e) {
      // res.send('没有数据')
      res.json(getResponseData(false, '没有数据'))
    }
  }
}