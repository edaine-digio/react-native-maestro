import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Colours } from 'src/common/Colours'
import { SvgImages } from 'src/common/Images'
import { Font, Padding } from 'src/common/Sizes'
import { StyledText, TextAlign } from 'src/components/StyledText.component'
import { useAppDispatch } from 'src/hooks/dispatchHooks'
import { updateName } from 'src/store/slices/userSlice'
import { RootStackParamList, RootStackRoutes } from 'src/utils/navigationUtils'

type LaunchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RootStackRoutes.Launch
>

export const Launch = ({ navigation }: LaunchScreenProps) => {
  const dispatch = useAppDispatch()

  return (
    <LinearGradient
      style={styles.screenContainer}
      colors={[Colours.Peach, Colours.Sand]}>
      <SafeAreaView style={styles.content}>
        <View style={styles.svg}>
          <SvgImages.DigioPrimary />
        </View>
        <View style={styles.title}>
          <TouchableOpacity
            onPress={() => {
              dispatch(updateName('Olly'))
              navigation.navigate(RootStackRoutes.RootNavigation)
            }}>
            <StyledText
              fontSize={Font.XL}
              fontWeight={100}
              alignment={TextAlign.Centre}>
              Login
            </StyledText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    flexDirection: 'column'
  },
  svg: {
    height: 80,
    width: '100%'
  },
  title: {
    width: '100%',
    paddingHorizontal: Padding.XXL,
    alignItems: 'center'
  }
})
