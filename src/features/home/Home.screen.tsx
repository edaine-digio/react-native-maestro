import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Font } from 'src/common/Sizes'
import { StyledText } from 'src/components/StyledText.component'
import { RootState } from 'src/store/store'

export const Home = () => {
  const userName = useSelector((state: RootState) => state.user.name)

  return (
    <View style={styles.container}>
      <StyledText fontSize={Font.XL} fontWeight={300}>
        Welcome, {userName}
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
