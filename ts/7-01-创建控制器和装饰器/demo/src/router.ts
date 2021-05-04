import { Router, Request, Response, NextFunction } from 'express'
import Analyzer from './utils/analyzer'
import Crowler from './utils/crowler'
import fs from 'fs'
import path from 'path'
import getResponseData from './utils/util'



const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session?.login
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, '请先登录'))
    // res.send('请先登录')
  }
}

const router = Router()

router.get('/', () => {})

router.post('/login', (req: Request, res: Response) => {
  const { password } = req.body
  const isLogin = req.session?.login
  if (isLogin) {
    res.json(getResponseData(false, '已经登陆'))
    // res.send('已经登陆')
  } else {
    if (password === '123' && req.session) {
      req.session.login = true
      // res.send('登录成功')
      res.json(getResponseData(true))
    } else {
      // res.send('登陆失败')
      res.json(getResponseData(false, '登陆失败'))
    }
  }
})

router.get('/logout', (req: Request, res: Response) => {
  if (req.session)
    req.session.login = undefined
  // res.redirect('/')
  res.json(getResponseData(true))
})

router.get('/getData', checkLogin, (req: Request, res: Response) => {
  const key = 'x3b174jsx'
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`
  const CourseAnalyzer = Analyzer.createInstance()
  new Crowler(url, CourseAnalyzer)
  res.json(getResponseData(true))
})

router.get('/showData', checkLogin, (req: Request, res: Response) => {
  try {
    const filePath = path.resolve(__dirname, '../data/data.json')
    const result = fs.readFileSync(filePath, 'utf-8')
    // res.json(JSON.parse(result))
    res.json(getResponseData(JSON.parse(result)))
  } catch (e) {
    // res.send('未爬取到内容')
    res.json(getResponseData(false, '未爬取到内容'))
  }
})

export default router
