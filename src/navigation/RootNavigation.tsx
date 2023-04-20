import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'
import { Home } from 'src/features/home/Home.screen'
import { Settings } from 'src/features/settings/Settings.screen'
import { RootTabRoutes } from 'src/utils/navigationUtils'

const Tab = createBottomTabNavigator()

export const RootNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name={RootTabRoutes.Home} component={Home} />
      <Tab.Screen
        name={RootTabRoutes.Settings}
        component={Settings as FunctionComponent}
      />
    </Tab.Navigator>
  )
}
