import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { batch } from 'react-redux'
import { Font } from 'src/common/Sizes'
import { StyledText } from 'src/components/StyledText/StyledText.component'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { storage } from 'src/store/deviceStore'
import { clearState, signout } from 'src/store/slices/userSlice'

export const Settings = () => {
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
        <StyledText fontSize={Font.XL} fontWeight={300}>
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
