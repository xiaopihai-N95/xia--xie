import fs from 'fs'
import path from 'path'
import superagent from 'superagent'
import Analyzer from './analyzer'

export interface CrowlerAnalyzer {
  analyzer: (content: string, filePath: string) => string
}

class Crowler {
  private filePath = path.resolve(__dirname, '../data/data.json')

  async getHtml(url: string) {
    const html = await (await superagent.get(url)).text
    return html
  }
  
  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }
  async initSpiderProcess() {
    const html = await this.getHtml(url)
    const fileContent = analyzerInstance.analyzer(html, this.filePath)
    this.writeFile(fileContent)
  }
  constructor(private url: string, private analyzerInstance: CrowlerAnalyzer) {
    this.initSpiderProcess()
  }
}


const key = 'x3b174jsx'
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${key}`
const analyzerInstance = Analyzer.createInstance()
new Crowler(url, analyzerInstance)
