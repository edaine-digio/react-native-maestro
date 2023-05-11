import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colours } from 'src/common/Colours'
import { SvgImages } from 'src/common/Images'

export const Splash = () => (
  <View style={styles.container}>
    <SvgImages.DigioIcon width={170} height={170} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colours.Flax,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
