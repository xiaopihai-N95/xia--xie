// 访问类型: private, protected, public
// public 允许在类的内外被调用
// private 允许在类内被使用
// protected 允许在类内和继承的子类使用
class Person {
  public name: string
  private age: number = 40
  protected hobby: string = 'cooking'
  public showAge(): number {
    return this.age
  }
}

class Chef extends Person {
  public showHobby() {
    return this.hobby
  }
}
const person = new Person()
person.name = 'mccree'
// person.age = 40  // 这句代码会报错, 因为person.age 属性是私有属性类外不可调用

console.log(person.name, person.showAge())

const chef = new Chef()
console.log(chef.showHobby())