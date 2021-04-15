class Person {
  constructor(private _name: string) { }
  get name() {
    return this._name
  }
  set name(name: string) {
    this._name = name
  }
}

const person = new Person('genji')
console.log(person.name)
person.name = 'Ziegler'
console.log(person.name)


// 单例模式
class Demo {
  // 把 constructor 设定为私有属性就限制了 new 关键字的创建
  private constructor(private name: string) { }
  // static 是该属性是类上的属性, 不是实例上的, 只能由类调用, 再加上 private 就无法从类外访问到了
  private static instance: Demo
  static getInstance(name: string) {
    if (!this.instance) {
      this.instance = new Demo(name)
    }
    return this.instance
  }
  public showName() {
    return this.name
  }
}

const demo1 = Demo.getInstance('roadhog')
const demo2 = Demo.getInstance('Junkrat')

console.log(demo1.showName(), demo2.showName())
console.log(demo1 === demo2)