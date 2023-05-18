import { Colours } from 'src/common/Colours'
import { BASE_URL } from 'src/common/Urls'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { storage } from 'src/store/deviceStore'
import { showModal } from 'src/store/slices/modalSlice'
import { updateUser } from 'src/store/slices/userSlice'

interface LoginProps {
  email: string
  password: string
}

export const useLogin = () => {
  const dispatch = useAppDispatch()

  const login = async ({ email, password }: LoginProps) => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      if (response.ok) {
        const user = await response.json()
        storage.set('accessToken', user.token)
        storage.set('email', user.email)

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
            title: 'Login Failed',
            message: 'Something unexpected occurred.',
            theme: Colours.Flamingo
          })
        )
      }
    } catch (error) {
      console.log(error)
      dispatch(
        showModal({
          title: 'Login Failed',
          message: 'Something unexpected occurred.',
          theme: Colours.Flamingo
        })
      )
    }
  }

  return { login }
}
