import React from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { Colours } from 'src/common/Colours';
import { Post } from 'src/hooks/useMantePieceApi';

export const MPPost = ({ author, content, postDate }: Post) => {
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <Text style={styles.author}>
        {author + ' - ' + postDate.substring(0, 10)}
      </Text>
      <Text style={styles.content}>{content}</Text>
    </View>
  );
};

const getStyles = () => {
  const generateBgColour = () => {
    const randInt = Math.floor(Math.random() * 5);
    switch (randInt) {
      case 1:
        return Colours.Flamingo;
      case 2:
        return Colours.Spring;
      case 3:
        return Colours.Violet;
      default:
        return Colours.Butter;
    }
  };

  return StyleSheet.create({
    container: {
      width: '100%',
      minHeight: 48,
      borderRadius: 12,
      backgroundColor: generateBgColour(),
      padding: 10,
      marginVertical: 8,
    },
    author: {
      fontSize: 16,
      paddingBottom: 6,
    },
    content: {
      fontSize: 12,
    },
  });
};
