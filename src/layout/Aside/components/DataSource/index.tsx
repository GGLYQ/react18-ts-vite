import React from 'react'
import './index.scss'
import type { reducerIState } from '@/store/type'
import { connect } from 'react-redux'
import executeMixin from '@/components/Map/mixins/executeMixin'
import dataResource from './data.json'
import type { IObj } from '@/utils/type'
import { arrayToTree } from '@/utils/arrayUtil'

interface PropType {}
interface StateType {}
class DataSource extends React.PureComponent<PropType, StateType> {
  constructor(props: PropType) {
    super(props)
    this.state = {}
  }
  componentDidMount(): void {
    this.initDataSource()
  }
  // 初始化加载数据资源
  initDataSource() {
    let newDatasource = dataResource.map((leaf: IObj) => {
      leaf.children = leaf.resourceAndLayers.map((item: IObj) => {
        item.children = arrayToTree(item.layerinfos, 'layerid', 'parentlayerid', (layer) => {
          return layer.parentlayerid === null
        })
        return item
      })
      return leaf
    })
    console.log(newDatasource);
    // 处理数据资源
    this.setState(() => {
      return {
        dataResource: newDatasource,
      }
    })
  }
  render(): React.ReactNode {
    return <div className='aside-panel-dataSource'>数据资源</div>
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
