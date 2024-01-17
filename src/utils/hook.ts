import type { IFn, IObj } from "./type"
type ArrayParamType = [string, IFn, ...any]

// 监听props
function watchProps(newObj: IObj, oldObj: IObj, ...otherParams: Array<ArrayParamType>) {
  otherParams.map((item: any[]) => {
    let [attr, callback, ...otherItemParams] = item
    let hasOwnProperty = Object.prototype.hasOwnProperty.call(newObj.props, attr)
    if (hasOwnProperty) {
      let isEqual = newObj.props[attr] === oldObj[attr]
      !isEqual && callback.bind(newObj)(...otherItemParams)
    }
  })
}

// 监听state
function watchState(newObj: IObj, oldSate: IObj, ...otherParams: Array<ArrayParamType>) {
  otherParams.map((item: any[]) => {
    let [attr, callback, ...otherItemParams] = item
    let hasOwnProperty = Object.prototype.hasOwnProperty.call(newObj.state, attr)
    if (hasOwnProperty) {
      let isEqual = newObj.state[attr] === oldSate[attr]
      !isEqual && callback.bind(newObj)(...otherItemParams)
    }
  })
}

export {
  watchProps,
  watchState
}