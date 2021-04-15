// 抽象类
// 抽象类就是各类的共同的行为
// 抽象类不一定都是抽象方法, 也可以有其他的具体的实现
// 抽象类只能被继承不能被实例化, 只能继承, 而且一个子类只能继承一个抽象类
// 子类继承了抽象类就要实现抽象类里面的所有方法, 不然这个子类也只能是抽象类
// 抽象方法不能是 private , 因为 private 是类外访问不到的.
abstract class Geom {
  // 抽象方法
  abstract getArea(): number
  // 非抽象
  getClassName() {
    return 'Gemo'
  }
}

class Circle extends Geom {
  getArea() {
    return 123
  }
}

// 接口(区分一下这两个)
// 抽象类里面可以有方法的实现，但是接口完全都是抽象的，不存在方法的实现；
// 子类只能继承一个抽象类，而接口可以被多个实现；
// 抽象方法可以是public，protected，但是接口只能是public，默认的；
// 抽象类可以有构造器，而接口不能有构造器；
interface Person {
  name: string
}

interface Teacher extends Person {
  age: number
}

interface Devloper extends Person {
  lang: string
}

const getTeacherInfo = (teacher: Teacher) => {
  return teacher.name + ', ' + teacher.age
}

const getDevloperInfo = (devloper: Devloper) => {
  return devloper.name + ', ' + devloper.lang
}

const teacher1 = {
  name: 'peter',
  age: 30
}

const devloper1 = {
  name: 'mike',
  lang: 'ts'
}

console.log(getDevloperInfo(devloper1))
console.log(getTeacherInfo(teacher1))