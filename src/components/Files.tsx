import React, { FC } from 'react'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { parseISO, getUnixTime, addDays } from 'date-fns'

import { FilesListReponse } from '../../shared'
import { fetchedFilesState, applicationErrorState, fetchedPagesState, userDetailsState } from '../state'

import { FileList } from './files/FileList'
import { FilesDetails } from './files/FilesDetails'
import { Form } from './form/Form'

export const generateSearchParams = (formdata: any, user: string, token: string) => {
  let types = ''
  const params: any = { token, count: '100', show_files_hidden_by_limit: true, user }
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

export type FormState = {
  channels: string
  endDate: string
  gdocs: boolean
  images: boolean
  pdfs: boolean
  snippets: boolean
  spaces: boolean
  startDate: string
}

export const Files: FC = () => {
  const [loading, isLoading] = useState<boolean>(true)
  const [formState, setFormState] = useState<FormState | any>({})
  const [filtersShown, toggleFilters] = useState<boolean>(false)
  const setFetchedPages = useSetRecoilState(fetchedPagesState)
  const [fetchedFiles, setFetchedFiles] = useRecoilState(fetchedFilesState)
  const setApplicationError = useSetRecoilState(applicationErrorState)
  const userDetails = useRecoilValue(userDetailsState)

  const fetchFiles = async (data?: any) => {
    setFormState(data)
    const params = generateSearchParams(data, userDetails.profile.userId, userDetails.token)

    try {
      const filesFetch = await fetch('https://slack.com/api/files.list?' + new URLSearchParams(params))
      const files: FilesListReponse = await filesFetch.json()
      if (files.ok) {
        setFetchedFiles(files.files)
        setFetchedPages(files.paging)
        isLoading(false)
      } else {
        setApplicationError({ active: true, value: files.error as string })
      }
    } catch (error) {
      setApplicationError({ active: true, value: error })
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  return (
    <FileWrapper>
      {!loading && (
        <>
          {filtersShown ? (
            <Form handleForm={fetchFiles} handleFilterToggle={toggleFilters} formState={formState} />
          ) : null}
          <FilesDetails handleFilterToggle={toggleFilters} formState={formState} />
          <FileList files={fetchedFiles} />
        </>
      )}
    </FileWrapper>
  )
}

const FileWrapper = styled.div`
  padding: 25px;
`
