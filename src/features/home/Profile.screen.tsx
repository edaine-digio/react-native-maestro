import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';

import { MPButton } from 'src/components/MPButton/MPButton.component';
import { MPTextInput } from 'src/components/MPTextInput/MPTextInput.component';
import { API_STATE, useMantelPieceApi } from 'src/hooks/useMantelPieceApi';

export const Profile = () => {
  const { createPost, apiState } = useMantelPieceApi();
  const [postContent, setPostContent] = useState<string>('');

  const handleCreatePost = () => {
    createPost(postContent);

    if (apiState === API_STATE.ERROR) {
      return <Text>There was an error</Text>;
    }

    if (apiState === API_STATE.LOADING) {
      return <Text>Creating post...</Text>;
    }
  };

  return (
    <View style={styles.createPost}>
      <MPTextInput
        text={postContent}
        placeholder="Write a post here!"
        onChange={setPostContent}
      />
      <MPButton disabled={false} title="Post!" onPress={handleCreatePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  createPost: {
    flex: 1,
    width: '100%',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
