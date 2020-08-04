import { useState } from 'react'
import { useSetRecoilState, useRecoilValue } from 'recoil'
import { parseISO, getUnixTime, addDays } from 'date-fns'

import { userDetailsState, fetchedFilesState, applicationNoticeState, fetchedPagesState, formState } from '../state'
import { FilesListReponse } from '../../shared'

export const generateSearchParams = (formdata: any, user: string, token: string, page = 1, isAdmin = false) => {
  let types = ''
  const params: any = { token, count: '10', show_files_hidden_by_limit: true }
  if (!isAdmin) {
    params.user = user
  }

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

  return new URLSearchParams({ ...params, types, page })
}

export default function useFetchFiles() {
  const [isInitialFetching, toggleInitialFetching] = useState<boolean>(true)
  const { token, profile } = useRecoilValue(userDetailsState)
  const setFormState = useSetRecoilState(formState)
  const setFetchedFiles = useSetRecoilState(fetchedFilesState)
  const setFetchedPages = useSetRecoilState(fetchedPagesState)
  const setApplicationError = useSetRecoilState(applicationNoticeState)

  const fetchFiles = async (data?: any, page = 1) => {
    setFormState(data)
    const params = generateSearchParams(data, profile.userId, token, page, profile.is_admin)

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

  return {
    fetchFiles,
    isInitialFetching,
  }
}
