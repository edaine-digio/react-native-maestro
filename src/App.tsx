import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'src/store/store'
import { RootApp } from 'src/features/root/Root'

const App = () => {
  return (
    <ReduxProvider store={store}>
      <RootApp />
    </ReduxProvider>
  )
}

export default App
