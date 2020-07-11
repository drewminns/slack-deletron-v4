import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { UserDetailsResponse } from '../../shared'
import { userDetailsState } from '../state'

export const LOCALSTORAGE_TOKEN_NAME = 'sd-token'

export default function useLogin() {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  const [userDetails, setUserDetails] = useRecoilState(userDetailsState)

  useEffect(() => {
    const storedToken =
      localStorage.getItem(LOCALSTORAGE_TOKEN_NAME) || new URLSearchParams(location.search).get('token')

    if (!storedToken) {
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        const userProfileFetch = await fetch('/api/user/userdetails', {
          headers: new Headers({
            Authorization: `Bearer ${storedToken}`,
          }),
        })
        const userProfileData: UserDetailsResponse = await userProfileFetch.json()

        if (userProfileData.ok) {
          const {
            data: { profile, channels, token },
          } = userProfileData
          const { protocol, host } = window.location
          window.history.pushState({}, document.title, protocol + '//' + host)
          localStorage.setItem(LOCALSTORAGE_TOKEN_NAME, storedToken)
          setUserDetails({ token, profile, channels })
          setLoading(false)
        } else {
          localStorage.removeItem(LOCALSTORAGE_TOKEN_NAME)
          setError('Login Error')
          setLoading(false)
        }
      } catch (error) {
        localStorage.removeItem(LOCALSTORAGE_TOKEN_NAME)
        console.log('error')
        setError(error)
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  return {
    loading,
    error,
  }
}