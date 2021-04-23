import { Router, Request, Response, NextFunction } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response) => {
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

router.post('/getData', (req: Request, res: Response) => {
  console.log('getData success')
})



export default router