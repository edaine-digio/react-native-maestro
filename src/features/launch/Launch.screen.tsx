import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Colours } from 'src/common/Colours'
import { SvgImages } from 'src/common/Images'
import { StyledText, TextAlign } from 'src/components/StyledText.component'

export const Launch = () => (
  <LinearGradient
    style={styles.screenContainer}
    colors={[Colours.Peach, Colours.Sand]}>
    <SafeAreaView style={styles.content}>
      <View style={styles.svg}>
        <SvgImages.DigioPrimary />
      </View>
      <View style={styles.title}>
        <StyledText fontSize={30} fontWeight={100} alignment={TextAlign.Centre}>
          This is the Launch screen page
        </StyledText>
      </View>
    </SafeAreaView>
  </LinearGradient>
)

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
