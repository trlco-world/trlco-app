import axios, { AxiosResponse } from 'axios'

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

export const logoutFn = async (
  authorization: string,
): Promise<AxiosResponse> => {
  return await request.post(
    '/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    },
  )
}

export const signUpFn = async (data: {
  name: string
  email: string
  password: Record<string, string>
  password_confirmation: Record<string, string>
}): Promise<{
  message: string
  access_token: string
  username: string
  email_verified_at: string
  is_profile_filled: boolean
  role: string[]
}> => (await request.post('/register', data)).data

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
} | null> => {
  try {
    // Ensure the authorization token exists
    if (!authorization) {
      console.warn('Authorization token is missing.')
      return null
    }

    // Make the API request
    const response = await request.get('/users/me', {
      headers: { Authorization: `Bearer ${authorization}` },
    })

    // Check if the response contains valid data
    if (response.data?.data) {
      return response.data.data
    } else {
      console.warn('No user data found in the response.')
      return null
    }
  } catch (error: any) {
    console.log(error)
    // Handle specific error cases
    if (error.response?.status === 401) {
      console.warn('Unauthorized access. Token might be invalid or expired.')
    } else {
      console.error('An unexpected error occurred:', error.message || error)
    }

    // Return null to indicate failure gracefully
    return null
  }
}

export const resetUserPasswordFn = async (
  token: string,
  password: string,
  password_confirmation: string,
) => {
  try {
    const response = await request.post(
      '/api/reset-password',
      {
        password,
        password_confirmation,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )
    if (response.data?.data) {
      return response.data?.data
    }
  } catch (error) {
    console.log(error)
  }
}

export const updateUserFn = async (
  authorization: string,
  first_name: string,
  last_name: string,
) => {
  try {
    const response = await request.post(
      '/users/me/update',
      {
        first_name,
        last_name,
      },
      {
        headers: { Authorization: `Bearer ${authorization}` },
      },
    )

    if (response.data?.data) {
      return response.data?.data
    }
  } catch (error) {
    console.log(error)
  }
}

export const completeUserProfileFn = async (args: {
  authorization: string
  first_name: string
  last_name: string
  mobile_number: string
}) => {
  const { authorization, first_name, last_name, mobile_number } = args
  try {
    const response = (await request.post(
      '/users/me/complete-profile',
      {
        first_name,
        last_name,
        mobile_number,
      },
      {
        headers: { Authorization: `Bearer ${authorization}` },
      },
    )) as {
      data: {
        id: string
        name: string
        first_name: string
        last_name: string
        email: string
        is_active: boolean
        email_verified_at: string | null
        is_profile_filled: boolean
        created_at: string
      }
    }

    if (response.data) {
      return response.data
    }
  } catch (error) {
    console.log(error)
  }
}

export const userKYCFn = async (
  authorization: string,
): Promise<{ refId: string }> => {
  const response = await request.get('/users/me/get-kyc-record', {
    headers: { Authorization: `Bearer ${authorization}` },
  })
  return response.data.refId
}
