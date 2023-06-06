import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

export const Login = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Start here!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  text: {
    color: 'white',
  },
});
