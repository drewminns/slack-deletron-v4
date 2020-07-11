import React from 'react'
import { useRecoilValue } from 'recoil'

import { Navigation } from './components/Navigation'
import { Form } from './components/Form'
import { isLoggedInSelector } from './state'

import useLogin from './hooks/useLogin'

export const App: React.FC = () => {
  const res = useLogin()
  const isLoggedIn = useRecoilValue(isLoggedInSelector)

  if (res.loading) {
    return <h1>Loading</h1>
  }

  return (
    <>
      <Navigation />
      {isLoggedIn && <Form />}
    </>
  )
}

App.displayName = 'App'
