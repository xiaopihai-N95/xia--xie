function join<T, P>(first: T, second: P) {
  return `${first} ${second}`
}

const res = join<string, number>('1', 1)
console.log(res)

function map<T>(params: Array<T>) {
  return params
}

const mapRes = map<string>(['123'])
console.log(mapRes)
