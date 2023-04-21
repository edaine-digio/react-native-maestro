import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useRef, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Colours } from 'src/common/Colours'
import { SvgImages } from 'src/common/Images'
import { Font, Padding } from 'src/common/Sizes'
import { StyledText, TextAlign } from 'src/components/StyledText.component'
import { useAppDispatch } from 'src/hooks/dispatchHooks'
import { updateName } from 'src/store/slices/userSlice'
import { RootStackParamList, RootStackRoutes } from 'src/utils/navigationUtils'

type LaunchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RootStackRoutes.Launch
>

export const Launch = ({ navigation }: LaunchScreenProps) => {
  const [username, setUsername] = useState<string>('')
  const dispatch = useAppDispatch()

  const validUsername = username.length > 1

  const handleLogin = () => {
    Keyboard.dismiss()
    dispatch(updateName(username))
    setUsername('')
    navigation.navigate(RootStackRoutes.RootNavigation)
  }

  return (
    <LinearGradient
      style={styles.screenContainer}
      colors={[Colours.Peach, Colours.Sand]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.content}>
          <View style={styles.svg}>
            <SvgImages.DigioPrimary />
          </View>
          <KeyboardAvoidingView style={styles.login} behavior="padding">
            <TextInput
              testID="loginInput"
              value={username}
              style={styles.loginInput}
              onChangeText={name => setUsername(name)}
              placeholder="username"
              autoCorrect={false}
            />
            <TouchableOpacity
              disabled={!validUsername}
              onPress={handleLogin}
              style={styles.loginButton}>
              <StyledText
                fontSize={Font.XL}
                fontWeight={100}
                color={!validUsername ? Colours.MedGrey : Colours.Denim}
                alignment={TextAlign.Centre}>
                Login
              </StyledText>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  svg: {
    height: 80,
    width: '100%',
    marginTop: Padding.XXL * 3,
    marginBottom: Padding.XL
  },
  login: {
    width: '100%',
    paddingHorizontal: Padding.XXL,
    alignItems: 'center',
    marginBottom: Padding.XXL * 3
  },
  loginButton: {
    paddingBottom: Padding.XL
  },
  loginInput: {
    width: 200,
    padding: Padding.SM + Padding.XS,
    color: Colours.Denim,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: Colours.Denim,
    marginBottom: Padding.LG,
    fontFamily: 'Archivo-Thin',
    fontSize: Font.MD
  }
})
