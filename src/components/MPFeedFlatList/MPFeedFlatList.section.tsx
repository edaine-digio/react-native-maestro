import React from 'react';

import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

import { Colours } from 'src/common/Colours';
import { MPPost } from 'src/components/MPPost/MPPost.component';
import { Post } from 'src/hooks/useMantelPieceApi';

type MPFFLProps = {
  posts: [Post] | null;
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetchPosts: any;
};

export const MPFeedFlatList = ({ posts, loading, fetchPosts }: MPFFLProps) => {
  const renderPost = (item: Post) => {
    return (
      <MPPost
        author={item.author}
        content={item.content}
        postDate={item.postDate}
      />
    );
  };

  return (
    <View style={styles.feedContainer}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchPosts} />
        }
        data={posts}
        renderItem={({ item }) => renderPost(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 16,
    backgroundColor: Colours.Denim,
  },
});
