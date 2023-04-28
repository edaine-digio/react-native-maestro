import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from 'src/store/store'
import { RootStackParamList, RootStackRoutes } from 'src/utils/navigationUtils'
import { Launch } from 'src/features/launch/Launch.screen'
import { RootNavigation } from 'src/navigation/RootNavigation'
import { Register } from 'src/features/launch/Register.modal'
// import { MMKV } from 'react-native-mmkv'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator<RootStackParamList>()

// export const storage = new MMKV()

const App = () => {
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Launch">
          <Stack.Screen
            name={RootStackRoutes.Launch}
            component={Launch}
            options={() => ({
              headerShown: false
            })}
          />
          <Stack.Screen
            name={RootStackRoutes.ReigsterModal}
            component={Register}
            options={() => ({
              headerShown: false,
              presentation: 'formSheet'
            })}
          />
          <Stack.Screen
            name={RootStackRoutes.RootNavigation}
            component={RootNavigation}
            options={() => ({
              headerShown: false
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  )
}

export default App
