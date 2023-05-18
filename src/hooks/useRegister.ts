import { Colours } from 'src/common/Colours'
import { BASE_URL } from 'src/common/Urls'
import { useAppDispatch } from 'src/hooks/useAppDispatch'
import { showModal } from 'src/store/slices/modalSlice'

interface RegisterProps {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const useRegister = () => {
  const dispatch = useAppDispatch()

  const register = async ({
    firstName,
    lastName,
    email,
    password
  }: RegisterProps) => {
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password
        })
      })

      if (response.ok) {
        return response
      }

      dispatch(
        showModal({
          title: 'Sign up failed!',
          message: 'Something unexpected occurred.',
          theme: Colours.Flamingo
        })
      )
    } catch (error) {
      dispatch(
        showModal({
          title: 'Sign up failed!',
          message: 'Something unexpected occurred.',
          theme: Colours.Flamingo
        })
      )
      console.log(error)
    }
  }

  return { register }
}
