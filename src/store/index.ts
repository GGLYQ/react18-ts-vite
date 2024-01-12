
// 创建Redux store
import { configureStore } from '@reduxjs/toolkit'
import userInfoReducer from './reducers/UserInfoReducer';
import layoutReducer from './reducers/LayoutReducer';

export const store =configureStore({
  reducer: {
    userInfoReducer,
    layoutReducer
  },
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch