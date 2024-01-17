import { IObj } from './type'

function existAttribute(params: IObj, attr: string) {
  return Object.prototype.hasOwnProperty.call(params, attr) && typeof params[attr] === 'string'
}
export { existAttribute }