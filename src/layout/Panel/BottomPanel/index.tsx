import React, { useEffect } from 'react'
interface BottomPanelIProps {
  slot?: () => React.ReactNode
}
let BottomPanel = (props: BottomPanelIProps) => {
  useEffect(() => {
    return () => {}
  }, [])
  let Element = props.slot
  return <div className='bottom-panel-wrapper'>{Element ? <Element /> : null}</div>
}
export default BottomPanel
