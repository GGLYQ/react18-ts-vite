
// 创建Redux store
import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from './reducers/UserInfoReducer';

export default configureStore({
  reducer: {
    userInfoReducer,
  },
})