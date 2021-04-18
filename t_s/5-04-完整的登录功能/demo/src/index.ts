import express, { Request, response, NextFunction } from 'express'
import router from './router'
import bodyParser from 'body-parser'

const app = express()

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