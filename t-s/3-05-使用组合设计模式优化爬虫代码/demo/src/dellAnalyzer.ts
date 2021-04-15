import cheerio from 'cheerio'
import fs from 'fs'
import { Analyzer } from './crowler'

interface DataFormat {
  name: string
  count: number
}
interface Result {
  time: number
  data: DataFormat[]
}
interface FinalResult {
  [propName: number]: DataFormat[]
}
  
export default class DellAnalyzer implements Analyzer {
  // 提取需要的内容(迁移)
  private getSourceInfo(content: string, path: string) {
    const $ = cheerio.load(content)
    const items = $('.course-item')
    const data: DataFormat[] = []
    items.map((index, item) => {
      const lessonInfo = $(item).find('.course-desc')
      const lessonName = lessonInfo.eq(0).text()
      const count = parseInt(lessonInfo.eq(1).text().split('：')[1], 10)
      data.push({name: lessonName, count})
    })
    const result: Result = {
      time: new Date().getTime(),
      data
    }
    let fileContent: FinalResult = {}
    if (fs.existsSync(path)) {
      const fileStr = fs.readFileSync(path, 'utf-8')
      fileContent = fileStr ? JSON.parse(fileStr) : fileContent
    }
    fileContent[result.time] = result.data
    // console.log(fileContent)
    return JSON.stringify(fileContent)
  }

  public analyze(html: string, path: string) {
    const result = this.getSourceInfo(html, path)
    return result
  }
}