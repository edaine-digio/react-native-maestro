import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { StyledText } from 'src/components/StyledText.component'
import {
  RootStackParamList,
  RootStackRoutes,
  RootTabParamList,
  RootTabRoutes
} from 'src/utils/navigationUtils'

type SettingsScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, RootTabRoutes.Settings>,
  NativeStackScreenProps<RootStackParamList>
>

export const Settings = ({ navigation }: SettingsScreenProps) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate(RootStackRoutes.Launch)}
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
