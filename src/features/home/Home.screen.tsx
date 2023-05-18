import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Colours } from 'src/common/Colours'
import { Font, Padding } from 'src/common/Sizes'
import {
  StyledText,
  TextAlign
} from 'src/components/StyledText/StyledText.component'
import { Feed, PostObj } from 'src/features/home/feed/Feed.component'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { usePosts } from 'src/hooks/usePosts'
import { showModal } from 'src/store/slices/modalSlice'
import { RootState } from 'src/store/store'
import { sortPosts } from 'src/utils/miscUtils'
import { TabRoutes } from 'src/utils/navigationUtils'

export const Home = () => {
  const dispatch = useAppDispatch()
  const [posts, setPosts] = useState<PostObj[]>([])
  const firstName = useSelector((state: RootState) => state.user.firstName)

  // TODO: Add loading state
  const { fetchPosts } = usePosts()

  useFocusEffect(
    useCallback(() => {
      try {
        fetchPosts().then(result => {
          setPosts(sortPosts(result.posts))
        })
      } catch (error) {
        dispatch(
          showModal({
            title: 'Woops!',
            message: 'Something unexpected occurred.',
            theme: Colours.Flamingo
          })
        )
        console.log(error)
      }
    }, [])
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <View style={styles.homeHeader}>
          <View style={styles.homeTitle}>
            <StyledText
              fontSize={Font.XL}
              fontWeight={200}
              color={Colours.Flax}
              alignment={TextAlign.Left}>
              {`Welcome back, ${firstName}!`}
            </StyledText>
          </View>
          <StyledText
            fontSize={Font.MD}
            fontWeight={600}
            color={Colours.Flax}
            alignment={TextAlign.Left}>
            Here are your latest updates
          </StyledText>
        </View>
        <Feed posts={posts} screen={TabRoutes.Home} />
      </ScrollView>
      {/* <View style={styles.bottomBuffer} /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: Padding.XL
  },
  scrollContainer: {
    marginHorizontal: Padding.MD + 4,
    marginBottom: Padding.LG
  },
  content: {
    marginTop: Padding.MD,
    alignItems: 'center'
  },
  homeHeader: {
    width: '100%',
    marginBottom: Padding.LG,
    padding: Padding.XL,
    borderRadius: 24,
    backgroundColor: Colours.Denim
  },
  homeTitle: {
    marginBottom: Padding.MD
  },
  bottomBuffer: {
    width: '100%',
    height: 45
  }
})
