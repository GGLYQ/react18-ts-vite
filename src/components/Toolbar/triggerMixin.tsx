import { useDispatch, useSelector } from 'react-redux'
import { setIsFullScreen } from '@/store/reducers/GobalReducer'
import { reducerIState } from '@/store/type'

function useTriggerMixin() {
  let dispatch = useDispatch()
  let { isHideHeader, isHideAside } = useSelector((state: reducerIState) => state.gobalReducer)

  // 全图
  function positionHandler() {}
  // 标绘
  function plottingHandler() {}
  // 测面
  function rangingHandler() {}
  // 测面
  function surfaceMeasurementHandler() {}
  // 属性
  function attributeQueryHandler() {}
  // 数据叠加
  function dataOverlayHandler() {}
  // 清除
  function clearHandler() {}
  // 全屏
  function fullScreenHandler() {
    // 是否设置全屏
    dispatch(setIsFullScreen(!(isHideHeader && isHideAside)))
  }
  return {
    positionHandler,
    plottingHandler,
    rangingHandler,
    surfaceMeasurementHandler,
    attributeQueryHandler,
    dataOverlayHandler,
    clearHandler,
    fullScreenHandler,
  }
}

export default useTriggerMixin
