import React from 'react'

import { Navigation } from './Navigation'

import useLogin from '../hooks/useLogin'

export const App: React.FC = () => {
  const res = useLogin()

  if (res.loading) {
    return <h1>Loading</h1>
  }

  return (
    <>
      <Navigation />
    </>
  )
}

App.displayName = 'App'
