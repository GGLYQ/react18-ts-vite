import React, { useEffect, useState, useCallback, useRef } from 'react'
import type { PropType } from '../type'
import { useDispatch } from 'react-redux'
import { getPxToRem } from '@/utils/layout'
import { setBottomPanelHeight } from '@/store/reducers/LayoutReducer'
import './index.scss'

let BottomPanel = (props: PropType) => {
  const dispatch = useDispatch()
  const currentRef = useRef<HTMLInputElement | null>(null)
  // let [bottomHeight, setBottomHeight] = useState<number>(0)

  // 设置底部布局的高度
  const setLayoutFn = useCallback(() => {
    let clientHeight = currentRef.current?.clientHeight // 获取DOM元素
    let clientHeightRem = clientHeight ? getPxToRem(clientHeight) : 0
    // setBottomHeight(clientHeightRem)
    dispatch(setBottomPanelHeight(clientHeightRem))
    // console.log(bottomHeight);
  }, [dispatch])

  useEffect(() => {
    setLayoutFn()
    // console.log("BottomPanel",currentRef) // 获取DOM元素
    return () => {}
  }, [setLayoutFn])
  let Element = props.slot
  return (
    <div id='bottomPanelWrapper' className='bottom-panel-wrapper' ref={currentRef}>
      {Element ? <Element /> : null}
    </div>
  )
}
export default BottomPanel
