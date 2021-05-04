import fs from 'fs'
import path from 'path'
import { Request, Response, NextFunction } from 'express'
import Analyzer from '../analyzer'
import Crowler from '../crowler'
import { Get, Controller, Use } from '../decorator'
import getResposeData from '../utils/util'

const checkLogin = (req: Request, res: Response, next: NextFunction): void => {
  const isLogin = req.session?.login
  if (isLogin) {
    console.log('first middleware')
    next()
  } else {
    // res.send('请先登录')
    res.json(getResposeData(null, '请先登录'))
  }
}

const secondMiddleware = function (req: Request, res: Response, next: NextFunction) {
  console.log('second middleware')
  next()
}

@Controller('/')
export class CrowlerController {
  @Get('/getData')
  @Use(checkLogin)
  getData(req: Request, res: Response) {
    const key = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`
    const AnalyzerInstance = Analyzer.createInstance()
    new Crowler(url, AnalyzerInstance)
    res.json(getResposeData(true))
  }

  @Get('/showData')
  @Use(checkLogin)
  @Use(secondMiddleware)
  showData(req: Request, res: Response) {
    try {
      const filePath = path.resolve(__dirname, '../../data/data.json')
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      // res.send(JSON.parse(fileContent))
      res.json(getResposeData(JSON.parse(fileContent)))
    } catch (e) {
      res.json(getResposeData(false, '没有数据'))
    }
  }
}
