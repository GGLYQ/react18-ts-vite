import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import type { reducerIState } from '@/store/type'
import './index.scss'

interface propType {
  slot?: () => React.ReactElement
}
function Main(props: propType): React.ReactNode {
  // console.log(props)
  let { leftPanelWidth, rightPanelWidth, topPanelHeight, bottomPanelHeight } = useSelector((state: reducerIState) => state.layoutReducer)
  let [style, setStyle] = useState({})
  // 监听布局宽高逻辑
  const watchLayoutFn = useCallback(() => {
    setStyle({
      left: leftPanelWidth + 'rem',
      right: rightPanelWidth + 'rem',
      top: topPanelHeight + 'rem',
      bottom: bottomPanelHeight + 'rem',
    })
  }, [leftPanelWidth, rightPanelWidth, topPanelHeight, bottomPanelHeight])
  useEffect(() => {
    watchLayoutFn()
  }, [watchLayoutFn])
  let Element = props.slot
  return (
    <div className='App-main' style={style}>
      {Element ? <Element /> : null}
    </div>
  )
}
export default Main
