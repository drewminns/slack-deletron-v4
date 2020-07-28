import React from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { rem } from 'polished'

import { Navigation } from './components/Navigation'
import { Loading } from './components/Loading'
import { Home } from './components/Home'
import { Files } from './components/Files'
import { userDetailsState } from './state'

import useLogin from './hooks/useLogin'

export const App: React.FC = () => {
  const { loading } = useLogin()
  const { token } = useRecoilValue(userDetailsState)

  if (loading) {
    return <Loading />
  }

  return token ? (
    <>
      <div>
        <Navigation />
      </div>
      <Files />
    </>
  ) : (
    <Home />
  )
}

App.displayName = 'App'

const AppContainer = styled.div``
