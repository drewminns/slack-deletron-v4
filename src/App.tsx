import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { rem } from 'polished'

import { Navigation } from './components/Navigation'
import { Form } from './components/form/Form'
import { FileDisplay } from './components/files/FileDisplay'
import { Profile } from './components/Profile'
import { FileDetails } from './components/files/FileDetails'
import { userDetailsState } from './state'

import useLogin from './hooks/useLogin'

export const App: React.FC = () => {
  const res = useLogin()
  const [userDetails] = useRecoilState(userDetailsState)

  if (res.loading) {
    return (
      <AppLoading>
        <AppLoadingText>Loading</AppLoadingText>
      </AppLoading>
    )
  }

  return (
    <AppWrapper>
      {userDetails.token ? (
        <>
          <AppContainer>
            <Navigation />
            <Form />
            <Profile />
          </AppContainer>
          <AppFileDisplay>
            <FileDetails />
            <FileDisplay />
          </AppFileDisplay>
        </>
      ) : (
        <Navigation />
      )}
    </AppWrapper>
  )
}

App.displayName = 'App'

const AppWrapper = styled.div`
  display: flex;
`

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  padding: 25px;
  padding-top: var(--hs);
  // background-color: var(--color-darker);
  position: relative;
  width: 260px;
`

const AppFileDisplay = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: var(--color-white);
  margin-top: 25px;
  margin-left: 10px;
  padding: 25px;
  border-top-left-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`

const AppLoading = styled.div`
  display: flex;
  min-height: 100vh;
`

const AppLoadingText = styled.div`
  margin: auto;
  font-weight: 700;
  font-size: ${rem(32, 10)};
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 90%;
    left: 5%;
    bottom: -10px;
    display: block;
    height: ${rem(10, 10)};
    background-color: var(--color-orange);
  }
`
