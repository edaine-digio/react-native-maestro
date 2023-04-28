import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { Colours } from 'src/common/Colours'
import { SvgImages } from 'src/common/Images'
import { Font, Padding } from 'src/common/Sizes'
import { StyledText, TextAlign } from 'src/components/StyledText.component'
import { FormInput } from 'src/features/launch/components/FormInput.component'
import { useRegister } from 'src/hooks/useRegister'

export const Register = () => {
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordReenter, setPasswordReenter] = useState<string>('')

  const { register } = useRegister()

  const navigation = useNavigation()

  const handleRegister = async () => {
    Keyboard.dismiss()

    const res = await register({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    })

    if (res?.ok) {
      // handle success
      navigation.goBack()
    } else {
      // handle error
      console.log('ERROR', res?.status)
    }
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.background}>
          <SvgImages.DigioIcon />
        </View>
        <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
          <View style={styles.heading}>
            <StyledText
              color={Colours.Denim}
              fontSize={Font.XL}
              fontWeight={400}>
              Register
            </StyledText>
          </View>
          <FormInput
            testID="registerFirstName"
            value={firstName}
            onChangeText={setFirstName}
            placeholder="first name"
          />
          <FormInput
            testID="registerLastName"
            value={lastName}
            onChangeText={setLastName}
            placeholder="last name"
          />
          <FormInput
            testID="registerEmail"
            value={email}
            onChangeText={setEmail}
            placeholder="email"
          />
          <FormInput
            testID="registerPassword"
            value={password}
            onChangeText={setPassword}
            placeholder="password"
            secure
          />
          <FormInput
            testID="registerPasswordReenter"
            value={passwordReenter}
            onChangeText={setPasswordReenter}
            placeholder="re-enter password"
            secure
          />
          <TouchableOpacity onPress={handleRegister} style={styles.button}>
            <StyledText
              fontSize={Font.LG}
              fontWeight={100}
              color={Colours.Denim}
              alignment={TextAlign.Centre}>
              Sign up
            </StyledText>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigation.goBack} style={styles.button}>
            <StyledText
              fontSize={Font.MD}
              fontWeight={100}
              color={Colours.Denim}
              alignment={TextAlign.Centre}>
              Back
            </StyledText>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    bottom: -50,
    left: -100,
    zIndex: -999
  },
  heading: {
    marginTop: Padding.MD,
    marginBottom: Padding.LG
  },
  formContainer: {
    alignItems: 'center',
    marginTop: Padding.LG
  },
  button: {
    marginBottom: Padding.MD,
    padding: Padding.SM
  }
})
