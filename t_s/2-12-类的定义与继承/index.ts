class Person {
  name: string
  constructor(name: string) {
    this.name = name
  }
  getName() {
    return this.name
  }
}

const person = new Person('peter')
console.log(person.getName())

// 继承
class Teacher extends Person {
  age = 18
  getInfo() {
    return [this.name, this.age]
  }
}

const teacher = new Teacher('Mccree')
console.log(teacher.getInfo())

// 重写
class Teacher1 extends Person {
  familyName: string
  constructor(name: string, familyName: string) {
    super(name)
    this.familyName = familyName
  }
  // 重写了父类的 getName 方法
  getName() {
    return super.getName() + ' ' + this.familyName
  }
  showName(): void {
    console.log(this.getName())
  }
}

const teacher1 = new Teacher1('Jesse', 'Mccree')
teacher1.showName()