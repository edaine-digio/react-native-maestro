import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { batch } from 'react-redux'
import { StyledText } from 'src/components/StyledText/StyledText.component'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { storage } from 'src/store/deviceStore'
import { clearState, signout } from 'src/store/slices/userSlice'
import { RootStackParamList, TabParamList } from 'src/utils/navigationUtils'

type SettingsNavProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList>,
  NativeStackScreenProps<RootStackParamList>
>

export const Settings = ({ navigation }: SettingsNavProps) => {
  const dispatch = useAppDispatch()

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          storage.delete('accessToken')
          batch(() => {
            dispatch(clearState())
            dispatch(signout(true))
          })
        }}
        style={styles.container}>
        <StyledText fontSize={24} fontWeight={400}>
          Log out
        </StyledText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
