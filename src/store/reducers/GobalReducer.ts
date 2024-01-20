// src/store/dic.js
import { createSlice } from '@reduxjs/toolkit'

export let gobalSlice = createSlice({
  // 命名空间
  name: 'gobal',
  // state数据的初始值
  initialState: {
    fontSize: 16,
    isHideHeader: false, //是否隐藏头部
    isHideAside: false, //是否隐藏侧边栏
    activedAside: {}, //被激活的侧边栏
    activedToolbar: {}, //被激活的工具栏
    leftPanelContainer: [],
    rightPanelContainer: []
  },
  // 定义的action。由于内置了immutable插件，可以直接使用赋值的方式进行数据的改变
  reducers: {
    setFontSize: (state, action) => {
      state.fontSize = action.payload
    },
    setIsHideHeader: (state, action) => {
      state.isHideHeader = action.payload
    },
    setIsHideAside: (state, action) => {
      state.isHideAside = action.payload
    },
    setIsFullScreen: (state, action) => {
      state.isHideHeader = action.payload
      state.isHideAside = action.payload
    },
    setActivedAside: (state, action) => {
      state.activedAside = action.payload
    },
    setActivedToolbar: (state, action) => {
      state.activedToolbar = action.payload
    },
    setLeftPanelContainer: (state, action) => {
      state.leftPanelContainer = action.payload
    },
    setRightPanelContainer: (state, action) => {
      state.rightPanelContainer = action.payload
    },
  },
})

export let { setFontSize, setIsHideHeader, setIsHideAside, setIsFullScreen, setActivedAside, setActivedToolbar, setLeftPanelContainer, setRightPanelContainer } = gobalSlice.actions

export default gobalSlice.reducer
