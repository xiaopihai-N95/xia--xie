import fs from 'fs'
import path from 'path'
import { Router, Request, Response } from 'express'
import Crowler from './crowler'
import Analyzer from './analyzer'

interface BodyRequest extends Request{
  body: {
    [key: string]: string | undefined
  }
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session?.login
  if (isLogin) {
    res.send(`
      <html>
        <body>
          <a href="/getData">爬取数据</a>
          <a href="/showData">查看数据</a>
          <a href="/logout">登出</a>
        </body>
      </html>
    `)
  } else {
    res.send(`
      <html>
        <body>
          <form action="/login" method="post">
            <input type="password" name="password" value="">
            <button>登录</button>
          </form>
        </body>
      </html>
    `)
  }
})

router.post('/login', (req: BodyRequest, res: Response) => {
  const isLogin = req.session?.login
  const { password } = req.body
  if (!isLogin) {
    if (password === '123' && req.session) {
      req.session.login = true
      res.send('登录成功')
    } else {
      res.send('密码错误')
    }
  } else {
    res.send('已经登录')
  }
})

router.get('/logout', (req: Request, res: Response) => {
  if (req.session) {
    req.session.login = undefined
  }
  res.redirect('/')
})

router.get('/getData', (req: Request, res: Response) => {
  const isLogin = req.session?.login
  if (isLogin) {
    const key = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`
    const crowlerAnalyzer = Analyzer.createInstance()
    new Crowler(url, crowlerAnalyzer)
    res.send('爬取成功')
  } else {
    res.send('请先登录')
  }
})

router.get('/showData', (req: Request, res: Response) => {
  const isLogin = req.session?.login
  if (isLogin) {
    try {
      const filePath = path.resolve(__dirname, '../data/data.json')
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      res.json(JSON.parse(fileContent))
    } catch (e) {
      res.send('没有数据')
    }
  } else {
    res.send('请先登录')
  }
})

export default router
