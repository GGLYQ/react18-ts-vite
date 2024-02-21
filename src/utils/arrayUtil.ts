import _ from 'lodash'
import { IObj } from './type'


/**
 * 数组转换成树
 *
 * @param {Array} arr array
 * @param {string} idField the id field
 * @param {string} pidField the parent's id field
 * @param {Funcction} rooterFunc the Function to judge array item is rooter node or is not
 * @param {string} childrenName the name of node's children when createing tree,default 'children'
 * @returns {Object{mapObj,rooter}} { mapObj, rooter }
 */
function arrayToTree(
  arr: IObj[],
  idField: string,
  pidField: string,
  rooterFunc?: (arg0: IObj) => any,
  childrenName: string | undefined = 'children'
) {
  // 克隆数组，否则当数组项为对象时，会修改原数组
  let arrCloned = _.cloneDeep(arr)
  // 先生成一个映射对象
  const mapObj = arrCloned.reduce((total, current) => {
    total[current[idField]] = current
    return total
  }, {})
  let rooter: IObj | null = null
  // 保存没有父节点的节点，如果没有传rooterFunc，自己创建一个根节点，把数组放进去返回根节点
  const noParentNodes: any[] = []
  // 循环挂载节点，返回根节点
  arrCloned.forEach(element => {
    if (rooterFunc && !rooter && rooterFunc(element)) {
      rooter = element
    }
    const parentNode = mapObj[element[pidField]]
    if (parentNode) {
      if (!parentNode[childrenName]) {
        parentNode[childrenName] = []
      }
      parentNode[childrenName].push(element)
    } else {
      noParentNodes.push(element[idField])
    }
  })
  // 当根节点是空的时候，创建一个根节点，把没有父节点的节点放进去
  if (rooter === null) {
    rooter = {
      [childrenName]: noParentNodes.map(noParentNodeId => {
        return mapObj[noParentNodeId]
      })
    }
  }
  return { mapObj, rooter }
}


export {
  arrayToTree
}
