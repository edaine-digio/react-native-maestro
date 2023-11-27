import React, { useEffect } from 'react';

import { RootStackParamList } from 'App';
import { Text } from 'react-native';

import { MPFeedFlatList } from '@components/MPFeedFlatList/MPFeedFlatList.section';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { API_STATE, useMantelPieceApi } from 'src/hooks/useMantelPieceApi';

import { TabParamList } from './Home';

type FeedScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Feed'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const Feed = ({ navigation }: FeedScreenProps) => {
  const { fetchPosts, apiState, jsonData } = useMantelPieceApi();

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (apiState === API_STATE.ERROR) {
    return <Text>There was an error</Text>;
  }

  return (
    <MPFeedFlatList
      loading={apiState === API_STATE.LOADING}
      fetchPosts={fetchPosts}
      posts={jsonData}
    />
  );
};
