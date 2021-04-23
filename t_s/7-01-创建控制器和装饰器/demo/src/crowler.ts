import superagent from 'superagent'
import fs from 'fs'
import path from 'path'
import Analyzer from './analyzer'

export interface AnalyzerInstance {
  createAnalyzer: (html: string, filePath: string) => string
}

class Crowler {
  private filePath = path.resolve(__dirname, '../data/data.json')

  async getHtml() {
    const html = await (await superagent.get(url)).text
    return html
  }
  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }
  async initSpiderProcess() {
    const html = await this.getHtml()
    const fileContent = CourseAnalyzer.createAnalyzer(html, this.filePath)
    this.writeFile(fileContent)
  }
  constructor(url: string, CourseAnalyzer: AnalyzerInstance) {
    this.initSpiderProcess()
  }
}

const key = 'x3b174jsx'
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`
const CourseAnalyzer = Analyzer.createInstance()
new Crowler(url, CourseAnalyzer)
