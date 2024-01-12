interface IFn {
  (arg: string): void
}
interface IObj {
  [prop: string]: any
}

export {
  IFn, IObj
}