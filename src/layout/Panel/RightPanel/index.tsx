import React, { useEffect } from 'react'

interface RightPanelIProps {
  slot?: () => React.ReactNode
}
let RightPanel = (props: RightPanelIProps) => {
  useEffect(() => {
    return () => {}
  }, [])
  let Element = props.slot
  return <div className='right-panel-wrapper'>{Element ? <Element /> : null}</div>
}
export default RightPanel
