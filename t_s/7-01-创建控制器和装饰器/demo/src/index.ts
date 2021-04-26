import cookieSession from 'cookie-session';
import bodyParser from 'body-parser';
import express from 'express'
// import router from './router'
// 引入装饰器
import './controller/LoginController'
import { router } from './controller/decorator'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieSession({
  name: 'session',
  keys: ['spider'],
  maxAge: 24 * 60 * 60 * 1000
}))
app.use(router)

app.listen(7001, () => {
  console.log('server is running')
})