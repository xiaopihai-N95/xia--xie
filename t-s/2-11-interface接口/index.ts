const person = {
  name: 'peter',
  age: 18,
  hobby: 'cooking',
  sex: 'man',
  say() {
    return 'ts'
  }
}
// js 写法
/* const getPersonName = person => {
  console.log(person.name)
} */
// ts 写法
/* const getPersonName = (person: { name: string }): void => {
  console.log(person.name)
}
getPersonName(person) */


// js 写法
/* const setPersonName = (person, name) => {
  person.name = name
} */
// ts 写法
/* const setPersonName = (person: { name: string }, name: string): void => {
  person.name = name
}
setPersonName(person, 'lucy')
getPersonName(person) */

//^ 更优雅的做法就是用 interface
interface Person {
  name: string
  age: number
  hobby?: string  // 可有可无
  readonly sex: string  // 只读, 无法 set 该属性
  [propName: string]: any  // 不确定的属性
  say(): string
}

const getPersonName = (person: Person): void => {
  console.log(person.name, person.hobby, person.sex)
}
const setPersonName = (person: Person, name: string, sex: string): void => {
  person.name = name
  // person.sex = sex  // 报错, 因为是只读属性
}
getPersonName(person)  // 这个不会报错, 对引用的地址没有那么严格, 但是接口声明的属性一定要有
getPersonName({ name: 'lily', age: 23, hobby: 'dancing', sex: 'woman', say() { return 'hello'} }) // 这个会报错, 对字面量会严格检查

