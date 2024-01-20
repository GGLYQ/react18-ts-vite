import React from 'react'

interface PropType {
  slot?: (() => React.ReactElement) | null,
  activePanelName?: string,
  visibleTabs?: boolean,
  topPanelHeight?: number,
  bottomPanelHeight?: number,
  asidePanelWidth?: number,
  setTopHeight?: (value: number) => void
  setLeftWidth?: (value: number) => void
  onActivedPanel?: (name: string) => void
  onDeletePanel?: (name: string) => void
}
export { PropType }