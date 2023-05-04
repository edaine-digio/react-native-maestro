import {
  AnyAction,
  PreloadedState,
  Reducer,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit'
import userSlice from 'src/store/slices/userSlice'

const appReducer = combineReducers({
  user: userSlice
})

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'user/logout') {
    state = undefined
  }

  return appReducer(state, action)
}

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
