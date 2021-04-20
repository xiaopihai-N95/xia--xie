// 上一节的做法简单存在不周到的地方, 现在这种是标准的做法
function personDecorator<T extends new (...args: any[]) => {}>(constructor: T) {
  constructor.prototype.getName = () => {
    console.log('genji')
  }
}

@personDecorator
class Person {}

const person = new Person();
(person as any).getName()