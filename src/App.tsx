import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'

import { device } from './styles'

import { Navigation } from './components/Navigation'
import { Loading } from './components/Loading'
import { Home } from './components/Home'
import { FileList } from './components/files/FileList'
import { FilesDetails } from './components/files/FilesDetails'
import { Form } from './components/form/Form'
import { Button } from './components/common/Button'
import { Footer } from './components/Footer'
import { About } from './components/About'

import { userDetailsState, fetchedFilesState, formState } from './state'

import useLogin from './hooks/useLogin'
import useFetchFiles from './hooks/useFetchFiles'
import useDeleteFiles from './hooks/useDeleteFiles'

export const App: React.FC = () => {
  const [formVisible, toggleFormVisibility] = useState<boolean>(false)
  const [aboutVisible, toggleAboutVisibility] = useState<boolean>(false)

  const { token } = useRecoilValue(userDetailsState)
  const formData = useRecoilValue(formState)
  const fetchedFiles = useRecoilValue(fetchedFilesState)

  const { loading } = useLogin()
  const { fetchFiles, isInitialFetching } = useFetchFiles()
  const { deleteFile, deleteAll, isDeleting } = useDeleteFiles()

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
        <HeaderContainer>
          <Navigation />
          <FilesDetails
            toggleFormVisibility={toggleFormVisibility}
            handleDeleteAll={deleteAll}
            isDeleting={isDeleting}
          />
          {formVisible && <Form handleFormSubmit={fetchFiles} toggleFormVisibility={toggleFormVisibility} />}
        </HeaderContainer>
        <FileWrapper isDeleting={isDeleting}>
          {fetchedFiles.length ? (
            <FileList />
          ) : (
            <FileNone>
              <p>No files found. Either you got them all, or you should try filtering </p>
              <ButtonGroup>
                <Button onClick={() => toggleFormVisibility(true)}>Modify Filters</Button>
                <Button color="orange" onClick={() => fetchFiles()}>
                  {formData ? 'Clear Filters' : 'Try Again'}
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
      <Home />
      <Footer handleAboutVisibility={toggleAboutVisibility} />
      {aboutVisible && <About handleAboutVisibility={toggleAboutVisibility} />}
    </>
  )
}

App.displayName = 'App'

const AppContainer = styled.div``

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: var(--white);
  border-bottom: 1px solid var(--grey);
`

const FileWrapper = styled.div<{ isDeleting: boolean }>`
  padding: 10px;
  margin-top: 187px;
  padding-bottom: 70px;
  opacity: ${(props) => (props.isDeleting ? 0.3 : 1)};
  ${device.sm`
    margin-top: 160px;
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
    margin-top: 190px;
  `}
`

const ButtonGroup = styled.div`
  display: flex;

  & > button:first-child {
    margin-right: 10px;
  }
`
