import cheerio from 'cheerio'
import fs from 'fs'
import { Analyzer } from './crowler'

interface Lesson {
  name: string,
  count: number
}

interface Data {
  time: number,
  data: Lesson[]
}

interface FinalResult {
  [propName: number]: Lesson[]
}

export default class DellAnalyzer implements Analyzer {
  private getSourseInfo(html: string, path: string) {
    const $ = cheerio.load(html)
    const itemArr = $('.course-item')
    const result: Lesson[] = []
    const data: Data = {
      time: new Date().getTime(),
      data: result
    }
    let originContent:string = ''
    let finalResult: FinalResult = {}
    itemArr.map((index, item) => {
      const courseInfo = $(item).find('.course-desc')
      const name = courseInfo.eq(0).text()
      const count = parseInt(courseInfo.eq(1).text().split('：')[1], 10)
      const lessonItem: Lesson = { name, count }
      result.push(lessonItem)
    })
    if (fs.existsSync(path)) {
      originContent = fs.readFileSync(path, 'utf-8')
      finalResult = originContent ? JSON.parse(originContent) : {}
    }
    finalResult[data.time] = data.data
    console.log(finalResult)
    return JSON.stringify(finalResult)
  }
  
  analyze(html: string, path: string) {
    const result = this.getSourseInfo(html, path)
    return result
  }

  private constructor() { }
  private static instance: DellAnalyzer
  public static CreateInstance() {
    if (!DellAnalyzer.instance) {
      DellAnalyzer.instance = new DellAnalyzer()
    }
    return DellAnalyzer.instance
  }
}
