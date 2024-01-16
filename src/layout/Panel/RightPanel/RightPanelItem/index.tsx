import React, { useEffect } from 'react'

interface RightPanelItemIProps {
  slot?: () => React.ReactNode
  label: string
  name: string
  className?: string
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
