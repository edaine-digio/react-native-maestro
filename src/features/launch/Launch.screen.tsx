import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Colours } from 'src/common/Colours'
import { SvgImages } from 'src/common/Images'
import { isIos } from 'src/utils/deviceUtils/deviceUtils'

export const Launch = () => {
  const ios: boolean = isIos()

  // WIP - Text Component needs refining
  return (
    <LinearGradient
      style={styles.screenContainer}
      colors={[Colours.Peach, Colours.Sand]}>
      <SafeAreaView style={styles.content}>
        <View style={styles.svg}>
          <SvgImages.DigioPrimary />
        </View>
        <View style={styles.title}>
          <Text
            style={{
              fontFamily: ios ? 'Archivo' : 'Archivo-Regular',
              fontSize: 36,
              textAlign: 'center',
              fontWeight: '500',
              color: Colours.Black
            }}>
            This is the Launch screen
          </Text>
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
    paddingHorizontal: 48,
    alignItems: 'center'
  }
})
