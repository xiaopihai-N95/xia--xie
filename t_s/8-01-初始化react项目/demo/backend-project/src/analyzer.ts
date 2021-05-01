import fs from 'fs'
import cheerio from 'cheerio'
import { DellAnalyzer } from './crowler'

interface LessonItem {
  name: string
  count: number
}
interface Data {
  time: number
  data: LessonItem[]
}
interface FileContent {
  [key: number]: LessonItem[]
}

class Analyzer {
  private constructor() { }
  private getData(html: string): Data {
    const $ = cheerio.load(html)
    const items = $('.course-item')
    const data: LessonItem[] = []
    const result: Data = { time: new Date().getTime(), data }
    items.map((index, ele) => {
      const lesson = $(ele).find('.course-desc')
      const name = lesson.eq(0).text()
      const count = parseInt(lesson.eq(1).text().split('：')[1])
      data.push({ name, count })
    })
    return result
  }
  private readFile(data: Data, filePath: string): string {
    let fileContent: FileContent = {}
    if (fs.existsSync(filePath)) {
      const originContent = fs.readFileSync(filePath, 'utf-8') || JSON.stringify({})
      fileContent = JSON.parse(originContent)
    }
    fileContent[data.time] = data.data
    return JSON.stringify(fileContent)
  }
  analyzer(html: string, filePath: string): string {
    const data = this.getData(html)
    const fileContent = this.readFile(data, filePath)
    return fileContent
  }
  private static instance: DellAnalyzer
  static createInstance() {
    if (!Analyzer.instance) {
      Analyzer.instance = new Analyzer
    }
    return Analyzer.instance
  }
}

export default Analyzer
