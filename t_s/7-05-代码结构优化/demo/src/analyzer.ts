import fs from 'fs'
import cheerio from 'cheerio'
import { CrowlerAnalyzer } from './crowler'

interface DataItem {
  name: string
  count: number
}
interface Data {
  time: number
  data: DataItem[]
}
interface FileContent {
  [key: number]: DataItem[]
}

class Analyzer {
  private constructor() { }
  private getData(html: string) {
    const $ = cheerio.load(html)
    const items = $('.course-item')
    const data: DataItem[] = []
    const result: Data = { time: new Date().getTime(), data }
    items.map((index, ele) => {
      const item = $(ele).find('.course-desc')
      const name = item.eq(0).text()
      const count = parseInt(item.eq(1).text().split('：')[1])
      data.push({ name, count })
    })
    return result
  }
  private readFile(data: Data, filePath: string) {
    let fileContent: FileContent = {}
    if (fs.existsSync(filePath)) {
      const originContent = fs.readFileSync(filePath, 'utf-8') || JSON.stringify({})
      fileContent = JSON.parse(originContent)
    }
    fileContent[data.time] = data.data
    return JSON.stringify(fileContent)
  }
  analyzer(html: string, filePath: string) {
    const data = this.getData(html)
    const fileContent = this.readFile(data, filePath)
    return fileContent
  }
  private static instance: CrowlerAnalyzer
  static createInstance() {
    if (!Analyzer.instance) {
      Analyzer.instance = new Analyzer
    }
    return Analyzer.instance
  }
}

export default Analyzer
