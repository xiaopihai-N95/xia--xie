import fs from 'fs'
import path from 'path'
import superagent from 'superagent'

export interface CrowlerAnalyzer {
  analyzer: (html: string, filePath: string) => string
}

class Crowler {
  private filePath = path.resolve(__dirname, '../data/data.json')
  async getHtml(url: string) {
    const html = await (await superagent.get(url)).text
    return html
  }
  
  writeFile(fileContent: string) {
    fs.writeFileSync(this.filePath, fileContent)
  }
  async initSpiderProcess() {
    const html = await this.getHtml(this.url)
    const fileContent = this.crowlerAnalyzer.analyzer(html, this.filePath)
    this.writeFile(fileContent)
  }
  constructor(private url: string, private crowlerAnalyzer: CrowlerAnalyzer) {
    this.initSpiderProcess()
  }
}

export default Crowler
