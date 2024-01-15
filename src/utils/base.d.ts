interface IFn {
  (arg: string): void
}
interface IObj {
  [prop: string]: any
}
interface IRouter{
  navigate:function, location:object, params:objec, searchParams:objec
}
export {
  IFn, IObj,IRouter
}