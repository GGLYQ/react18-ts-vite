import React, { useEffect } from 'react'
interface BottomPanelIProps {
  component?: () => React.ReactNode
}
let BottomPanel = (props: BottomPanelIProps) => {
  useEffect(() => {
    return () => {}
  }, [])
  let Element = props.component
  return <div className='bottom-panel-wrapper'>{Element ? <Element /> : null}</div>
}
export default BottomPanel
