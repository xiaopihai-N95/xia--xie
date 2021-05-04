import fs from 'fs'
import path from 'path'
import superagent from 'superagent'

export interface DellAnalyzer {
  analyzer: (html: string, filePath: string) => string
}

class Crowler {
  private filePath = path.resolve(__dirname, '../data/data.json')
  async getHtml(url: string) {
    const html = await (await superagent.get(url)).text
    return html
  }
  
  writeFile(fileContent: string): void {
    fs.writeFileSync(this.filePath, fileContent)
  }
  async initSpiderProcess() {
    const html = await this.getHtml(this.url)
    const fileContent = this.analyzer.analyzer(html, this.filePath)
    this.writeFile(fileContent)
  }
  constructor(private url: string, private analyzer: DellAnalyzer) {
    this.initSpiderProcess()
  }
}

export default Crowler
