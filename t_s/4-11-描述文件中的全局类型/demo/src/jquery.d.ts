// 定义全局变量
// declare var $: (param: () => void) => void

// 定义全局函数
declare function $(param: () => void): void

// 函数重载, 可以定义多个同名但参数不一样的函数
/* declare function $(param: string): {
  html: (param: string) => {}
} */
// 优化一下
interface JqueryInstance {
  html: (param: string) => JqueryInstance
}

declare function $(param: string): JqueryInstance

// 再优化(使用接口实现函数重载)
/* interface Jquery {
  (param: () => void): void
  (param: string): JqueryInstance
}
declare var $: Jquery */

// 定义对象和类, 以及命名空间的嵌套
declare namespace $ {
  namespace fn {
    class init {}
  }
}