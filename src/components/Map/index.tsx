import React, { useEffect, useState, useCallback } from 'react'
// import { loadModules } from 'esri-loader'
import { useSelector } from 'react-redux'
import './index.scss'
interface MapState {
  layoutReducer: { leftPanelWidth: number; rightPanelWidth: number; topPanelHeight: number; bottomPanelHeight: number }
}
interface propType {}

function Map(props: propType): React.ReactNode {
  console.log(props)
  let { leftPanelWidth, rightPanelWidth, topPanelHeight, bottomPanelHeight } = useSelector((state: MapState) => state.layoutReducer)
  let [style, setStyle] = useState({})
  // 监听布局宽高逻辑
  const watchLayoutFn = useCallback(() => {
    console.log(leftPanelWidth, rightPanelWidth, topPanelHeight, bottomPanelHeight)
    setStyle({
      left: leftPanelWidth + 'vw',
      right: rightPanelWidth + 'vw',
      top: topPanelHeight + 'vh',
      bottom: bottomPanelHeight + 'vh',
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
