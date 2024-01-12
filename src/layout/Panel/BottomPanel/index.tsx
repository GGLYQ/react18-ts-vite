import React, { useEffect, useState, useCallback, useRef } from 'react'
import type { PropType } from '../type'
import { useDispatch } from 'react-redux'
// import { setBottomPanelHeight } from '@/store/reducers/LayoutReducer'
import './index.scss'

let BottomPanel = (props: PropType) => {
  const dispatch = useDispatch()
  const currentRef = useRef<HTMLInputElement | null>(null)
  let [bottomHeight] = useState<number>(0)
  const setLayoutFn = useCallback(() => {
    // dispatch(setBottomPanelHeight(bottomHeight))
  }, [dispatch, bottomHeight])

  useEffect(() => {
    setLayoutFn()
    console.log("BottomPanel",currentRef) // 获取DOM元素
    return () => {}
  }, [setLayoutFn])
  let Element = props.slot
  return (
    <div ref={currentRef} className='bottom-panel-wrapper'>
      {Element ? <Element /> : null}
    </div>
  )
}
export default BottomPanel
