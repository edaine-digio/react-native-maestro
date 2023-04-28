import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Colours } from 'src/common/Colours'
import { SvgImages } from 'src/common/Images'
import { Font, Padding } from 'src/common/Sizes'
import { StyledText, TextAlign } from 'src/components/StyledText.component'
import { FormInput } from 'src/features/launch/components/FormInput.component'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { useLogin } from 'src/hooks/useLogin'
import { storage } from 'src/store/deviceStore'
import { updateUser } from 'src/store/slices/userSlice'
import { RootStackParamList, RootStackRoutes } from 'src/utils/navigationUtils'

type LaunchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RootStackRoutes.Launch
>

export const Launch = ({ navigation }: LaunchScreenProps) => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { login } = useLogin()
  const dispatch = useAppDispatch()

  const validInput = username.length > 1 && password.length > 1

  const handleLogin = async () => {
    Keyboard.dismiss()

    const res = await login({ email: username, password: password })

    if (res?.ok) {
      const user = await res.json()
      dispatch(
        updateUser({
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          token: user.token
        })
      )
      storage.set('accessToken', user.token)
      navigation.navigate(RootStackRoutes.RootNavigation)
    } else {
      console.log('ERROR', res?.status)
    }
  }

  const handleSignUp = () => {
    navigation.navigate(RootStackRoutes.ReigsterModal)
  }

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={styles.screenContainer}>
      <LinearGradient
        style={styles.screenContainer}
        colors={[Colours.Peach, Colours.Sand]}>
        <SafeAreaView style={styles.content}>
          <View style={styles.svg}>
            <SvgImages.DigioPrimary />
          </View>
          <KeyboardAvoidingView behavior="padding" style={styles.login}>
            <FormInput
              testID="loginInput"
              value={username}
              onChangeText={setUsername}
              placeholder="username"
            />
            <FormInput
              testID="passwordInput"
              value={password}
              onChangeText={setPassword}
              placeholder="password"
              secure
            />
            <TouchableOpacity
              disabled={!validInput}
              onPress={handleLogin}
              style={styles.button}>
              <StyledText
                fontSize={Font.XL}
                fontWeight={100}
                color={!validInput ? Colours.MedGrey : Colours.Denim}
                alignment={TextAlign.Centre}>
                Login
              </StyledText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignUp} style={styles.button}>
              <StyledText
                fontSize={Font.LG}
                fontWeight={100}
                color={Colours.Denim}
                alignment={TextAlign.Centre}>
                Register
              </StyledText>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  svg: {
    width: '100%',
    height: 80,
    marginTop: Padding.XXL * 3,
    marginBottom: Padding.XL
  },
  login: {
    width: '100%',
    paddingHorizontal: Padding.XXL,
    alignItems: 'center',
    marginBottom: Padding.XXL * 3
  },
  button: {
    marginBottom: Padding.MD,
    padding: Padding.SM
  },
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
