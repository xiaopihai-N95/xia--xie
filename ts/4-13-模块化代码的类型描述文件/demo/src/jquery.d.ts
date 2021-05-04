// es6 模块化
declare module 'jquery' {
  interface JqueryInstance {
    html: (html: string) => JqueryInstance
  }

  function $(param: () => void): void
  function $(param: string): JqueryInstance
  
  namespace $ {
    namespace fn {
      class init {}
    }
  }
  export = $
}