import React, { FC } from 'react'
import { useRecoilState } from 'recoil'

import { userDetailsState } from '../state'
import { LOCALSTORAGE_TOKEN_NAME } from '../hooks/useLogin'

export const Navigation: FC = () => {
  const [userDetails, setUserDetails] = useRecoilState(userDetailsState)

  const handleLogout = () => {
    setUserDetails({})
    localStorage.removeItem(LOCALSTORAGE_TOKEN_NAME)
  }

  return (
    <header className="flex items-center justify-between flex-wrap bg-black p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <h1 className="text-lg">Slack Deletron</h1>
      </div>
      {!userDetails.token ? (
        <a href="/api/auth/login" className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
          Login
        </a>
      ) : (
        <>
          <p className="text-white">{userDetails.profile.real_name}</p>
          <img src={userDetails.profile.image} alt={userDetails.profile.real_name} />
          <button
            className="bg-purple-700 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      )}
    </header>
  )
}

Navigation.displayName = 'Navigation'
