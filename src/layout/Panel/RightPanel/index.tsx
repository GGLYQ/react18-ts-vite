import React, { useEffect, useState, useCallback,useRef } from 'react'
import type { PropType } from '../type'
import { useDispatch } from 'react-redux'
// import { setRightPanelWidth } from '@/store/reducers/LayoutReducer'
import "./index.scss"

let RightPanel = (props: PropType) => {
  const dispatch = useDispatch()
  const currentRef = useRef<HTMLInputElement | null>(null)
  // let { rightPanelWidth} = useSelector((state: MapState) => state.layoutReducer)
  let [rightWidth] = useState<number>(0)

  const setLayoutFn = useCallback(() => {
    // dispatch(setRightPanelWidth(rightWidth))
  }, [dispatch, rightWidth])
  useEffect(() => {
    setLayoutFn()
    console.log("RightPanel",currentRef) // 获取DOM元素
    // return 清理工作
    return () => {}
  }, [setLayoutFn])
  let Element = props.slot
  return <div ref={currentRef} className='right-panel-wrapper'>{Element ? <Element /> : null}</div>
}
export default RightPanel
