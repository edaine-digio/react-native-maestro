import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Font } from 'src/common/Sizes'
import { StyledText } from 'src/components/StyledText/StyledText.component'

export const Profile = () => {
  return (
    <View style={styles.container}>
      <StyledText fontSize={Font.XL} fontWeight={300}>
        Profile
      </StyledText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
