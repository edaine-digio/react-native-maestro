import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Colours } from 'src/common/Colours'
import { Font, Padding } from 'src/common/Sizes'
import { StyledText } from 'src/components/StyledText/StyledText.component'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { showModal } from 'src/store/slices/modalSlice'
import { RootState } from 'src/store/store'

export const Home = () => {
  const firstName = useSelector((state: RootState) => state.user.firstName)

  const dispatch = useAppDispatch()

  return (
    <View style={styles.container}>
      <StyledText fontSize={Font.XL} fontWeight={300}>
        Welcome, {firstName}
      </StyledText>
      <View style={styles.button}>
        <TouchableOpacity
          onPress={() =>
            dispatch(
              showModal({
                title: 'Testing',
                message: 'This is a test modal',
                theme: Colours.Flamingo
              })
            )
          }>
          <StyledText fontSize={Font.LG} fontWeight={400}>
            Press me!
          </StyledText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    marginTop: Padding.LG
  }
})
