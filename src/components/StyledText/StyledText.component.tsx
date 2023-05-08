import React, { ReactNode } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Colours } from 'src/common/Colours'

interface StyledTextProps {
  fontSize: number
  fontWeight?: number
  color?: string
  alignment?: TextAlign
  children: ReactNode | string
}

export enum TextAlign {
  Left = 'left',
  Right = 'right',
  Centre = 'center'
}

export const StyledText = ({
  fontSize,
  fontWeight = 400,
  color = Colours.Black,
  alignment = TextAlign.Right,
  children
}: StyledTextProps) => {
  let fontFamily = ''

  switch (fontWeight) {
    case 100:
      fontFamily = 'Archivo-Thin'
      break
    case 200:
      fontFamily = 'Archivo-ExtraLight'
      break
    case 300:
      fontFamily = 'Archivo-Light'
      break
    case 400:
      fontFamily = 'Archivo-Regular'
      break
    case 500:
      fontFamily = 'Archivo-Medium'
      break
    case 600:
      fontFamily = 'Archivo-SemiBold'
      break
    case 700:
      fontFamily = 'Archivo-Bold'
      break
    case 800:
      fontFamily = 'Archivo-ExtraBold'
      break
    default:
      fontFamily = 'Archivo-Regular'
  }

  const styles = useStyles(fontSize, fontFamily, color, alignment)

  return <Text style={styles.text}>{children}</Text>
}

const useStyles = (
  fontSize: number,
  fontFamily: string,
  color: string,
  alignment: TextAlign
) =>
  StyleSheet.create({
    text: {
      fontSize: fontSize,
      fontFamily: fontFamily,
      color: color,
      textAlign: alignment
    }
  })
