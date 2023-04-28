import React from 'react'
import { StyleSheet, TextInput } from 'react-native'
import { Colours } from 'src/common/Colours'
import { Font, Padding } from 'src/common/Sizes'

interface FormInputProps {
  testID: string
  value: string
  placeholder: string
  secure?: boolean
  onChangeText: (input: string) => void
}

export const FormInput = ({
  testID,
  value,
  placeholder,
  secure = false,
  onChangeText
}: FormInputProps) => {
  return (
    <TextInput
      testID={testID}
      value={value}
      style={styles.input}
      onChangeText={input => onChangeText(input)}
      placeholder={placeholder}
      autoCorrect={false}
      autoCapitalize="none"
      secureTextEntry={secure}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    width: 200,
    padding: Padding.SM + Padding.XS,
    color: Colours.Denim,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colours.Denim,
    marginBottom: Padding.MD,
    fontFamily: 'Archivo-Thin',
    fontSize: Font.MD
  }
})
