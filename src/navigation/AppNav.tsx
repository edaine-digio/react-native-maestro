import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { TabBar } from 'src/components/TabBar/TabBar.component'
import { Home } from 'src/features/home/Home.screen'
import { Profile } from 'src/features/profile/Profile.screen'
import { Settings } from 'src/features/settings/Settings.screen'
import { TabRoutes } from 'src/utils/navigationUtils'

const Tab = createBottomTabNavigator()

export const AppNav = () => (
  <Tab.Navigator
    screenOptions={{ headerShown: false }}
    tabBar={props => <TabBar {...props} />}>
    <Tab.Screen name={TabRoutes.Home} component={Home} />
    <Tab.Screen name={TabRoutes.Profile} component={Profile} />
    <Tab.Screen name={TabRoutes.Settings} component={Settings} />
  </Tab.Navigator>
)
