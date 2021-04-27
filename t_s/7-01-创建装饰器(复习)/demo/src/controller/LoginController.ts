import { Request, Response } from 'express'
import 'reflect-metadata'
import { Controller, Get, Post } from './decorator'
import getResponseData from '../utils/util'

@Controller
export default class LoginController {
  @Get('/')
  home(req: Request, res: Response) {
    const isLogin = req.session?.login
    if (isLogin) {
      res.send(`
        <html>
          <body>
            <a href="/getData">爬取数据</a>
            <a href="/showData">显示数据</a>
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
  login(req: Request, res: Response) {
    const { password } = req.body
    const isLogin = req.session?.login
    if (isLogin) {
      res.json(getResponseData(false, '已经登陆'))
    } else {
      if (password === '123' && req.session) {
        req.session.login = true
        // res.send('登陆成功')
        res.json(getResponseData(true))
      } else {
        // res.send('password error')
        res.json(getResponseData(false, '密码错误'))
      }
    }
  }

  @Get('/logout')
  logout(req: Request, res: Response) {
    if (req.session) {
      req.session.login = undefined
    }
    // res.redirect('/')
    res.json(getResponseData(true))
  }
}