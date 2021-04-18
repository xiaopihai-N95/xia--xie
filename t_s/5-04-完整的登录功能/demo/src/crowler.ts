import superagent from 'superagent'
import fs from 'fs'
import path from 'path'

export interface Analyzer {
  analyzer: (html: string, filePath: string) => string
}

class Crowler {
  private filePath = path.resolve(__dirname, '../data/crowler.json')

  async getHtml() {
    const html = await (await superagent.get(this.url)).text
    return html
  }
  
  writeFile(fileData: string) {
    fs.writeFileSync(this.filePath, fileData)
  }
  async initSpiderProcess() {
    const html = await this.getHtml()
    const fileData = this.dellAnalyzer.analyzer(html, this.filePath)
    this.writeFile(fileData)
  }
  constructor(private url: string, private dellAnalyzer: Analyzer) {
    this.initSpiderProcess()
  }
}

export default Crowler
