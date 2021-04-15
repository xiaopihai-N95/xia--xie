// 基础类型: string, number, boolean, undefined, null, symbol, void
let count: number
count = 123

// 对象类型: {}, [], class, function
const func = (str: string) => {
  return parseInt(str, 10)
}

const func1: (str: string) => number = str => {
  return parseInt(str, 10)
}

const date = new Date()

interface Person {
  name: string
}
const rawData = '{"name": "D.va"}'
const newData: Person = JSON.parse(rawData)

let temp: number | string = 124
temp = '345'
console.log(temp, typeof temp)