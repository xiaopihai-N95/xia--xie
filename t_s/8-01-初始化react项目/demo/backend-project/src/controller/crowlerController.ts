import fs from 'fs'
import path from 'path'
import { Request, Response, NextFunction } from 'express'
import Analyzer from '../analyzer'
import Crowler from '../crowler'
import { Get, Controller } from '../decorator'
import getResposeData from '../utils/util'

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session?.login
  if (isLogin) {
    next()
  } else {
    // res.send('请先登录')
    res.json(getResposeData(null, '请先登录'))
  }
}

@Controller('/')
class CrowlerController {
  @Get('/getData')
  getData(req: Request, res: Response) {
    const key = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`
    const AnalyzerInstance = Analyzer.createInstance()
    new Crowler(url, AnalyzerInstance)
    res.json(getResposeData(true))
  }

  @Get('/showData')
  showData(req: Request, res: Response) {
    const filePath = path.resolve(__dirname, '../data/data.json')
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    // res.send(JSON.parse(fileContent))
    res.json(getResposeData(JSON.parse(fileContent)))
  }
}