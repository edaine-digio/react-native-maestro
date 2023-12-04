import React, { useState } from 'react';

import { RootStackParamList } from 'App';
import { SafeAreaView, Image, View, StyleSheet } from 'react-native';

import { MPButton } from '@components/MPButton/MPButton.component';
import { MPTextInput } from '@components/MPTextInput/MPTextInput.component';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Colours } from 'src/common/Colours';
import { Images } from 'src/common/Images';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const Login = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(
      `Login button pressed with email: ${email} & password: ${password}`,
    );
    navigation.navigate('Home');
  };

  const disableLoginButton = email.length === 0 || password.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={Images.appLogo} />
      <View style={styles.login}>
        <MPTextInput text={email} placeholder="Email" onChange={setEmail} />
        <MPTextInput
          text={password}
          placeholder="Password"
          onChange={setPassword}
          secureTextEntry
        />
        <MPButton
          testID="btn-login"
          title="Login"
          disabled={disableLoginButton}
          onPress={handleLogin}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colours.Flax,
  },
  image: {
    width: 260,
    height: 100,
    marginTop: 64,
    marginBottom: 32,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  login: {
    gap: 20,
    alignItems: 'center',
  },
});
