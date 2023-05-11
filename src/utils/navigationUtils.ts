import { NavigatorScreenParams } from '@react-navigation/native'

export type RootStackParamList = {
  Launch: undefined
  RegisterModal: undefined
  AppNav: undefined
  Splash: undefined
}

export enum RootStackRoutes {
  Launch = 'Launch',
  ReigsterModal = 'RegisterModal',
  AppNav = 'AppNav',
  Splash = 'Splash'
}

export type TabParamList = {
  Home: undefined
  Profile: undefined
  Settings: NavigatorScreenParams<RootStackParamList>
}

export enum TabRoutes {
  Home = 'Home',
  Profile = 'Profile',
  Settings = 'Settings'
}
