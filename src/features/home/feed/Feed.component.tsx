import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Padding } from 'src/common/Sizes'
import { Post } from 'src/features/home/feed/Post.component'
import { TabRoutes } from 'src/utils/navigationUtils'

export type PostObj = {
  _id: string | number
  content: string
  likes: number
  datePosted: string
  author: string
  authorId: string
}

interface FeedProps {
  posts: PostObj[]
  screen: TabRoutes
}

export const Feed = ({ posts, screen }: FeedProps) => {
  return (
    <View style={styles.container}>
      {posts.map((post, index) => (
        <Post post={post} screen={screen} key={index} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: Padding.LG * 3
  }
})
