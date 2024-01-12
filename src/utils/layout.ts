import { store } from '@/store'

function getPxToRem(px: number) {
  let state = store.getState()
  let fontSize = state.gobalReducer.fontSize
  return Number((px / fontSize).toFixed(2))
}
export {
  getPxToRem
}