import Config from 'react-native-config'

const { BASE_URL } = Config

interface RegisterProps {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const useRegister = () => {
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

      return response
    } catch (error) {
      console.log(error)
    }
  }

  return { register }
}
