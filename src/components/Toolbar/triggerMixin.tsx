import { useDispatch, useSelector } from 'react-redux'
import { setIsFullScreen, setActivedToolbarId } from '@/store/reducers/GobalReducer'
import { reducerIState } from '@/store/type'
import { IObj } from '@/utils/type'

function useTriggerMixin() {
  let dispatch = useDispatch()
  let { isHideHeader, isHideAside, activedToolbarId } = useSelector((state: reducerIState) => state.gobalReducer)

  function clearActived() {
    dispatch(setActivedToolbarId(''))
  }
  function setActived(id: string) {
    dispatch(setActivedToolbarId(activedToolbarId === id ? '' : id))
  }
  // 全图
  function positionHandler() {
    clearActived()
  }
  // 标绘
  function plottingHandler(item: IObj) {
    setActived(item.id)
  }
  // 测面
  function rangingHandler(item: IObj) {
    setActived(item.id)
  }
  // 测面
  function surfaceMeasurementHandler(item: IObj) {
    setActived(item.id)
  }
  // 属性
  function attributeQueryHandler(item: IObj) {
    setActived(item.id)
  }
  // 数据叠加
  function dataOverlayHandler(item: IObj) {
    setActived(item.id)
  }
  // 清除
  function clearHandler() {
    clearActived()
  }
  // 全屏
  function fullScreenHandler() {
    // 是否设置全屏
    dispatch(setIsFullScreen(!(isHideHeader && isHideAside)))
    clearActived()
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
