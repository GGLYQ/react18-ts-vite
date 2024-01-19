import React, { useEffect } from 'react'

interface RightPanelItemIProps {
  slot?: () => React.ReactNode //插槽内容
  label: string //标签内容
  name: string //容器标识
  className?: string //扩展css类class属性值
  cancelClose?:boolean //是否有关闭功能
}
let RightPanelItem = (props: RightPanelItemIProps) => {
  let className = props.className
  useEffect(() => {
    return () => {}
  }, [])
  let Element = props.slot
  return <div className={`right-panel-item ${className}`}>{Element ? <Element /> : null}</div>
}
export default RightPanelItem
