import cheerio from 'cheerio'
import fs from 'fs'

interface DataItem {
  name: string
  count: number
}
interface Data {
  time: number
  data: DataItem[]
}
interface fileData {
  [propName: number]: DataItem[]
}

export default class DellAnalyzer {

  private getData(html: string) {
    const $ = cheerio.load(html)
    const items = $('.course-item')
    const data: DataItem[] = []
    const result = { time: new Date().getTime(), data }
    items.map((index, item) => {
      const lesson = $(item).find('.course-desc')
      const name = lesson.eq(0).text()
      const count = parseInt(lesson.eq(1).text().split('：')[1])
      data.push({ name, count })
    })
    return result
  }
  private readFile(data: Data, filePath: string) {
    let fileContent: fileData = {}
    if (fs.existsSync(filePath)) {
      const fileOriginContent = fs.readFileSync(filePath, 'utf-8') || JSON.stringify({})
      fileContent = JSON.parse(fileOriginContent)
    }
    fileContent[data.time] = data.data
    return JSON.stringify(fileContent)
  }
  analyzer(html: string, filePath: string) {
    const data = this.getData(html)
    const fileContent = this.readFile(data, filePath)
    return fileContent
  }

  private static instance: DellAnalyzer
  public static createInstance() {
    if (!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer()
    }
    return DellAnalyzer.instance
  }
  private constructor() {}
}