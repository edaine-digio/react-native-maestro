import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Formik } from 'formik'
import React from 'react'
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
import { object, string } from 'yup'

type LaunchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  RootStackRoutes.Launch
>

export const Launch = ({ navigation }: LaunchScreenProps) => {
  const { login } = useLogin()
  const dispatch = useAppDispatch()

  const loginSchema = object({
    email: string().required('Required').email('Invalid email'),
    password: string()
  })

  const handleLogin = async (email: string, password: string) => {
    Keyboard.dismiss()

    const res = await login({ email: email, password: password })

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
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={loginSchema}
              onSubmit={values => handleLogin(values.email, values.password)}>
              {({ handleChange, handleSubmit, values, errors, isValid }) => (
                <View>
                  <View style={styles.inputContainer}>
                    {errors.email && (
                      <View style={styles.formError}>
                        <StyledText
                          fontSize={Font.SM}
                          fontWeight={500}
                          color={Colours.Flamingo}>
                          {errors.email}
                        </StyledText>
                      </View>
                    )}
                    <FormInput
                      testID="loginInput"
                      value={values.email}
                      onChangeText={handleChange('email')}
                      placeholder="username"
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    {errors.password && (
                      <View style={styles.formError}>
                        <StyledText
                          fontSize={Font.SM}
                          fontWeight={300}
                          color={Colours.Flamingo}>
                          {errors.password}
                        </StyledText>
                      </View>
                    )}
                    <FormInput
                      testID="passwordInput"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      placeholder="password"
                      secure
                    />
                  </View>
                  <TouchableOpacity
                    disabled={!isValid}
                    onPress={() => handleSubmit()}
                    style={styles.button}>
                    <StyledText
                      fontSize={Font.XL}
                      fontWeight={100}
                      color={!isValid ? Colours.MedGrey : Colours.Denim}
                      alignment={TextAlign.Centre}>
                      Login
                    </StyledText>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
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
  formError: {
    margin: Padding.SM
  },
  inputContainer: {
    alignItems: 'flex-start'
  },
  login: {
    width: '100%',
    paddingHorizontal: Padding.XXL,
    alignItems: 'center',
    marginBottom: Padding.XXL * 3
  },
  button: {
    marginBottom: Padding.MD,
    padding: Padding.SM,
    alignSelf: 'center'
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
