import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'src/store/store'
import { NavigationContainer } from '@react-navigation/native'
import { RootNav } from 'src/navigation/RootNav'

const App = () => (
  <ReduxProvider store={store}>
    <NavigationContainer>
      <RootNav />
    </NavigationContainer>
  </ReduxProvider>
)

export default App
