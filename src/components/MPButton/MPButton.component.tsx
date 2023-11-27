import React from 'react';

import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

import { Colours } from 'src/common/Colours';

type MPButtonProps = {
  title: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
};

export const MPButton = ({
  disabled = false,
  title,
  onPress,
}: MPButtonProps) => {
  return (
    <TouchableOpacity
      style={disabled ? [styles.button, styles.disabled] : styles.button}
      disabled={disabled}
      onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    opacity: 1.0,
    width: 80,
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: Colours.Denim,
  },
  buttonText: {
    color: Colours.White,
  },
  disabled: {
    opacity: 0.2,
  },
});
