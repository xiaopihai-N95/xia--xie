import { Router, Request, Response } from 'express'
import Crowler from './crowler'
import DellAnalyzer from './dellAnalyzer';

const router = Router()

interface RequestWithBody extends Request{
  body: {
    [key: string]: string | undefined
  }
}

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

router.get('/login', (req: Request, res: Response) => {
  res.send()
})

// 因为表单使用了 post 的方式, 所以这里也要用 post 方式
router.post('/getData', (req: Request, res: Response) => {
  const { password } = req.body
  if (password === '123') {
    const key = 'x3b174jsx'
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`
    const dellAnalyzer = DellAnalyzer.createInstance()
    new Crowler(url, dellAnalyzer)
    res.send('getData success')
  } else {
    res.send(`${req.message} password error`)
  }
})

export default router