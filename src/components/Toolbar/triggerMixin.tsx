import { useDispatch, useSelector } from 'react-redux'
import { setIsFullScreen, setActivedToolbar } from '@/store/reducers/GobalReducer'
import { reducerIState } from '@/store/type'
import { IObj } from '@/utils/type'
import { useLocation } from 'react-router-dom'

function useTriggerMixin() {
  let dispatch = useDispatch()
  let location = useLocation()
  // let navigate = useNavigate()
  let { isHideHeader, isHideAside, activedToolbar } = useSelector((state: reducerIState) => state.gobalReducer)

  function clearActived() {
    dispatch(setActivedToolbar({}))
  }
  function setActived(item: IObj) {
    // 第一种情况：toolbar不能点击
    if (location.pathname != '/home') return dispatch(setActivedToolbar({}))
    // 第二种：回到首页
    // if (location.pathname != '/home') {
    //   navigate('/home')
    // }
    dispatch(setActivedToolbar(item.id === activedToolbar.id ? {} : JSON.parse(JSON.stringify(item))))
  }
  // 全图
  function positionHandler() {
    clearActived()
  }
  // 标绘
  function plottingHandler(item: IObj, flag: boolean = true) {
    flag && setActived(item)
  }
  // 测面
  function rangingHandler(item: IObj, flag: boolean = true) {
    flag && setActived(item)
  }
  // 测面
  function surfaceMeasurementHandler(item: IObj, flag: boolean = true) {
    flag && setActived(item)
  }
  // 属性
  function attributeQueryHandler(item: IObj, flag: boolean = true) {
    flag && setActived(item)
  }
  // 数据叠加
  function dataOverlayHandler(item: IObj, flag: boolean = true) {
    flag && setActived(item)
  }
  // 条件定位
  function conditionPositionHandler(item: IObj, flag: boolean = true) {
    flag && setActived(item)
  }
  // 清除
  function clearHandler() {
    clearActived()
  }
  // 全屏
  function fullScreenHandler() {
    // 是否设置全屏
    dispatch(setIsFullScreen(!(isHideHeader && isHideAside)))
    // clearActived()
  }
  return {
    clearActived,
    positionHandler,
    plottingHandler,
    rangingHandler,
    surfaceMeasurementHandler,
    attributeQueryHandler,
    dataOverlayHandler,
    clearHandler,
    fullScreenHandler,
    conditionPositionHandler,
  }
}

export default useTriggerMixin
