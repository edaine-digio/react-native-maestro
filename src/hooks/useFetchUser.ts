import { useState } from 'react'
import { BASE_URL } from 'src/common/Urls'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { storage } from 'src/store/deviceStore'
import { updateUser } from 'src/store/slices/userSlice'

interface GetUserProps {
  email: string | undefined
  token: string | undefined
}

export const useFetchUser = ({ email, token }: GetUserProps) => {
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)

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
      }
    } catch (error) {
      console.log('Error fetching user details:', error)
    }
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }

  return { fetchUser, loading }
}
