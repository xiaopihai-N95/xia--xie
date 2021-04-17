declare module 'jquery' {
  interface JqueryInstance {
    html: (param: string) => JqueryInstance
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