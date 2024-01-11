import React, { useEffect } from 'react'

interface RightPanelIProps {
  component?: () => React.ReactNode
}
let RightPanel = (props: RightPanelIProps) => {
  useEffect(() => {
    return () => {}
  }, [])
  let Element = props.component
  return <div className='right-panel-wrapper'>{Element ? <Element /> : null}</div>
}
export default RightPanel
