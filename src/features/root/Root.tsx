import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Alert } from 'src/components/Alert/Alert.component'
import { Launch } from 'src/features/launch/Launch.screen'
import { Register } from 'src/features/launch/Register.modal'
import { RootNavigation } from 'src/navigation/RootNavigation'
import { RootState } from 'src/store/store'
import { RootStackParamList, RootStackRoutes } from 'src/utils/navigationUtils'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const RootApp = () => {
  const { show, title, message, theme } = useSelector(
    (state: RootState) => state.modal
  )

  return (
    <View style={styles.container}>
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
        <Alert show={show} title={title} message={message} theme={theme} />
      </NavigationContainer>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  }
})
