import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userSlice from 'src/store/slices/userSlice'

const rootReducer = combineReducers({
  user: userSlice
})

export type RootState = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer
})
