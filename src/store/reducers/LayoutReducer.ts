// src/store/dic.js
import { createSlice } from '@reduxjs/toolkit'

// 使用createSlice方法创建一个slice。每一个slice里面包含了reducer和actions，实现模块化的封装
export let layoutSlice = createSlice({
  // 命名空间
  name: 'layoutPage',
  // state数据的初始值
  initialState: {
    leftPanelWidth: 0,
    rightPanelWidth: 0,
    topPanelHeight: 0,
    bottomPanelHeight: 0
  },
  // 定义的action。由于内置了immutable插件，可以直接使用赋值的方式进行数据的改变
  reducers: {
    // 设置左侧面板的宽度
    setLeftPanelWidth: (state, action) => {
      // 第一个参数 state为当前state中的数据
      // 第二个参数 action为 {payload: [{ label: '家具类', value: '家具类' }], type: "dic/changeVal"}
      // payload 为传过来的新参数值
      // type 为action触发类型
      // console.log('setLeftPanelWidth:', JSON.parse(JSON.stringify(state)), state, action)
      state.leftPanelWidth = action.payload
    },
    setRightPanelWidth: (state, action) => {
      // console.log('setRightPanelWidth:', JSON.parse(JSON.stringify(state)), state, action)
      state.rightPanelWidth = action.payload
    },
    setTopPanelHeight: (state, action) => {
      // console.log('setTopPanelHeight:', JSON.parse(JSON.stringify(state)), state, action)
      state.topPanelHeight = action.payload
    },
    setBottomPanelHeight: (state, action) => {
      // console.log('setBottomPanelHeight:', JSON.parse(JSON.stringify(state)), state, action)
      state.bottomPanelHeight = action.payload
    },
  },
})

export let { setLeftPanelWidth, setRightPanelWidth, setTopPanelHeight, setBottomPanelHeight } = layoutSlice.actions

export default layoutSlice.reducer
