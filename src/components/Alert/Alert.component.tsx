import React from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Colours } from 'src/common/Colours'
import { Font, Padding } from 'src/common/Sizes'
import { StyledText } from 'src/components/StyledText/StyledText.component'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { hideModal } from 'src/store/slices/modalSlice'

interface AlertProps {
  show: boolean | undefined
  title: string | undefined
  message: string | undefined
  theme: string | undefined
}

export const Alert = ({ show, title, message, theme }: AlertProps) => {
  const dispatch = useAppDispatch()

  const styles = useStyles(theme)

  const handleClose = () => {
    dispatch(hideModal())
  }

  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View style={styles.modalScreen}>
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            <StyledText fontSize={Font.LG} fontWeight={400}>
              {title}
            </StyledText>
            <StyledText fontSize={Font.MD} fontWeight={300}>
              {message}
            </StyledText>
            <TouchableOpacity onPress={handleClose}>
              <StyledText fontSize={Font.LG} fontWeight={300}>
                Close
              </StyledText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const useStyles = (colour?: string) =>
  StyleSheet.create({
    modalScreen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalContainer: {
      width: 260,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    content: {
      backgroundColor: Colours.White,
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: Padding.XL,
      borderRadius: 16,
      borderColor: colour ?? Colours.White,
      borderWidth: 4
    }
  })
