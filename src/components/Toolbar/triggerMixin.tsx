import { useDispatch, useSelector } from 'react-redux'
import { setIsFullScreen } from '@/store/reducers/GobalReducer'
import { reducerIState } from '@/store/type'

function useTriggerMixin() {
  let dispatch = useDispatch()
  let { isHideHeader,isHideAside } = useSelector((state: reducerIState) => state.gobalReducer)

  // 全图
  function positionHandler() {}
  // 测面
  function rangingHandler() {}
  // 属性
  function surfaceMeasurementHandler() {}
  // 数据叠加
  function attributeQueryHandler() {}
  // 清除
  function clearHandler() {}
  // 全屏
  function fullScreenHandler() {
    // 设置全屏
    console.log('设置全屏')
    dispatch(setIsFullScreen(!(isHideHeader && isHideAside)))
  }
  return {
    positionHandler,
    rangingHandler,
    surfaceMeasurementHandler,
    attributeQueryHandler,
    clearHandler,
    fullScreenHandler,
  }
}

export default useTriggerMixin
