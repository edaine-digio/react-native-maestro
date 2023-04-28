import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Launch } from 'src/features/launch/Launch.screen'
import { RootStackParamList, RootStackRoutes } from 'src/utils/navigationUtils'

const Stack = createNativeStackNavigator<RootStackParamList>()

export const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Launch">
      <Stack.Screen
        name={RootStackRoutes.Launch}
        component={Launch}
        options={() => ({
          headerShown: false
        })}
      />
    </Stack.Navigator>
  )
}
