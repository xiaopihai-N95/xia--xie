import { Router, Request, Response, NextFunction } from 'express'

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined
  }
}

const router = Router()

router.get('/', (req: Request, res: Response) => {
  const isLogin = req.session?.login
  if (isLogin) {
    res.send()
  } else {
    res.redirect('/login')
  }
})


router.get('/login', (req: Request, res: Response) => {
  res.send(`
    <html>
      <body>
        <form action="/getData" method="post">
          <input type="password" name="password" value="">
          <button type="submit">登录</button>
        </form>
      </body>
    </html>
  `)
})

router.post('/getData', (req: BodyRequest, res: Response) => {
  const { password } = req?.body
  if (password === '123') {
    res.send('getData success')
  } else {
    res.send('password error')
  }
})

export default router
