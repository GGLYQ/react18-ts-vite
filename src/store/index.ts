
// 创建Redux store
import { configureStore } from '@reduxjs/toolkit'
import gobalReducer from './reducers/GobalReducer';
import userInfoReducer from './reducers/UserInfoReducer';
import layoutReducer from './reducers/LayoutReducer';
import gisWholeReducer from './reducers/GisWholeReducer';

export const store = configureStore({
  reducer: {
    gobalReducer,
    userInfoReducer,
    layoutReducer,
    gisWholeReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })

})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch