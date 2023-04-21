import { PreloadedState, configureStore } from '@reduxjs/toolkit'
import { RenderOptions, render } from '@testing-library/react-native'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import userReducer from 'src/store/slices/userSlice'
import { AppStore, RootState } from 'src/store/store'

// Since these "props" are being used across multiple screen tests, they are typed as any in
// the interest of simplicity, as each type is annotated on a per-screen basis and we only
// test the functions are called with a particular route name
export const mockNavigationProp: any = {
  navigate: jest.fn()
}

export const mockRouteProp: any = jest.fn()

// Wrapper for components and screens using global state for testing from Redux Toolkit docs
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = configureStore({ reducer: { user: userReducer }, preloadedState }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return <Provider store={store}>{children}</Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
