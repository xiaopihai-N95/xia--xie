import superagent from 'superagent'
import fs from 'fs'
import path from 'path'

export interface AnalyzerInstance {
  createAnalyzer: (html: string, filePath: string) => string
}

class Crowler {
  private filePath = path.resolve(__dirname, '../../data/data.json')

  async getHtml() {
    const html = await (await superagent.get(this.url)).text
    return html
  }
  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }
  async initSpiderProcess() {
    const html = await this.getHtml()
    const fileContent = this.CourseAnalyzer.createAnalyzer(html, this.filePath)
    this.writeFile(fileContent)
  }
  constructor(private url: string, private CourseAnalyzer: AnalyzerInstance) {
    this.initSpiderProcess()
  }
}

export default Crowler
