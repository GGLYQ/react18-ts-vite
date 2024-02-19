import { store } from '@/store/index'
import { setexcuteMapMethod } from '@/store/reducers/GisWholeReducer'

function excuteMapMethod(name: string, ...params: any[]) {
  const methodProxy = {
    method: name,
    params
  }
  store.dispatch(setexcuteMapMethod(methodProxy))
}
export default {
  excuteMapMethod
}