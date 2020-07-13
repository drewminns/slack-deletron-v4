import React from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'

import { Navigation } from './components/Navigation'
import { Form } from './components/form/Form'
import { FileDisplay } from './components/files/FileDisplay'
import { FileQueue } from './components/files/FileQueue'
import { isLoggedInSelector } from './state/selectors'
import { queuedFilesState } from './state/atoms'

import useLogin from './hooks/useLogin'

export const App: React.FC = () => {
  const res = useLogin()
  const isLoggedIn = useRecoilValue(isLoggedInSelector)
  const [queuedFiles, setQueuedFiles] = useRecoilState(queuedFilesState)

  if (res.loading) {
    return <h1>Loading</h1>
  }

  return (
    <>
      <Navigation />
      {isLoggedIn && (
        <>
          <Form />
          <FileDisplay />
          {queuedFiles.length !== 0 && <FileQueue />}
        </>
      )}
    </>
  )
}

App.displayName = 'App'
