import cheerio from 'cheerio'
import fs from 'fs'
import { Analyzer } from './crowler'

interface dataItem {
  name: string,
  count: number
}
interface Data {
  time: number,
  data: dataItem[]
}
interface fileData {
  [propName: number]: dataItem[]
}

export default class DellAnalyzer implements Analyzer {
  private getData(html: string) {
    const $ = cheerio.load(html)
    const dataArr = $('.course-item')
    const dataArray: dataItem[] = []
    const data: Data = { time: new Date().getTime(), data: dataArray}
    dataArr.map((index, item) => {
      const lesson = $(item).find('.course-desc')
      const name = lesson.eq(0).text()
      const count = parseInt(lesson.eq(1).text().split('：')[1])
      const dataItem: dataItem = { name, count }
      dataArray.push(dataItem)
    })
    // console.log(data)
    return data
  }
  private readFile(data: Data, filePath: string) {
    let fileObj: fileData = {}
    if (fs.existsSync(filePath)) {
      const fileOriginData: string = fs.readFileSync(filePath, 'utf-8') || JSON.stringify({})
      fileObj = JSON.parse(fileOriginData)
    }
    fileObj[data.time] = data.data
    return JSON.stringify(fileObj)
  }
  public analyzer(html: string, filePath: string) {
    const data = this.getData(html)
    const fileContent = this.readFile(data, filePath)
    return fileContent
  }
  private constructor() { }
  private static analyzerInstance: DellAnalyzer
  public static createInstance() {
    if (!DellAnalyzer.analyzerInstance) {
      DellAnalyzer.analyzerInstance = new DellAnalyzer()
    }
    return DellAnalyzer.analyzerInstance
  }
}