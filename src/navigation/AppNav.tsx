import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React, { FunctionComponent } from 'react'
import { Home } from 'src/features/home/Home.screen'
import { Settings } from 'src/features/settings/Settings.screen'
import { TabRoutes } from 'src/utils/navigationUtils'

const Tab = createBottomTabNavigator()

export const AppNav = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name={TabRoutes.Home} component={Home} />
    <Tab.Screen
      name={TabRoutes.Settings}
      component={Settings as FunctionComponent}
    />
  </Tab.Navigator>
)
