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
interface FileData {
  [key: number]: DataItem[]
}

export default class Analyzer {
  private getData(html: string) {
    const $ = cheerio.load(html)
    const items = $('.course-item')
    const data: DataItem[] = []
    const result: Data = { time: new Date().getTime(), data }
    items.map((index, ele) => {
      const result = $(ele).find('.course-desc')
      const name = result.eq(0).text()
      const count = parseInt(result.eq(1).text().split('：')[1])
      data.push({ name, count })
    })
    return result
  }
  private readFile(data: Data, filePath: string) {
    let result: FileData = {}
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8') || JSON.stringify({})
      result = JSON.parse(fileData)
    }
    result[data.time] = data.data
    return JSON.stringify(result)
  }
  analyzer(content: string, filePath: string): string {
    const data = this.getData(content)
    const fileContent = this.readFile(data, filePath)
    return fileContent
  }
  private constructor() { }
  private static instance: CrowlerAnalyzer
  static createInstance() {
    if (!Analyzer.instance) {
      Analyzer.instance = new Analyzer
    }
    return Analyzer.instance
  }
}