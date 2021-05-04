import fs from 'fs'
import path from 'path'
import "reflect-metadata"
import { Request, Response, NextFunction } from 'express'
import Analyzer from '../utils/analyzer'
import Crowler from '../utils/crowler'
import getResponseData from '../utils/util'
import { Get, Use, Controller } from './decorator'

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session?.login
  if (isLogin) {
    next()
  } else {
    // res.send('请先登录')
    res.json(getResponseData(null, '请先登录'))
  }
}

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

  @Get('/showData')
  @Use(checkLogin)
  showData(req: Request, res: Response) {
    try {
      const filePath = path.resolve(__dirname, '../../data/data.json')
      const dataContent = fs.readFileSync(filePath, 'utf-8')
      // res.json(JSON.parse(dataContent))
      res.json(getResponseData(JSON.parse(dataContent)))
    } catch (e) {
      // res.send('没有数据')
      res.json(getResponseData(false, '没有数据'))
    }
  }
}

export default CrowlerController
