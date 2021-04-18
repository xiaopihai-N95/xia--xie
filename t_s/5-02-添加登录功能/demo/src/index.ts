import express, { Request, Response, NextFunction } from 'express'
import router from './router'
import bodyParser from 'body-parser'

const app = express()

// 要先解析 body-parser, 不然路由调用不到
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use((req: Request, res: Response, next: NextFunction) => {
  req.message = 'hi, 小屁孩!'
  next()
})
app.use(router)

app.listen(7001, () => {
  console.log('server is running')
})