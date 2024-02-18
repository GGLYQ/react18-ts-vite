// src/store/dic.js
import { createSlice } from '@reduxjs/toolkit'
import { IObj } from '@/utils/type'

let screenType = {
  "1": "firstGisScreen",
  "2": "secondGisScreen",
}
export let gisWholeSlice = createSlice({
  // 命名空间
  name: 'gisWhole',
  // state数据的初始值
  initialState: {
    firstGisScreen: {} as IObj,//第一屏
    secondGisScreen: {} as IObj,//第二屏
  },
  // 定义的action。由于内置了immutable插件，可以直接使用赋值的方式进行数据的改变
  reducers: {
    setFirstGisScreen: (state, action) => {
      state.firstGisScreen = action.payload
    },
    setSecondGisScreen: (state, action) => {
      state.secondGisScreen = action.payload
    },
    setGisScreenItem: (state, action) => {
      let { item, value, type } = action.payload as { item: string, value: any, type: string }
      let currentScreenType = screenType[type as keyof typeof screenType]
      currentScreenType && (state[currentScreenType as keyof typeof state][item] = value)
    },

  },

})

export let { setFirstGisScreen, setSecondGisScreen, setGisScreenItem } = gisWholeSlice.actions

export default gisWholeSlice.reducer
