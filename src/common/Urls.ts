import { Platform } from 'react-native'

export const BASE_URL =
  Platform.OS === 'ios' ? 'http://localhost:4001' : 'http://10.0.2.2:4001'
