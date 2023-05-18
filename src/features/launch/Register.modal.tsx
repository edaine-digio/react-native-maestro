import { useNavigation } from '@react-navigation/native'
import { Formik } from 'formik'
import React from 'react'
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
import {
  StyledText,
  TextAlign
} from 'src/components/StyledText/StyledText.component'
import { FormInput } from 'src/features/launch/components/FormInput.component'
import { useRegister } from 'src/hooks/useRegister'
import { object, string } from 'yup'

interface FormProps {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const Register = () => {
  const { register } = useRegister()
  const navigation = useNavigation()

  const registerSchema = object({
    firstName: string()
      .required('Required')
      .min(2, () => 'Too short!')
      .max(16, () => 'Too long!'),
    lastName: string()
      .required('Required')
      .min(2, () => 'Too short!')
      .max(16, () => 'Too long!'),
    email: string().required('Required').email('Invalid email'),
    password: string()
      .min(8, () => 'Too short!')
      .required('Required'),
    passwordReenter: string()
      .min(8, () => 'Too short!')
      .required('Required')
  })

  const handleRegister = async (values: FormProps) => {
    Keyboard.dismiss()

    const res = await register({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password
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
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              passwordReenter: ''
            }}
            validationSchema={registerSchema}
            onSubmit={values => handleRegister(values)}>
            {({ handleChange, handleSubmit, values, errors, isValid }) => (
              <View>
                <View style={styles.inputContainer}>
                  <View style={styles.formError}>
                    {errors.firstName && (
                      <StyledText
                        fontSize={Font.SM}
                        fontWeight={500}
                        color={Colours.Flamingo}>
                        {errors.firstName}
                      </StyledText>
                    )}
                  </View>
                  <FormInput
                    testID="registerFirstName"
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    placeholder="first name"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.formError}>
                    {errors.lastName && (
                      <StyledText
                        fontSize={Font.SM}
                        fontWeight={500}
                        color={Colours.Flamingo}>
                        {errors.lastName}
                      </StyledText>
                    )}
                  </View>
                  <FormInput
                    testID="registerLastName"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    placeholder="last name"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.formError}>
                    {errors.email && (
                      <StyledText
                        fontSize={Font.SM}
                        fontWeight={500}
                        color={Colours.Flamingo}>
                        {errors.email}
                      </StyledText>
                    )}
                  </View>
                  <FormInput
                    testID="registerEmail"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    placeholder="email"
                  />
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.formError}>
                    {errors.password && (
                      <StyledText
                        fontSize={Font.SM}
                        fontWeight={500}
                        color={Colours.Flamingo}>
                        {errors.password}
                      </StyledText>
                    )}
                  </View>
                  <FormInput
                    testID="passwordInput"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    placeholder="password"
                    secure
                  />
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.formError}>
                    {values.password !== values.passwordReenter && (
                      <StyledText
                        fontSize={Font.SM}
                        fontWeight={500}
                        color={Colours.Flamingo}>
                        {'Passwords don’t match'}
                      </StyledText>
                    )}
                  </View>
                  <FormInput
                    testID="registerPasswordReenter"
                    value={values.passwordReenter}
                    onChangeText={handleChange('passwordReenter')}
                    placeholder="re-enter password"
                    secure
                  />
                </View>
                <TouchableOpacity
                  onPress={() => handleSubmit()}
                  disabled={!isValid}
                  style={styles.button}>
                  <StyledText
                    fontSize={Font.LG}
                    fontWeight={100}
                    color={Colours.Denim}
                    alignment={TextAlign.Centre}>
                    Sign up
                  </StyledText>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
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
    marginTop: Padding.XL,
    flex: 1
  },
  background: {
    position: 'absolute',
    width: '150%',
    height: '150%',
    bottom: -30,
    left: -100,
    zIndex: -999
  },
  heading: {
    marginTop: Padding.MD,
    marginBottom: Padding.LG
  },
  formContainer: {
    alignItems: 'center'
  },
  formError: {
    margin: Padding.SM,
    height: 20
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginTop: -Padding.SM
  },
  button: {
    marginBottom: Padding.MD,
    padding: Padding.SM
  }
})
