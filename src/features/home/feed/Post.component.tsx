import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Colours } from 'src/common/Colours'
import { SvgImages } from 'src/common/Images'
import { Font, Padding } from 'src/common/Sizes'
import { StyledText } from 'src/components/StyledText/StyledText.component'
import { PostObj } from 'src/features/home/feed/Feed.component'
import { formatDate } from 'src/utils/dateUtils'
import { TabRoutes } from 'src/utils/navigationUtils'

interface PostProps {
  post: PostObj
  screen: TabRoutes
}

export const Post = ({ post, screen }: PostProps) => {
  const styles = useStyles(screen)

  return (
    <View style={styles.container}>
      <View style={styles.post}>
        <View style={styles.authorIcon}>
          <SvgImages.ProfileTabIcon width={40} height={40} />
        </View>
        <View style={styles.postBody}>
          <StyledText fontSize={Font.MD} fontWeight={300}>
            {post.author}
          </StyledText>
          <View style={styles.datePosted}>
            <StyledText fontSize={Font.SM} fontWeight={400}>
              {formatDate(post.datePosted)}
            </StyledText>
          </View>
          <StyledText fontSize={Font.SM + 2} fontWeight={300}>
            {post.content}
          </StyledText>
        </View>
      </View>
    </View>
  )
}

const useStyles = (screen: TabRoutes) =>
  StyleSheet.create({
    container: {
      flexShrink: 1,
      marginBottom: Padding.MD,
      paddingHorizontal: Padding.XS * 3,
      paddingVertical: Padding.MD,
      borderRadius: 24,
      borderWidth: 4,
      borderColor:
        screen === TabRoutes.Home ? Colours.Spring : Colours.Flamingo,
      backgroundColor:
        screen === TabRoutes.Home ? Colours.LightSpring : Colours.LightFlamingo
    },
    post: {
      flexDirection: 'row'
    },
    authorIcon: {
      marginRight: Padding.SM
    },
    postBody: {
      flexShrink: 1
    },
    datePosted: {
      marginBottom: Padding.XS
    }
  })
