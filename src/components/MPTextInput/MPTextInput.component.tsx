import React from 'react';

import { StyleSheet, TextInput } from 'react-native';

import { Colours } from 'src/common/Colours';

type MPButtonProps = {
  text: string;
  placeholder: string;
  onChange?: ((text: string) => void) | undefined;
  secureTextEntry?: boolean;
};

export const MPTextInput = ({
  text,
  placeholder,
  onChange,
  secureTextEntry = false,
}: MPButtonProps) => {
  return (
    <TextInput
      style={styles.input}
      onChangeText={onChange}
      value={text}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      autoCorrect={false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: 260,
    backgroundColor: Colours.White,
    padding: 16,
    borderRadius: 4,
  },
});
