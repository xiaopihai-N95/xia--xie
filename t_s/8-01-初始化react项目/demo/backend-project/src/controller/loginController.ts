import { Request, Response, NextFunction } from 'express'
import getResposeData from '../utils/util'
import { Get, Post, Controller } from '../decorator'

@Controller('/')
export class LoginControlller {
  @Get('/')
  home(req: Request, res: Response): void {
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
              <button type="submit">登录</button>
            </form>
          </body>
        </html>
      `)
    }
  }

  @Post('/login')
  login(req: Request, res: Response): void {
    const isLogin = req.session?.login
    const { password } = req.body
    if (isLogin) {
      // res.send('已经登录')
      res.json(getResposeData(false, '已经登录'))
    } else {
      if (password === '123' && req.session) {
        req.session.login = true
        // res.send('登录成功')
        res.json(getResposeData(true))
      } else {
        // res.send('登录失败')
        res.json(getResposeData(false, '登录失败'))
      }
    }
  }

  @Get('/logout')
  logout(req: Request, res: Response): void {
    if (req.session) {
      req.session.login = undefined
    }
    // res.redirect('/')
    res.json(getResposeData(true))
  }
}
