// src/store/dic.js
import { createSlice } from '@reduxjs/toolkit'

export let gobalSlice = createSlice({
  // 命名空间
  name: 'gobal',
  // state数据的初始值
  initialState: {
    fontSize:16
  },
  // 定义的action。由于内置了immutable插件，可以直接使用赋值的方式进行数据的改变
  reducers: {
    setFontSize: (state, action) => {
      state.fontSize = action.payload
    },
   
  },
})

export let { setFontSize } = gobalSlice.actions

export default gobalSlice.reducer
