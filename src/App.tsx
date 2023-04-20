import React from 'react'
import { Launch } from './features/launch/Launch.screen'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList, RootStackRoutes } from './utils/navigationUtils'
import { RootNavigation } from './navigation/RootNavigation'

const Stack = createNativeStackNavigator<RootStackParamList>()

const App = () => {
  return (
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
          name={RootStackRoutes.RootNavigation}
          component={RootNavigation}
          options={() => ({
            headerShown: false
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
