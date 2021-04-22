class Test {
  static heroName_ = 'd.va'
  @heroNameDecorator
  static get heroName() {
    return this.heroName_
  }
}

const pro = Test.prototype

function heroNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log(target.constructor)
}

const hero = new Test
console.log(Test.heroName)