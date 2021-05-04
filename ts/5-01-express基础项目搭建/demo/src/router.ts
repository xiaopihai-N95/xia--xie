import { Router, Request, Response } from 'express'
import DellAnalyzer from './dellAnalyzer'
import Crowler from './crowler'

const router = Router()

router.get('/', (req: Request, res: Response) => {
  res.send('hello world!!')
})
router.get('/getData', (req: Request, res: Response) => {
  // http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx
  const key = 'x3b174jsx'
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`
  const dellAnalyzer = DellAnalyzer.createInstance()
  new Crowler(url, dellAnalyzer)
  res.send('getData success')
})

export default router