import React from 'react'
import { useRecoilState } from 'recoil'

import { Navigation } from './components/Navigation'
import { Form } from './components/form/Form'
import { FileDisplay } from './components/files/FileDisplay'
import { FileQueue } from './components/files/FileQueue'
import { queuedFilesState, userDetailsState } from './state'

import useLogin from './hooks/useLogin'

export const App: React.FC = () => {
  const res = useLogin()
  const [queuedFiles] = useRecoilState(queuedFilesState)
  const [userDetails] = useRecoilState(userDetailsState)

  if (res.loading) {
    return <h1>Loading</h1>
  }

  return (
    <>
      <Navigation />
      {userDetails.token && (
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
