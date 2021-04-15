// 基础类型
const count: number = 2233
const heroName: string = 'd.va'

// 对象类型
// 对象
const teacher: {
  name: string,
  age: number
} = {
  name: 'xxx',
  age: 25
}

console.log(teacher)

// 数组
const numbers: number[] = [1, 2, 3]

console.log(numbers)

// 类
class Person {}

const mike: Person = new Person()

// 函数
const getTotal: () => number = () => {
  return 123
}