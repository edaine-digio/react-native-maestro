import { Platform } from 'react-native'

import Config from 'react-native-config'

const { IOS_BASE_URL, ANDROID_BASE_URL } = Config

export const BASE_URL = Platform.OS === 'ios' ? IOS_BASE_URL : ANDROID_BASE_URL
