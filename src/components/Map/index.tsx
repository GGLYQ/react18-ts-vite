import React, { useEffect, useState, useCallback } from 'react'
// import { loadModules } from 'esri-loader'
import { useSelector } from 'react-redux'
import type {reducerIState} from "@/store/type"
import './index.scss'

// interface propType {}
// function Map(props: propType): React.ReactNode {

function Map(): React.ReactNode {
  // console.log(props)
  let { leftPanelWidth, rightPanelWidth, topPanelHeight, bottomPanelHeight } = useSelector((state: reducerIState) => state.layoutReducer)
  let [style, setStyle] = useState({})
  // 监听布局宽高逻辑
  const watchLayoutFn = useCallback(() => {
    // console.log(leftPanelWidth, rightPanelWidth, topPanelHeight, bottomPanelHeight)
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
  return (
    <div className='App-map' style={style}>
      <div id='cloudMap' className='cloudMap'></div>
    </div>
  )
}
export default Map
