import React from 'react'
import './index.scss'
import type { reducerIState } from '@/store/type'
import { connect } from 'react-redux'
import executeMixin from '@/components/Map/mixins/executeMixin'
import dataResource from './data.json'
import type { IObj } from '@/utils/type'
import { arrayToTree } from '@/utils/arrayUtil'
import { Tree } from 'antd'
import type { TreeProps } from 'antd'

interface PropType {}
interface StateType {
  treeData: IObj[]
  defaultCheckedKeys: string[]
}
class DataSource extends React.PureComponent<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = {
      treeData: [],
      defaultCheckedKeys: [],
    }
  }
  componentDidMount(): void {
    this.initDataSource()
  }
  // 初始化加载数据资源
  initDataSource() {
    let newDatasource = dataResource.map((leaf: IObj) => {
      leaf.key = leaf.id
      leaf.isFolder = true //是否为文件夹
      leaf.children = leaf.resourceAndLayers.map((item: IObj) => {
        let { resourceid, resourcename } = item.resourceByTree
        Object.assign(item, {
          key: resourceid,
          title: resourcename,
          isFolder: true, //是否为文件夹
        })
        const rooterList = item.layerinfos.filter((layer: IObj) => layer.parentlayerid === null)
        const treeObj = arrayToTree(item.layerinfos, 'layerid', 'parentlayerid', (layer) => {
          return layer.parentlayerid === null
        })
        item.children = rooterList.map((rooter: IObj) => {
          let currentParentlayer = treeObj.mapObj[rooter.layerid]
          currentParentlayer.children &&
            currentParentlayer.children.forEach((ele_: IObj) => {
              Object.assign(ele_, {
                key: ele_.layerid,
                title: ele_.layername,
                isFolder: false,
              })
            })
          let { layerid, layername } = currentParentlayer
          Object.assign(currentParentlayer, {
            key: layerid,
            title: layername,
            isFolder: false,
          })
          return currentParentlayer
        })
        return item
      })
      return leaf
    })
    // 处理数据资源
    this.setState(() => {
      return {
        treeData: newDatasource,
      }
    })
  }
  onSelect(): TreeProps['onSelect'] {
    return (selectedKeys, info) => {
      console.log('selected', selectedKeys, info)
    }
  }
  onCheck(): TreeProps['onCheck'] {
    return (checkedKeys, info) => {
      console.log('onCheck', checkedKeys, info)
    }
  }
  render(): React.ReactNode {
    return (
      <div className='aside-panel-dataSource'>
        <p>资源目录</p>
        <Tree checkable defaultCheckedKeys={this.state.defaultCheckedKeys} onSelect={this.onSelect} onCheck={this.onCheck} treeData={this.state.treeData} />
      </div>
    )
  }
}
/**
 * 将仓库的state映射到props(获取state)
 * @param state
 */
const mapStateToProps = (state: reducerIState) => {
  return {}
}

/**
 *  将dispatch映射到props(改变state)
 * @param dispatch
 */
const mapDispatchToProps = () => {
  return {}
}
let NavigateComponent = connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(DataSource)
Object.assign(NavigateComponent.WrappedComponent.prototype, executeMixin)
export default NavigateComponent
