// ts -> .d.ts 翻译文件 -> js
import superagent from 'superagent'
import cheerio from 'cheerio'
import fs from 'fs'
import path from 'path'

// 定义爬取的原始数据
interface CourseInfos {
  title: string
  count: number
}
// 定义打印结果
interface finalResult {
  time: number
  data: CourseInfos[]
}
// 定义存储结果
interface Content {
  [propName: number]: CourseInfos[]
}

class Crowler {
  private secret = 'x3b174jsx'
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`
  private filePath = path.resolve(__dirname, '../data/course.json')
  // 获取网页源代码字符串
  async getRawHtml() {
    const result = await superagent.get(this.url)
    // console.log(result.text)
    return result.text
  }
  // 提取目标数据
  getCourseInfo(html: string) {
    const $ = cheerio.load(html)
    // console.log($)
    const courseItems = $('.course-item')
    const courseInfos: CourseInfos[] = []
    const finalResult: finalResult = { time: new Date().getTime(), data: courseInfos }
    courseItems.map((index, ele) => {
      const descs = $(ele).find('.course-desc')
      const title = descs.eq(0).text()
      const count = parseInt(descs.eq(1).text().split('：')[1], 10)
      // console.log(title, count)
      courseInfos.push({ title, count })
    })
    // console.log(finalResult)
    return finalResult
  }
  // 总控
  async initSpiderProcess() {
    // 获取网页源代码
    const html = await this.getRawHtml()
    // 提取需要的内容
    const result = this.getCourseInfo(html)
    const fileContent = this.getJSONContent(result)
    this.writeFile(fileContent)
    console.log('successed!!')
  }
  // 创建或读取数据文件
  getJSONContent(result: finalResult) {
    let fileContent: Content = {}
    // 处理有目标文件但内容为空的情况
    if (fs.existsSync(this.filePath)) {
      let originContent = fs.readFileSync(this.filePath, 'utf-8')
      originContent = originContent ? originContent : JSON.stringify({})
      fileContent = JSON.parse(originContent)
    }
    fileContent[result.time] = result.data
    return JSON.stringify(fileContent)
  }
  // 写入新数据
  writeFile(fileContent: string) {
    fs.writeFileSync(this.filePath, fileContent)
  }
  constructor() {
    // console.log(this.url)
    this.initSpiderProcess()
  }
}

const crowler = new Crowler()
