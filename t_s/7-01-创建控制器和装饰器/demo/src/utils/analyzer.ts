import cheerio from 'cheerio'
import fs from 'fs'
import { AnalyzerInstance } from './crowler'

interface DataItem {
  name: string
  count: number
}
interface Data {
  time: number
  data: DataItem[]
}
interface FileData {
  [propName: number]: DataItem[]
}

class Analyzer {
  private getData(html: string) {
    const $ = cheerio.load(html)
    const items = $('.course-item')
    const data: DataItem[] = []
    const outputData: Data = { time: new Date().getTime(), data }
    items.map((index, item) => {
      const course = $(item).find('.course-desc')
      const name = course.eq(0).text()
      const count = parseInt(course.eq(1).text().split('：')[1])
      data.push({ name, count })
    })
    return outputData
  }
  private readFile(data: Data, filePath: string) {
    let outputData: FileData = {}
    if (fs.existsSync(filePath)) {
      const originData = fs.readFileSync(filePath, 'utf-8') || JSON.stringify({})
      outputData = JSON.parse(originData)
    }
    outputData[data.time] = data.data
    return JSON.stringify(outputData)
  }
  public createAnalyzer(html: string, filePath: string) {
    const data = this.getData(html)
    const fileContent = this.readFile(data, filePath)
    return fileContent
  }
  private constructor() { }
  private static instance: Analyzer
  public static createInstance() {
    if (!Analyzer.instance) {
      Analyzer.instance = new Analyzer
    }
    return Analyzer.instance
  }
}

export default Analyzer
