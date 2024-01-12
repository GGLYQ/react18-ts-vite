import React from 'react'
interface LayoutReducerIState {
  layoutReducer: { leftPanelWidth: number; rightPanelWidth: number; topPanelHeight: number; bottomPanelHeight: number }
}
interface PropType {
  slot?: () => React.ReactNode
}
export { LayoutReducerIState, PropType }