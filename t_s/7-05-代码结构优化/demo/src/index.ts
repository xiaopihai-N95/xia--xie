import express, { Router, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import router from './router'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieSession({
  name: 'session',
  keys: ['crowler'],
  maxAge: 24 * 60 * 60 * 1000
}))
app.use(router)

app.listen(7001, () => {
  console.log('server is running')
})
