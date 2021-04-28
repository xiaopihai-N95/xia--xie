import fs from 'fs'
import path from 'path'
import { Router, Request, Response, NextFunction } from 'express'
import Analyzer from './utils/analyzer'
import Crowler from './utils/crowler'
import getResponseData from './utils/util'

const router = Router()

/* router.get('/', (req: Request, res: Response) => {

}) */

/* router.post('/login', (req: BodyRequest, res: Response) => {
  
}) */

/* router.get('/logout', (req: Request, res: Response) => {
  
}) */

/* router.get('/getData', checkLogin, (req: Request, res: Response) => {
  
}) */

/* router.get('/showData', checkLogin, (req: Request, res: Response) => {
  try {
    const filePath = path.resolve(__dirname, '../data/data.json')
    const dataContent = fs.readFileSync(filePath, 'utf-8')
    // res.json(JSON.parse(dataContent))
    res.json(getResponseData(JSON.parse(dataContent)))
  } catch (e) {
    // res.send('没有数据')
    res.json(getResponseData(false, '没有数据'))
  }
}) */

export default router
