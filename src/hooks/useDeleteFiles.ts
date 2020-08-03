import { useState } from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'

import { FileResponse } from '../../shared'
import {
  applicationErrorState,
  deleteFileSizeState,
  fetchedFilesState,
  userDetailsState,
  fetchedPagesState,
  formState,
} from '../state'

import useFetchFiles from './useFetchFiles'

async function wait(ms: number) {
  return new Promise((resolve: any) => {
    setTimeout(resolve, ms)
  })
}

const DELETE_ENDPOINT = 'https://slack.com/api/files.delete?'

export default function useDeleteFiles(fileArray: FileResponse[]) {
  const setApplicationError = useSetRecoilState(applicationErrorState)
  const userDetails = useRecoilValue(userDetailsState)
  const [deletedFileSize, setDeletedFileSize] = useRecoilState(deleteFileSizeState)
  const [fetchedFiles, setFetchedFiles] = useRecoilState(fetchedFilesState)
  const { page, pages } = useRecoilValue(fetchedPagesState)
  const formData = useRecoilValue(formState)
  const [isDeleting, setIsDeleting] = useState(false)

  const { fetchFiles } = useFetchFiles()
  const { token } = userDetails

  const deleteFile = async (id: string, size: number) => {
    try {
      const deleteFileFetch = await fetch(DELETE_ENDPOINT + new URLSearchParams({ token, file: id }))
      const deletedFile = await deleteFileFetch.json()
      if (deletedFile.ok) {
        setFetchedFiles(fetchedFiles.filter((file: any) => file.id !== id))
        setDeletedFileSize(deletedFileSize + size)
      } else {
        setApplicationError({ active: true, value: deletedFile.error })
      }
    } catch (error) {
      setApplicationError({ active: true, value: error })
    }
  }

  const deleteAll = async () => {
    const deletedItems: string[] = []
    let deletedFileSizeBatch = 0
    setIsDeleting(true)
    for (const file of fileArray) {
      try {
        const deleteQueuedFile = await fetch(DELETE_ENDPOINT + new URLSearchParams({ token, file: file.id }))
        const deleteQueuedFileResponse = await deleteQueuedFile.json()
        if (deleteQueuedFileResponse.ok) {
          deletedItems.push(file.id)
          deletedFileSizeBatch += file.size
        } else {
          setApplicationError({ active: true, value: 'Deleting Error' })
          break
        }
        await wait(500)
      } catch (err) {
        setApplicationError({ active: true, value: err })
        setIsDeleting(false)
      }
    }

    setDeletedFileSize(deletedFileSize + deletedFileSizeBatch)
    setFetchedFiles(fetchedFiles.filter((file: FileResponse) => !deletedItems.includes(file.id)))
    setIsDeleting(false)
    if (page < pages) {
      fetchFiles(formData, page + 1)
    }
  }

  return {
    deleteFile,
    deleteAll,
    isDeleting,
  }
}
