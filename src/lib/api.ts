import axios from 'axios'

const baseURL = import.meta.env.VITE_PUBLIC_API

export const request = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export const loginFn = async (data: {
  email: Record<string, string>
  password: Record<string, string>
}): Promise<{
  message: string
  access_token: string
  username: string
  email_verified_at: string
  is_profile_filled: boolean
  role: string[]
}> => {
  return (await request.post('/login', data)).data
}

export const getUserFn = async (
  authorization: string,
): Promise<{
  id: string
  name: string | null
  first_name: string | null
  last_name: string | null
  email: string
  is_active: boolean
  email_verified_at: string
  is_profile_filled: boolean
  created_at: string
}> => {
  try {
    const response = await request.get('/users/me', {
      headers: { Authorization: `Bearer ${authorization}` },
    })

    return response.data?.data // Safely access the `data` field
  } catch (error: any) {
    console.error('Error fetching user data:', error.message || error)
    throw new Error('Failed to fetch user data')
  }
}
