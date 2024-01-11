import React, { useEffect } from 'react'

interface RightPanelItemIProps {
  slot?: () => React.ReactNode
}
let RightPanelItem = (props: RightPanelItemIProps) => {
  useEffect(() => {
    return () => {}
  }, [])
  let Element = props.slot
  return <div className='right-panel-item'>{Element ? <Element /> : null}</div>
}
export default RightPanelItem
