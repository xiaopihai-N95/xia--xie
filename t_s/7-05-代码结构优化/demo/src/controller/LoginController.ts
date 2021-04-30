import { Request, Response } from 'express'
import { Controller, Get, Post } from '../decorator'
import getResponseData from '../utils/util'

interface BodyRequest extends Request{
  body: {
    [key: string]: string | undefined
  }
}

@Controller('/')
export class LoginController {
  static isLogin(req: BodyRequest): boolean {
    return !!(req.session?.login)
  }

  @Get('/')
  home(req: Request, res: Response): void {
    if (LoginController.isLogin(req)) {
      res.send(`
        <html>
          <body>
            <a href="/abc/getData">爬取数据</a>
            <a href="/abc/showData">查看数据</a>
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
  }

  @Post('/login')
  login(req: BodyRequest, res: Response): void {
    const { password } = req.body
    if (!LoginController.isLogin(req)) {
      if (password === '123' && req.session) {
        req.session.login = true
        // res.send('登录成功')
        res.json(getResponseData(true))
      } else {
        // res.send('密码错误')
        res.json(getResponseData(false, '密码错误'))
      }
    } else {
      // res.send('已经登录')
      res.json(getResponseData(false, '已经登录'))
    }
  }

  @Get('/logout')
  logout(req: Request, res: Response): void {
    if (req.session) {
      req.session.login = undefined
    }
    // res.redirect('/')
    res.json(getResponseData(true))
  }
}