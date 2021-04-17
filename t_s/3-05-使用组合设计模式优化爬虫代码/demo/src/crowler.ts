import superagent from 'superagent'
import fs from 'fs'
import path from 'path'
import DellAnalyzer from './dellAnalyzer'

export interface Analyzer {
  analyze: (html: string, path: string) => string
}

class Crowler {
  private path = path.resolve(__dirname, '../data/course.json')
  // 获取网页源代码字符串
  async getRawHtml() {
    // console.log(this.url)
    const html = await superagent.get(this.url)
    // console.log(html.text)
    return html.text
  }

  //! 提取需要的内容(已迁移)

  // 写入文件
  writeFile(content: string) {
    fs.writeFileSync(this.path, content)
  }

  // 爬虫过程
  async initSpiderProcess() {
    const html = await this.getRawHtml()
    //! 辊距网页源代码提取需要的数据(已迁移)
    const fileContent = this.analyzer.analyze(html, this.path)
    this.writeFile(fileContent)
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess()
  }
}

const key = 'x3b174jsx'
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`

const analyzer = new DellAnalyzer()
new Crowler(url, analyzer)
