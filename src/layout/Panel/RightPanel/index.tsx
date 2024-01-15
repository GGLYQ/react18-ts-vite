import React, { useEffect, useState, useCallback, useRef } from 'react'
import type { PropType } from '../type'
import type { reducerIState } from '@/store/type'
import { useSelector, useDispatch } from 'react-redux'
import { getPxToRem } from '@/utils/layout'
import { setRightPanelWidth } from '@/store/reducers/LayoutReducer'
import './index.scss'

let RightPanel = (props: PropType) => {
  const dispatch = useDispatch()
  const currentRef = useRef<HTMLInputElement | null>(null)
  let { topPanelHeight, bottomPanelHeight } = useSelector((state: reducerIState) => state.layoutReducer)
  // let [rightWidth, setRightWidth] = useState<number>(0)
  let [style, setStyle] = useState<object>({})

  // 设置右侧面板的宽度
  const setLayoutFn = useCallback(() => {
    let clientWidth = currentRef.current?.clientWidth // 获取DOM元素
    let clientWidthRem = clientWidth ? getPxToRem(clientWidth) : 0
    // setRightWidth(clientWidthRem)
    setStyle({
      width: clientWidthRem + 'rem',
      top: topPanelHeight + 'rem',
      bottom: bottomPanelHeight + 'rem',
    })
    // console.log(rightWidth)
    dispatch(setRightPanelWidth(clientWidthRem))
  }, [dispatch, topPanelHeight, bottomPanelHeight])

  useEffect(() => {
    setLayoutFn()
    // console.log("RightPanel",currentRef) // 获取DOM元素
    // return 清理工作
    return () => {}
  }, [setLayoutFn])
  let Elements = props.slot
  let activePanelName = props.activePanelName
  let ElementsTem = Elements && Elements()
  if (ElementsTem) {
    let children = ElementsTem?.props?.children
    if (!children) return ''
    // console.log(children)
    let element = null
    let type = Object.prototype.toString.call(children)
    if (type === '[object Object]') {
      element = children
    } else if (type === '[object Array]') {
      element = children?.find((e: any) => e.props.name === activePanelName)
    }
    return (
      <div id='rightPanelWrapper' className='right-panel-wrapper' ref={currentRef} style={style}>
        {element || ''}
      </div>
    )
  }
  return ''
}
export default RightPanel
