import { BASE_URL } from 'src/common/Urls'

interface LoginProps {
  email: string
  password: string
}

export const useLogin = () => {
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

      return response
    } catch (error) {
      console.log(error)
    }
  }

  return { login }
}
