import superagent from 'superagent'
import fs from 'fs'
import path from 'path'
import DellAnalyzer from './dellAnalyzer';

export interface Analyzer {
  analyze: (html: string, path: string) => string 
}

class Crowler {
  private path = path.resolve(__dirname, '../data/course.json')

  private async getRawHtml() {
    const html = await superagent.get(this.url)
    // console.log(html.text)
    return html.text
  }

  //! 提取信息的方法, 拆分走

  private writeFile(content: string) {
    fs.writeFileSync(this.path, content)
  }

  private async initSpiderProcess() {
    const html = await this.getRawHtml()
    //! 提取信息, 拆分走 
    const result = this.analyzer.analyze(html, this.path)
    this.writeFile(result)
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess()
  }
}

const key = 'x3b174jsx'
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`

const analyzer = DellAnalyzer.CreateInstance()
new Crowler(url, analyzer)
