import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'src/components/Alert/Alert.component'
import { Launch } from 'src/features/launch/Launch.screen'
import { Register } from 'src/features/launch/Register.modal'
import { Splash } from 'src/features/splash/Splash.screen'
import { useFetchUser } from 'src/hooks/useFetchUser'
import { AppNav } from 'src/navigation/AppNav'
import { getFromStore } from 'src/store/deviceStore'
import { RootState } from 'src/store/store'
import { RootStackParamList, RootStackRoutes } from 'src/utils/navigationUtils'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const RootNav = () => {
  const [showSplash, setShowSplash] = useState(true)

  const { show, title, message, theme } = useSelector(
    (state: RootState) => state.modal
  )

  const { token, isSignout } = useSelector((state: RootState) => state.user)

  const { getToken, getEmail } = getFromStore()

  const { fetchUser, loading } = useFetchUser({
    email: getEmail(),
    token: getToken()
  })

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
      <Stack.Navigator>
        {!token ? (
          <>
            <Stack.Screen
              name={RootStackRoutes.Launch}
              component={Launch}
              options={() => ({
                headerShown: false,
                animationTypeForReplace: isSignout ? 'pop' : 'push'
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
          </>
        ) : (
          <Stack.Screen
            name={RootStackRoutes.AppNav}
            component={AppNav}
            options={() => ({
              headerShown: false,
              animationTypeForReplace: 'push'
            })}
          />
        )}
      </Stack.Navigator>
      <Alert show={show} title={title} message={message} theme={theme} />
    </>
  )
}
