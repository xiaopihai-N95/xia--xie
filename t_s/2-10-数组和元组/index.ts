// 数组
const arr: (number | string)[] = [1, '2', 3]

// 类型别名
type User = {
  name: string,
  age: number
}
const objArr: User[] = [{
  name: 'genji',
  age: 28
}]

class Hero {
  name: string
  age: number
}

const heroArr: Hero[] = [{
  name: 'lucio',
  age: 30
}]

// 元组
const studentinfo: [string, number, string] = ['崔佛', 40, 'fly']
// 上面元组比这个类型别名严格, 这个只要每个元素都在类型范围中就可以, 甚至对元素个数都没有限制
const studaentinfo1: (string | number)[] = ['崔佛', 40, 123, 'fly']
