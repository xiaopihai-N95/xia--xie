// 上一节的做法简单存在不周到的地方, 现在这种是标准的做法
function factoryPersonDecorator () {
  return function personDecorator<T extends new (...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
      name = 'lucio'
      getName() {
        return this.name
      }
    }
  }
}

const Person = factoryPersonDecorator()(
  class {
    name: string
    constructor(name: string) {
      this.name = name
    }
  }
)

const person = new Person('genji')
console.log(person.getName())