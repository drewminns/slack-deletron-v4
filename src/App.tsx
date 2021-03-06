import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { device } from './styles'

import { ReactComponent as Restart } from './assets/restart.svg'
import { ReactComponent as Close } from './assets/close.svg'

import { About } from './components/About'
import { Footer } from './components/Footer'
import { Home } from './components/Home'
import { Loading } from './components/Loading'
import { Navigation } from './components/Navigation'

import { FileList, FilesDetails } from './components/files'
import { Form } from './components/form/Form'
import { Button, Banner } from './components/common'

import { userDetailsState, fetchedFilesState, formState, applicationNoticeState } from './state'

import useLogin from './hooks/useLogin'
import useFetchFiles from './hooks/useFetchFiles'
import useDeleteFiles from './hooks/useDeleteFiles'

export const App: React.FC = () => {
  const [formVisible, toggleFormVisibility] = useState<boolean>(false)
  const [aboutVisible, toggleAboutVisibility] = useState<boolean>(false)

  const { token } = useRecoilValue(userDetailsState)
  const formData = useRecoilValue(formState)
  const fetchedFiles = useRecoilValue(fetchedFilesState)
  const applicationNotice = useRecoilValue(applicationNoticeState)

  const { loading } = useLogin()
  const { fetchFiles, isInitialFetching } = useFetchFiles()
  const { deleteAll, isDeleting } = useDeleteFiles()

  useEffect(() => {
    if (!loading && token) {
      fetchFiles()
    }
  }, [loading, token])

  if (loading) {
    return <Loading />
  }

  return token ? (
    !isInitialFetching ? (
      <>
        {applicationNotice.active && <Banner value={applicationNotice.value} type={applicationNotice.type} />}
        <HeaderContainer>
          <Navigation />
          <FilesDetails
            toggleFormVisibility={toggleFormVisibility}
            handleDeleteAll={deleteAll}
            isDeleting={isDeleting}
          />
          {formVisible && <Form handleFormSubmit={fetchFiles} toggleFormVisibility={toggleFormVisibility} />}
        </HeaderContainer>
        <FileWrapper>
          {fetchedFiles.length ? (
            <FileList isDeleting={isDeleting} />
          ) : (
            <FileNone>
              <p>No files found. Either you got them all, or you should try filtering </p>
              <ButtonGroup>
                <Button onClick={() => toggleFormVisibility(true)}>Modify Filters</Button>
                <Button color="orange" onClick={() => fetchFiles()} icon={formData ? <Close /> : <Restart />}>
                  {formData ? 'Clear Filters' : 'Search Again'}
                </Button>
              </ButtonGroup>
            </FileNone>
          )}
          <Footer handleAboutVisibility={toggleAboutVisibility} />
          {aboutVisible && <About handleAboutVisibility={toggleAboutVisibility} />}
        </FileWrapper>
      </>
    ) : (
      <Loading />
    )
  ) : (
    <>
      <Home errorString={applicationNotice.value} />
      <Footer handleAboutVisibility={toggleAboutVisibility} />
      {aboutVisible && <About handleAboutVisibility={toggleAboutVisibility} />}
    </>
  )
}

App.displayName = 'App'

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: var(--white);
  border-bottom: 1px solid var(--grey);
`

const FileWrapper = styled.div`
  padding: 10px;
  margin-top: 200px;
  padding-bottom: 70px;

  ${device.sm`
    margin-top: 164px;
    padding: 10px 25px;
    padding-bottom: 40px;
  `};
`
const FileNone = styled.div`
  margin-top: 60px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;

  ${device.sm`
    margin-top: 10px;
  `}

  ${device.md`
    margin-top: 160px;
  `}
`

const ButtonGroup = styled.div`
  display: flex;

  & > button:first-child {
    margin-right: 10px;
  }
`
