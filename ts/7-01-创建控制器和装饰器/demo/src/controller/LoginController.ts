import { Request, Response, NextFunction } from 'express'
import 'reflect-metadata'
import { get, Controller } from './decorator'
import getResponseData from '../utils/util'

/* interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined
  }
} */

@Controller
class LoginController {
  @get('/login')
  login(req: Request, res: Response) {
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
    // test
    // res.send('login is running')
  }

  @get('/')
  home(req: Request, res: Response) {
    const isLogin = req.session?.login
    if (isLogin) {
      res.send(`
        <html>
          <body>
            <a href="/getData">爬取内容</a>
            <a href="/showData">显示内容</a>
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

  @get('/logout')
  loginout(req: Request, res: Response) {
    if (req.session)
      req.session.login = undefined
    // res.redirect('/')
    res.json(getResponseData(true))
  }
}