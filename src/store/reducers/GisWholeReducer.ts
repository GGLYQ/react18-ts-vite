import { createSlice } from '@reduxjs/toolkit'
import { IObj } from '@/utils/type'

let screenType = {
  "1": "firstGisScreen",
  "2": "secondGisScreen",
  "3": "thirdGisScreen",
  "4": "fourthGisScreen",
  "5": "fifthGisScreen",
}
export let gisWholeSlice = createSlice({
  // 命名空间
  name: 'gisWhole',
  // state数据的初始值
  initialState: {
    screenMode: 1,//当前分屏状态 1:一屏 2:两屏
    firstGisScreen: {} as IObj,//第一屏
    secondGisScreen: {} as IObj,//第二屏
    thirdGisScreen: {} as IObj,//第三屏
    fourthGisScreen: {} as IObj,//第四屏
    fifthGisScreen: {} as IObj,//第五屏
    excuteMapMethod: {} as IObj //执行方法
  },
  // 定义的action。由于内置了immutable插件，可以直接使用赋值的方式进行数据的改变
  reducers: {
    setScreenMode: (state, action) => {
      state.screenMode = action.payload
    },
    setexcuteMapMethod: (state, action) => {
      state.excuteMapMethod = action.payload
    },
    setFirstGisScreen: (state, action) => {
      state.firstGisScreen = action.payload
    },
    setSecondGisScreen: (state, action) => {
      state.secondGisScreen = action.payload
    },
    setThirdGisScreen: (state, action) => {
      state.thirdGisScreen = action.payload
    },
    setFourthGisScreen: (state, action) => {
      state.fourthGisScreen = action.payload
    },
    setFifthGisScreen: (state, action) => {
      state.fifthGisScreen = action.payload
    },
    setGisScreenItem: (state, action) => {
      let { item, value, type } = action.payload as { item: string, value: any, type: string }
      let currentScreenType = screenType[type as keyof typeof screenType]
      if (currentScreenType) {
        let screenItem = state[currentScreenType as keyof typeof state] as any
        screenItem[item] = value
      }
    },
  },

})

export let { setScreenMode, setexcuteMapMethod, setFirstGisScreen, setSecondGisScreen, setThirdGisScreen, setFourthGisScreen, setFifthGisScreen, setGisScreenItem } = gisWholeSlice.actions

export default gisWholeSlice.reducer
