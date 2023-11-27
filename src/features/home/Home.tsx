import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Feed } from './Feed.screen';
import { Profile } from './Profile.screen';

export type TabParamList = {
  Feed: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const HomeNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={Feed} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
