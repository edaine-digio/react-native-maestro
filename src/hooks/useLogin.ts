import Config from 'react-native-config'

const { BASE_URL } = Config

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
