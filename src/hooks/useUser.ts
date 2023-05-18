import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Colours } from 'src/common/Colours'
import { BASE_URL } from 'src/common/Urls'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { storage } from 'src/store/deviceStore'
import { showModal } from 'src/store/slices/modalSlice'
import { refreshToken, updateUser } from 'src/store/slices/userSlice'
import { RootState } from 'src/store/store'

export const useUser = () => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

  const { email, token } = useSelector((state: RootState) => state.user)

  const fetchUser = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/users/user`, {
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
        const user = await response.json()
        storage.set('accessToken', user.token)

        dispatch(
          updateUser({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            token: user.token
          })
        )
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
      console.log('Error fetching user details:', error)
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${BASE_URL}/users/posts`, {
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
    } catch (error) {
      dispatch(
        showModal({
          title: 'Woops!',
          message: 'Something unexpected occurred.',
          theme: Colours.Flamingo
        })
      )
      console.log('Error fetching user details:', error)
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return { fetchUser, fetchPosts, loading }
}
