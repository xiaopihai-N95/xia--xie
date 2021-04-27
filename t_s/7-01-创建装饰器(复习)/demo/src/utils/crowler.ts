import fs from 'fs'
import path from 'path'
import superagent from 'superagent'

export interface CrowlerAnalyzer {
  analyzer: (content: string, filePath: string) => string
}

class Crowler {
  private filePath = path.resolve(__dirname, '../../data/data.json')

  async getHtml(url: string) {
    const html = await (await superagent.get(url)).text
    return html
  }
  
  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }
  async initSpiderProcess() {
    const html = await this.getHtml(this.url)
    const fileContent = this.analyzerInstance.analyzer(html, this.filePath)
    this.writeFile(fileContent)
  }
  constructor(private url: string, private analyzerInstance: CrowlerAnalyzer) {
    this.initSpiderProcess()
  }
}

export default Crowler
