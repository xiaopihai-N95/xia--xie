import { Router, Request, Response, NextFunction } from 'express'
import Crowler from './utils/crowler'
import Analyzer from './utils/analyzer'
import fs from 'fs'
import path from 'path'
import getResponseData from './utils/util'

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

// 因为 getData 和 showData 结构相同都判断了登陆状态, 所以自己定义一个业务逻辑中间件
const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session?.login
  if (isLogin) {
    next()
  } else {
    res.json(getResponseData(null, '请先登录'))
  }
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    res.send(`
      <html>
        <body>
          <a href="/getData">爬取内容</a>
          <a href="/showData">查看结果</a>
          <a href="/logout">退出</a>
        </body>
      </html>
    `)
  } else {
    res.send(`
    <html>
      <body>
        <form method="post" action="/login">
          <input type="password" name="password" value="">
          <button type="submit">登录</button>
        </form>
      </body>
    </html>
  `)
  }
})

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined
  }
  res.json(getResponseData(true))
})

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { password } = req.body
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    res.json(getResponseData(false, '已经登陆'))
  } else {
    if (password === '123' && req.session) {
      req.session.login = true
      res.json(getResponseData(true))
    } else {
      res.json(getResponseData(false, '登陆失败'))
    }
  }
})

router.get('/getData', checkLogin, (req: RequestWithBody, res: Response) => {
  const key = 'x3b174jsx'
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`
  const dellAnalyzer = Analyzer.createInstance()
  new Crowler(url, dellAnalyzer)
  res.json(getResponseData(true))
})

router.get('/showData', checkLogin, (req: Request, res: Response) => {
  try {
    const filePath = path.resolve(__dirname, '../data/crowler.json')
    const content = fs.readFileSync(filePath, 'utf-8')
    res.json(getResponseData(JSON.parse(content)))
  } catch (e) {
    res.json(getResponseData(false, '未爬取到内容'))
  }
})

export default router
