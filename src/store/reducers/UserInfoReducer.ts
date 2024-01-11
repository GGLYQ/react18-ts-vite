// src/store/dic.js
import { createSlice } from '@reduxjs/toolkit'

// 使用createSlice方法创建一个slice。每一个slice里面包含了reducer和actions，实现模块化的封装
export let userInfoSlice = createSlice({
  // 命名空间
  name: 'userInfo',
  // state数据的初始值
  initialState: {
    // sortList: [
    //   { label: '食品类', value: '食品类' },
    //   { label: '服装类', value: '服装类' },
    //   { label: '日用品类', value: '日用品类' },
    // ]
  },
  // 定义的action。由于内置了immutable插件，可以直接使用赋值的方式进行数据的改变
  reducers: {
    // changeVal: (state, action) => {
    //   // 第一个参数 state为当前state中的数据
    //   // 第二个参数 action为 {payload: [{ label: '家具类', value: '家具类' }], type: "dic/changeVal"}
    //   // payload 为传过来的新参数值
    //   // type 为action触发类型
    //   console.log('changeVal:', JSON.parse(JSON.stringify(state)), state, action)
    //   state.sortList = action.payload
    // }
  },
})

// export let { changeVal } = userInfoSlice.actions

export default userInfoSlice.reducer
