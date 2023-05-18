import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Colours } from 'src/common/Colours'
import { BASE_URL } from 'src/common/Urls'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { storage } from 'src/store/deviceStore'
import { showModal } from 'src/store/slices/modalSlice'
import { refreshToken } from 'src/store/slices/userSlice'
import { RootState } from 'src/store/store'

export const usePosts = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const { email, token } = useSelector((state: RootState) => state.user)

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/posts/posts`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          token: token
        })
      })

      if (response.ok) {
        const posts = await response.json()
        storage.set('accessToken', posts.token)

        dispatch(refreshToken(posts.token))

        return posts
      } else {
        dispatch(
          showModal({
            title: 'Sign up failed!',
            message: 'Something unexpected occurred.',
            theme: Colours.Flamingo
          })
        )
      }

      return []
    } catch (error) {
      dispatch(
        showModal({
          title: 'Woops!',
          message: 'Something unexpected occurred.',
          theme: Colours.Flamingo
        })
      )
      console.log('Error fetching posts:', error)
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const createPost = async (content: string) => {
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/posts/create`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          token: token,
          content: content,
          date: new Date()
        })
      })

      if (response.ok) {
        const result = await response.json()
        storage.set('accessToken', result.token)

        dispatch(refreshToken(result.token))
      } else {
        dispatch(
          showModal({
            title: 'Woops!',
            message: 'Something unexpected occurred.',
            theme: Colours.Flamingo
          })
        )
      }
    } catch (error) {
      dispatch(
        showModal({
          title: 'Woops!',
          message: 'Something unexpected occurred.',
          theme: Colours.Flamingo
        })
      )
      console.log('Error creating post:', error)
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return { fetchPosts, createPost, loading }
}
