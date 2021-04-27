import fs from 'fs'
import path from 'path'
import { Router, Request, Response, NextFunction } from 'express'
import Analyzer from './utils/analyzer'
import Crowler from './utils/crowler'
import getResponseData from './utils/util'

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session?.login
  if (isLogin) {
    next()
  } else {
    // res.send('请先登录')
    res.json(getResponseData(null, '请先登录'))
  }
}

const router = Router()

/* router.get('/', (req: Request, res: Response) => {

}) */

/* router.post('/login', (req: BodyRequest, res: Response) => {
  
}) */

/* router.get('/logout', (req: Request, res: Response) => {
  
}) */

router.get('/getData', checkLogin, (req: Request, res: Response) => {
  const key = 'x3b174jsx'
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`
  const analyzerInstance = Analyzer.createInstance()
  new Crowler(url, analyzerInstance)
  // res.send('爬取成功')
  res.json(getResponseData(true))
})

router.get('/showData', checkLogin, (req: Request, res: Response) => {
  try {
    const filePath = path.resolve(__dirname, '../data/data.json')
    const dataContent = fs.readFileSync(filePath, 'utf-8')
    // res.json(JSON.parse(dataContent))
    res.json(getResponseData(JSON.parse(dataContent)))
  } catch (e) {
    // res.send('没有数据')
    res.json(getResponseData(false, '没有数据'))
  }
})

export default router
