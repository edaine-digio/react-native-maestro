import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colours } from 'src/common/Colours'

export const Launch = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>This is the Launch screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colours.Sand,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
