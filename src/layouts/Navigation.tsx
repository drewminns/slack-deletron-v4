import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import useSWR from 'swr'

import { token } from '../store'

const LOCALSTORAGE_TOKEN_NAME = 'sd-token'

export const Navigation: React.FC = () => {
  const [tokenValue, setTokenValue] = useRecoilState(token)

  useEffect(() => {
    const URLtoken = new URLSearchParams(location.search).get('token')
    const token = localStorage.getItem(LOCALSTORAGE_TOKEN_NAME)
    if (!tokenValue) {
      if (URLtoken) {
        const { protocol, host } = window.location
        window.history.pushState({}, document.title, protocol + '//' + host)
        localStorage.setItem(LOCALSTORAGE_TOKEN_NAME, URLtoken)
        setTokenValue(URLtoken)
      } else if (token) {
        setTokenValue(token)
      } else {
        setTokenValue('')
      }
    }
  }, [tokenValue])

  return (
    <header className="flex items-center justify-between flex-wrap bg-black p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <h1 className="text-lg">Slack Deletron</h1>
      </div>
      {!tokenValue ? (
        <a href="/api/auth/login" className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
          Login
        </a>
      ) : (
        <p>{tokenValue}</p>
      )}
    </header>
  )
}

Navigation.displayName = 'Navigation'
