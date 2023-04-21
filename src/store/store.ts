import {
  PreloadedState,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit'
import userSlice from 'src/store/slices/userSlice'

const rootReducer = combineReducers({
  user: userSlice
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const store = configureStore({
  reducer: rootReducer
})
