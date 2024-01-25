let toolbarList = {
  leftList: [
    { id: 'position', label: '全图', icon: 'icon-ditu1' },
    { id: 'plotting', label: '标绘', icon: 'icon-gis_biaohui', panelType: 'left', panelComponet: "Plotting" },
    { id: 'ranging', label: '测距', icon: 'icon-shujushujudian' },
    { id: 'surfaceMeasurement', label: '测面', icon: 'icon-bianjietiaojian' },
    { id: 'attributeQuery', label: '属性', icon: 'icon-dietu', panelType: 'right', panelComponet: "AttributeQuery" },
    { id: 'dataOverlay', label: '数据叠加', icon: 'icon-dietumoshi', panelType: 'right', panelComponet: "DataOverlay" },
    { id: 'conditionPosition', label: '条件定位', icon: 'icon-logistics-map', panelType: 'left', panelComponet: "ConditionPosition" },
  ],
  rightList: [
    { id: 'clear', label: '清除', icon: 'icon-qingchu' },
    // { id: 'fullScreen', label: '全屏', icon: 'icon-quanping1', antonymLabel: '退出全屏' },
  ],
}
export { toolbarList }
