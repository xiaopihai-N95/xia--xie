import $ from 'jquery'

$(() => {
  $('body').html('<div>自己写的类型描述文件</div>')
})


interface Person {
  name: string
  age: number
  gender: string
}

class Teacher {
  constructor(private info: Person) { }
  getInfo<T extends keyof Person>(key: T): Person[T] {
    return this.info[key]
  }
}

const teacher = new Teacher({
  name: 'dell',
  age: 30,
  gender: 'male'
})

// 如果没有使用 泛型 + keyof , key的类型推断不出来, 为 'any'
// 期望的效果是根据传入的 key 推断出 interface 里对应的 key 的类型
const key = teacher.getInfo('gender')

console.log(key)