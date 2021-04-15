interface Person1 {
  name: string
  age?: number
  [propName: string]: any
  say (): string
}

// 类实现接口
class User implements Person1 {
  name = 'user1'
  say() {
    return 'i am a user'
  }
}
// 实例化
const user = new User()
console.log(user, user.say())

// 接口继承
interface Teacher extends Person1 {
  job: string
}

// 入参待传对象
const teacher1 = {
  name: 'sigma',
  say() {
    return 'i am a teacher'
  },
  job: 'teacher'
}

// 定义方法
const getinfo = (teacher: Teacher): void => {
  console.log(teacher, teacher.say())
}
// 调用方法
getinfo(teacher1)

// 函数接口
interface SayHi {
  (word: string): string
}

const sayhi: SayHi = (word: string) => {
  console.log(word)
  return word
}

sayhi('hi')