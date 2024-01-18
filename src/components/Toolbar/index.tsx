import React, { memo } from 'react'
import './index.scss'
import { toolbarList } from '@/data/toolbar'
import Icon from '../Icon'
import { Divider } from 'antd'
import triggerMixin from './triggerMixin'
import { IObj } from '@/utils/type'
import { reducerIState } from '@/store/type'
import { useSelector } from 'react-redux'

// interface PropType {}
function Toolbar(): React.ReactNode {
  let { isHideHeader, isHideAside, activedToolbarId } = useSelector((state: reducerIState) => state.gobalReducer)

  let triggerMap = triggerMixin() as IObj
  const handleClick = (item: IObj) => {
    let attr = `${item.id}Handler`
    triggerMap[attr] && triggerMap[attr](item)
  }
  return (
    <div className='toolbar-container flex-align-center'>
      <div className='toolbar-location'>
        <span>当前位置：XXX</span>
        <Divider type='vertical' />
      </div>
      <div className='toolbar-content flex-justify-between align-centerr'>
        <div className='toolbar-left-content flex-align-center'>
          {toolbarList.leftList.map((item) => {
            let className = item.id === activedToolbarId ? 'actived' : ''
            return (
              <div className={`toolbar-item  toolbar-right-item flex-align-center ${className}`} key={item.id} onClick={() => handleClick(item)}>
                <Icon iconName={item.icon}></Icon>
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>
        <div className='toolbar-right-content flex-align-center '>
          {toolbarList.rightList.map((item) => {
            let className = item.id === activedToolbarId ? 'actived' : ''
            return (
              <div className={`toolbar-item  toolbar-right-item flex-align-center ${className}`} key={item.id} onClick={() => handleClick(item)}>
                <Icon iconName={item.icon}></Icon>
                <span>{item.label}</span>
              </div>
            )
          })}
          <div className='toolbar-item  toolbar-right-item flex-align-center' key='fullScreen' onClick={() => handleClick({ id: 'fullScreen' })}>
            <Icon iconName='icon-quanping1'></Icon>
            <span>{isHideHeader && isHideAside ? '退出全屏' : '全屏'}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
function arePropsEqual(prevProps: any, nextProps: any) {
  return prevProps === nextProps
}
let MemoComponent = memo(Toolbar, arePropsEqual)
export default MemoComponent
