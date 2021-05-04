import superagent from 'superagent'
import fs from 'fs'
import path from 'path'
import DellAnalyzer from './dellAnalyzer'

interface Analyzer {
  analyzer: (html: string, filePath: string) => string
}

class Crowler {
  private filePath = path.resolve(__dirname, '../data/crowler.json')
  
  async getHtml(url: string) {
    const html = await (await superagent.get(url)).text
    return html
  }
  
  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }
  async initSpiderProcess() {
    const html = await this.getHtml(this.url)
    const fileContent = this.dellAnalyzer.analyzer(html, this.filePath)
    this.writeFile(fileContent)
  }
  constructor(private url: string, private dellAnalyzer: Analyzer) {
    this.initSpiderProcess()
  }
}

export default Crowler
