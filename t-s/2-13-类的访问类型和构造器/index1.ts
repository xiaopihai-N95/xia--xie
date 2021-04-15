class Person {
  // 传统写法
  /* public name: string
  constructor(name: string) {
    this.name = name
  } */
  // 优雅的写法
  constructor(public name: string) {}
}

class Chef extends Person {
  constructor(public name: string, public age: number) {
    super(name)  // 即使父类是空的, 也要调用 super()
  }
  public sayInfo() {
    return this.name + ', ' + this.age
  }
}

const person = new Person('genji')
console.log(person.name)
const chef = new Chef('roadhog', 30)
console.log(chef.sayInfo())