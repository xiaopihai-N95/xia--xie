interface Bird {
  fly: boolean
  sing: () => {}
}

interface Dog {
  fly: boolean
  bark: () => {}
}

// 类型断言的方式做类型保护
function trainAnimal(animal: Bird | Dog) {
  // 输入 animal. 时语法提示只提示联合类型共有的属性
  if (animal.fly) {
    (animal as Bird).sing()
  }
  (animal as Dog).bark()
}

// in 语法来做类型保护
function trainAnimalSecond(animal: Bird | Dog) {
  if ('sing' in animal) {
    animal.sing()
  } else {
    animal.bark()
  }
}

// typeof 语法做类型保护
function add(first: string | number, second: string | number) {
  if (typeof first === 'string' || typeof second === 'string')
    return `${first} ${second}`
  return first + second
}


// 使用 instanceof 语法做类型保护(这个是 class 不能用 interface)
class NumberObj {
  count!: number
}

function addSecond(first: object | NumberObj, second: object | NumberObj):number {
  if (first instanceof NumberObj && second instanceof NumberObj)
    return first.count + second.count
  return 0
}