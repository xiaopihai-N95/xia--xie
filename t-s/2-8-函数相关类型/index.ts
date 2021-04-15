function add(num1: number, num2: number): number {
  return num1 + num2
}

const result = add(1, 2)
console.log(result)


// void 代表没有返回值, 如果有返回值会报错
function sayHello(): void {
  console.log('hello')
}

sayHello()

// never 代表无法执行到最后的函数(提前抛出异常, 或者死循环)
/* function neverFun (): never {
  throw new Error('404')
  console.log('error')
} 

neverFun() */


// 参数是解构的形式
function getTotalValue({ num1, num2} : { num1: number, num2: number}): number {
  return num1 + num2
}

const res = getTotalValue({ num1: 3, num2: 4 })
console.log(res)