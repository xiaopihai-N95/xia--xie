import superagent from "superagent"
import fs from 'fs'
import path from 'path'

export interface Analyzer {
  analyzer: (html: string, filePath: string) => string
}

class Crowler {
  private target = path.resolve(__dirname, '../data/crowler.json')
  async getSource() {
    const html = await (await superagent.get(this.url)).text
    // console.log(html)
    return html
  }
  
  async writeFile(data: string) {
    fs.writeFileSync(this.target, data)
  }
  async initSpiderProcess() {
    const html = await this.getSource()
    const fileDataResult = await this.analyzer.analyzer(html, this.target)
    this.writeFile(fileDataResult)
  }
  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess()
  }
}

export default Crowler
