import { MMKV } from 'react-native-mmkv'

export const storage = new MMKV()

export const getFromStore = () => {
  const getToken = () => {
    return storage.getString('accessToken')
  }

  const getEmail = () => {
    return storage.getString('email')
  }

  return { getToken, getEmail }
}
