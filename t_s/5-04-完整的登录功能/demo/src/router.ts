import { Router, Request, Response, NextFunction } from 'express'
import Crowler from './crowler'
import DellAnalyzer from './dellAnalyzer'

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form method="post" action="/getData">
          <input type="password" name="password" value="">
          <button type="submit">提交</button>
        </form>
      </body>
    </html>
  `)
})

router.post('/getData', (req: RequestWithBody, res: Response) => {
  const { password } = req.body
  if (password === '123') {
    const key = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`
    const dellAnalyzer = DellAnalyzer.createInstance()
    new Crowler(url, dellAnalyzer)
    res.send('getData success')
  } else {
    res.send('password error')
  }
})

export default router