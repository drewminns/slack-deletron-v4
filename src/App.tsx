import React, { useState, useEffect } from 'react'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import styled from 'styled-components'
import { parseISO, getUnixTime, addDays } from 'date-fns'

import { Navigation } from './components/Navigation'
import { Loading } from './components/Loading'
import { Home } from './components/Home'
import { FileList } from './components/files/FileList'
import { FilesDetails } from './components/files/FilesDetails'
import { Form } from './components/form/Form'
import { Button } from './components/common/Button'
import { Footer } from './components/Footer'
import { About } from './components/About'

import { userDetailsState, FormState, fetchedFilesState, applicationErrorState, fetchedPagesState } from './state'
import { FilesListReponse } from '../shared'

import useLogin from './hooks/useLogin'

export const generateSearchParams = (formdata: any, user: string, token: string) => {
  let types = ''
  const params: any = { token, count: '10', show_files_hidden_by_limit: true, user }
  if (formdata) {
    for (const [key, value] of Object.entries(formdata)) {
      if (key === 'channels' && value !== 'ALL') {
        params.channel = formdata.channels
      } else if (value === true && key !== 'displayDate') {
        types += `${key},`
      } else if (key === 'startDate') {
        params.ts_from = getUnixTime(parseISO(value as string))
      } else if (key === 'endDate') {
        params.ts_to = getUnixTime(addDays(parseISO(value as string), 1))
      }
    }

    if (types.length) {
      types = types.substring(0, types.length - 1)
    }
  }

  return new URLSearchParams({ ...params, types })
}

export const App: React.FC = () => {
  const [isInitialFetching, toggleInitialFetching] = useState<boolean>(true)
  const [formVisible, toggleFormVisibility] = useState<boolean>(false)
  const [aboutVisible, toggleAboutVisibility] = useState<boolean>(false)
  const [formState, setFormState] = useState<FormState | any>({})
  const { loading } = useLogin()
  const { token, profile } = useRecoilValue(userDetailsState)
  const setFetchedPages = useSetRecoilState(fetchedPagesState)
  const [fetchedFiles, setFetchedFiles] = useRecoilState(fetchedFilesState)
  const setApplicationError = useSetRecoilState(applicationErrorState)

  const fetchFiles = async (data?: any) => {
    setFormState(data)
    const params = generateSearchParams(data, profile.userId, token)

    try {
      const filesFetch = await fetch('https://slack.com/api/files.list?' + new URLSearchParams(params))
      const files: FilesListReponse = await filesFetch.json()
      if (files.ok) {
        setFetchedFiles(files.files)
        setFetchedPages(files.paging)
        if (isInitialFetching) {
          toggleInitialFetching(false)
        }
      } else {
        setApplicationError({ active: true, value: files.error as string })
      }
    } catch (error) {
      setApplicationError({ active: true, value: error })
    }
  }

  useEffect(() => {
    if (!loading && token) {
      fetchFiles()
    }
  }, [loading, token])

  if (loading) {
    return <Loading />
  }

  console.log(aboutVisible)
  return token ? (
    !isInitialFetching ? (
      <>
        <HeaderContainer>
          <Navigation />
          <FilesDetails
            hasFiles={fetchedFiles.length > 0}
            formState={formState}
            clearFilters={fetchFiles}
            toggleFormVisibility={toggleFormVisibility}
          />
          {formVisible && (
            <Form handleFormSubmit={fetchFiles} formState={formState} toggleFormVisibility={toggleFormVisibility} />
          )}
        </HeaderContainer>
        <FileWrapper>
          {fetchedFiles.length ? (
            <FileList files={fetchedFiles} />
          ) : (
            <FileNone>
              <p>No files found. Either you got them all, or you should try another filter </p>
              <ButtonGroup>
                <Button onClick={() => toggleFormVisibility(true)}>Modify Filters</Button>
                <Button color="orange" onClick={() => fetchFiles()}>
                  Clear Filters
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
    <Home />
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

const FileWrapper = styled.div`
  padding: 10px 25px;
  margin-top: 190px;
  padding-bottom: 40px;
`
const FileNone = styled.div`
  margin-top: 60px;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const ButtonGroup = styled.div`
  display: flex;

  & > button:first-child {
    margin-right: 10px;
  }
`
