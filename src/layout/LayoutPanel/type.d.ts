import { IObj } from '@/utils/type'
import React from 'react'

interface PropType {
  slot?: (() => React.ReactElement) | null,
  activePanelName?: string,
  visibleTabs?: boolean,
  topPanelHeight?: number,
  bottomPanelHeight?: number,
  asidePanelWidth?: number,
  activedToolbar?: IObj,
  leftPanelContainer?: string[]
  rightPanelContainer?: string[]
  setLeftPanelContainer?: (name: string[]) => void
  setRightPanelContainer?: (name: string[]) => void
  setTopHeight?: (value: number) => void
  setLeftWidth?: (value: number) => void
  onActivedPanel?: (name: string) => void
  onDeletePanel?: (name: string,deletedName?:string) => void
  setActivedToolbar?: (value: IObj) => void
  isAllDisplay?: boolean
}
export { PropType }