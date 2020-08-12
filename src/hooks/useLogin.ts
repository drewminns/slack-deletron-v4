import { useState, useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { UserDetailsResponse } from '../../shared'
import { userDetailsState, applicationNoticeState } from '../state'

export const LOCALSTORAGE_TOKEN_NAME = 'sd-token'

export default function useLogin() {
  const [loading, setLoading] = useState<boolean>(true)

  const setApplicationError = useSetRecoilState(applicationNoticeState)
  const setUserDetails = useSetRecoilState(userDetailsState)

  useEffect(() => {
    const error = new URLSearchParams(location.search).get('error')
    if (error) {
      if (error === 'access_denied') {
        setApplicationError({
          active: true,
          value:
            'Unable to login with your Slack Workspace. Please contact your workspace admin or try again with another account',
        })
      } else {
        setApplicationError({ active: true, value: 'Unable to login with your Slack account. Please try again' })
      }
      setLoading(false)
      return
    }

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
          setApplicationError({ active: false, value: '' })
          setLoading(false)
        } else {
          localStorage.removeItem(LOCALSTORAGE_TOKEN_NAME)
          setApplicationError({ active: true, value: 'Login Error' })
          setLoading(false)
        }
      } catch (error) {
        localStorage.removeItem(LOCALSTORAGE_TOKEN_NAME)
        setApplicationError({ active: true, value: error })
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  return {
    loading,
  }
}
