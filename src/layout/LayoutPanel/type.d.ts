import React from 'react'
import type { IObj, IRouter } from '@/utils/type'

interface PropType {
  slot?: (() => React.ReactElement) | (() => React.ReactNode) | null | undefined,
  router?: IRouter
  activePanelName?: string,
  visibleTabs?: boolean,
  topPanelHeight?: number,
  bottomPanelHeight?: number,
  leftPanelWidth?: number,
  asidePanelWidth?: number,
  activedToolbar?: IObj,
  leftPanelContainer?: string[]
  rightPanelContainer?: string[]
  isAllDisplay?: boolean
  _setLeftPanelContainer?: (name: string[]) => void
  _setTopPanelHeight?: (value: number) => void
  _setLeftPanelWidth?: (value: number) => void
  _setActivedToolbar?: (value: IObj) => void
  _setActivedToolbarByName?: (value: string) => void
  onActivedPanel?: (name: string) => void
  onDeletePanel?: (name: string, deletedName?: string) => void
}
export { PropType }