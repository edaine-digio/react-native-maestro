import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'src/components/Alert/Alert.component'
import { Launch } from 'src/features/launch/Launch.screen'
import { Register } from 'src/features/launch/Register.modal'
import { Splash } from 'src/features/splash/Splash.screen'
import { useUser } from 'src/hooks/useUser'
import { AppNav } from 'src/navigation/AppNav'
import { getFromStore } from 'src/store/deviceStore'
import { RootState } from 'src/store/store'
import { RootStackParamList, RootStackRoutes } from 'src/utils/navigationUtils'
import {
  TransitionPresets,
  createStackNavigator
} from '@react-navigation/stack'

const Stack = createStackNavigator<RootStackParamList>()

export const RootNav = () => {
  const [showSplash, setShowSplash] = useState(true)

  const { show, title, message, theme } = useSelector(
    (state: RootState) => state.modal
  )

  const { token, isSignout } = useSelector((state: RootState) => state.user)

  const { getToken } = getFromStore()

  const { fetchUser, loading } = useUser()

  useEffect(() => {
    if (getToken()) {
      fetchUser()
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false)
    }, 1000)
  }, [])

  if (showSplash || loading) {
    return (
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name={RootStackRoutes.Splash}
          component={Splash}
          options={() => ({
            headerShown: false
          })}
        />
      </Stack.Navigator>
    )
  }

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS
        }}>
        {!token ? (
          <>
            <Stack.Screen
              name={RootStackRoutes.Launch}
              component={Launch}
              options={() => ({
                animationTypeForReplace: isSignout ? 'pop' : 'push'
              })}
            />
            <Stack.Screen
              name={RootStackRoutes.ReigsterModal}
              component={Register}
              options={() => ({
                ...TransitionPresets.ModalTransition
              })}
            />
          </>
        ) : (
          <Stack.Screen
            name={RootStackRoutes.AppNav}
            component={AppNav}
            options={() => ({
              animationTypeForReplace: 'push'
            })}
          />
        )}
      </Stack.Navigator>
      <Alert show={show} title={title} message={message} theme={theme} />
    </>
  )
}
