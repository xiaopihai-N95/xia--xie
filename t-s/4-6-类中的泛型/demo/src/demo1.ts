class DataManager1<T extends (string | number)> {
  constructor(private data: T[]) { }
  getItem(index: number): T {
    return this.data[index]
  }
}

// 限制 T 只能是 string 或 number
const data1 = new DataManager1([2, 3])

const res1 = data1.getItem(0)

console.log(res1)

function hello<T>(params: T) {
  return params
}

const func: <T>(params: T) => T = hello