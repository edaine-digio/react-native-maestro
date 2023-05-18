import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { useSelector } from 'react-redux'
import { Colours } from 'src/common/Colours'
import { SvgImages } from 'src/common/Images'
import { Font, Padding } from 'src/common/Sizes'
import { StyledText } from 'src/components/StyledText/StyledText.component'
import { Feed, PostObj } from 'src/features/home/feed/Feed.component'
import { usePosts } from 'src/hooks/usePosts'
import { useUser } from 'src/hooks/useUser'
import { RootState } from 'src/store/store'
import { TabRoutes } from 'src/utils/navigationUtils'
import { object, string } from 'yup'

export const Profile = () => {
  const [userPosts, setUserPosts] = useState([])

  const { firstName, lastName, email } = useSelector(
    (state: RootState) => state.user
  )

  const { fetchPosts } = useUser()

  const { createPost } = usePosts()

  useEffect(() => {
    fetchPosts().then(result => {
      const sortedPosts = result.posts.sort(
        (a: PostObj, b: PostObj) =>
          Date.parse(b.datePosted) - Date.parse(a.datePosted)
      )
      setUserPosts(sortedPosts)
    })
  }, [])

  const postSchema = object({
    content: string().required('Post can’t be empty')
  })

  const handlePostSubmit = async (content: string) => {
    await createPost(content)
    const updatedPosts = await fetchPosts()

    const sortedPosts = updatedPosts.posts.sort(
      (a: PostObj, b: PostObj) =>
        Date.parse(b.datePosted) - Date.parse(a.datePosted)
    )
    setUserPosts(sortedPosts)
  }

  // TEMP
  const friendCount = 1039

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <View style={styles.userImage}>
              <SvgImages.ProfileTabIcon width={80} height={80} />
            </View>
            <View style={styles.userName}>
              <StyledText fontSize={Font.XL} fontWeight={300}>
                {`${firstName} ${lastName}`}
              </StyledText>
              <StyledText fontSize={Font.SM} fontWeight={400}>
                {`${email}`}
              </StyledText>
            </View>
          </View>
        </View>
        <View style={styles.userStats}>
          <View style={styles.userStatContainer}>
            <StyledText fontSize={Font.MD} fontWeight={300}>
              {`Posts: ${userPosts.length}`}
            </StyledText>
          </View>
          <View style={styles.userStatContainer}>
            <StyledText fontSize={Font.MD} fontWeight={300}>
              {`Friends: ${friendCount}`}
            </StyledText>
          </View>
        </View>
        <View style={styles.postSubmit}>
          <Formik
            initialValues={{ content: '' }}
            validationSchema={postSchema}
            onSubmit={async (values, formProps) => {
              await handlePostSubmit(values.content)
              formProps.resetForm()
            }}>
            {({ handleChange, handleSubmit, values, errors, isValid }) => (
              <View>
                {errors.content && (
                  <View style={styles.formError}>
                    <StyledText
                      fontSize={Font.SM}
                      fontWeight={500}
                      color={Colours.Flamingo}>
                      {errors.content}
                    </StyledText>
                  </View>
                )}
                <View style={styles.postForm}>
                  <TextInput
                    testID="postFormInput"
                    value={values.content}
                    onChangeText={handleChange('content')}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.postInput}
                    placeholder="Write a post"
                    placeholderTextColor={Colours.MedGrey}
                  />
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.sendIcon}
                    onPress={() => handleSubmit()}>
                    <SvgImages.SendIcon
                      width={40}
                      height={40}
                      fill={Colours.Flamingo}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
        <View style={styles.recentActivityTitle}>
          <StyledText fontSize={Font.MD} fontWeight={600} color={Colours.Flax}>
            Recent posts
          </StyledText>
        </View>
        <Feed posts={userPosts} screen={TabRoutes.Profile} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    paddingHorizontal: Padding.MD + 4,
    paddingTop: Padding.MD,
    marginBottom: Padding.LG
  },
  headerContainer: {
    marginBottom: Padding.MD,
    padding: Padding.MD,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: Colours.Flamingo,
    backgroundColor: Colours.LightFlamingo
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  userImage: {
    marginHorizontal: Padding.SM
  },
  userName: {
    flexShrink: 1
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  userStatContainer: {
    width: '48.5%',
    marginBottom: Padding.MD,
    padding: Padding.MD,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: Colours.Flamingo,
    backgroundColor: Colours.LightFlamingo
  },
  recentActivityTitle: {
    padding: Padding.MD,
    marginBottom: Padding.MD,
    borderRadius: 24,
    borderColor: Colours.Denim,
    backgroundColor: Colours.Denim
  },
  postSubmit: {
    width: '100%',
    padding: Padding.SM,
    marginBottom: Padding.MD,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: Colours.Flamingo,
    backgroundColor: Colours.LightFlamingo
  },
  postForm: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  postInput: {
    flex: 1,
    color: Colours.Denim,
    fontFamily: 'Archivo-Thin',
    paddingHorizontal: Padding.SM,
    fontSize: Font.MD
  },
  formError: {
    paddingTop: Padding.SM,
    paddingLeft: Padding.SM,
    marginBottom: -Padding.XS
  },
  sendIcon: {
    padding: Padding.SM,
    marginLeft: Padding.SM
  }
})
