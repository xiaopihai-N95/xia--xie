import cheerio from 'cheerio'
import fs from 'fs'
import { Analyzer } from './crowler'

interface DataFormat {
  name: string
  count: number
}
interface Data {
  time: number
  data: DataFormat[]
}
interface FileData {
  [propName: number]: DataFormat[]
}

export default class DellAnalyzer implements Analyzer {
  private getData(html: string) {
    const $ = cheerio.load(html)
    const dataItemArr = $('.course-item')
    const data: DataFormat[] = []
    const result: Data = {
      time: new Date().getTime(),
      data
    }
    dataItemArr.map((index, item) => {
      const lesson = $(item).find('.course-desc')
      const name = lesson.eq(0).text()
      const count = parseInt(lesson.eq(1).text().split('：')[1])
      data.push({ name, count })
    })
    return result
  }
  private readFile(data: Data, filePath: string) {
    let fileData: FileData = {}
    if (fs.existsSync(filePath)) {
      const fileOriginFile = fs.readFileSync(filePath, 'utf-8') || JSON.stringify({})
      fileData = JSON.parse(fileOriginFile)
    }
    fileData[data.time] = data.data
    return JSON.stringify(fileData)
  }
  analyzer(html: string, filePath: string) {
    const data = this.getData(html)
    const fileData = this.readFile(data, filePath)
    return fileData
  }
  private constructor() { }
  private static instance: DellAnalyzer
  public static createInstance() {
    if (!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer()
    }
    return DellAnalyzer.instance
  }
}