import { useState } from 'react'
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'

import { captureMessage, captureException } from '../Errors'

import { FileResponse } from '../../shared'
import {
  applicationNoticeState,
  deleteFileSizeState,
  fetchedFilesState,
  userDetailsState,
  // fetchedPagesState,
  // formState,
} from '../state'

// import useFetchFiles from './useFetchFiles'

async function wait(ms: number) {
  return new Promise((resolve: any) => {
    setTimeout(resolve, ms)
  })
}

const DELETE_ENDPOINT = 'https://slack.com/api/files.delete?'

export default function useDeleteFiles() {
  const setApplicationNoticeState = useSetRecoilState(applicationNoticeState)
  const userDetails = useRecoilValue(userDetailsState)
  const [deletedFileSize, setDeletedFileSize] = useRecoilState(deleteFileSizeState)
  const [fetchedFiles, setFetchedFiles] = useRecoilState(fetchedFilesState)
  // const { page, pages } = useRecoilValue(fetchedPagesState)
  // const formData = useRecoilValue(formState)
  const [isDeleting, setIsDeleting] = useState(false)

  // const { fetchFiles } = useFetchFiles()
  const { token } = userDetails

  const deleteFile = async (id: string, size: number) => {
    try {
      const deleteFileFetch = await fetch(DELETE_ENDPOINT + new URLSearchParams({ token, file: id }))
      const deletedFile = await deleteFileFetch.json()
      if (deletedFile.ok) {
        setFetchedFiles(fetchedFiles.filter((file: any) => file.id !== id))
        setDeletedFileSize(deletedFileSize + size)
        setApplicationNoticeState({
          active: true,
          value: `File Deleted Successfully`,
          type: 'success',
        })
      } else {
        captureMessage(`useDeleteFiles :: deletedFile ${JSON.stringify(deletedFile)}`)
        setApplicationNoticeState({ active: true, value: 'Error Deleting File - File Not Found', type: 'error' })
      }
    } catch (error) {
      captureException(error)
      if (error === 'file_not_found') {
        setApplicationNoticeState({ active: true, value: 'Error Deleting File - File Not Found', type: 'error' })
      } else {
        setApplicationNoticeState({ active: true, value: 'Error Deleting File - Try Again', type: 'error' })
      }
    }
  }

  const deleteAll = async () => {
    const deletedItems: string[] = []
    let deletedFileSizeBatch = 0
    setIsDeleting(true)
    for (const file of fetchedFiles) {
      try {
        const deleteQueuedFile = await fetch(DELETE_ENDPOINT + new URLSearchParams({ token, file: file.id }))
        const deleteQueuedFileResponse = await deleteQueuedFile.json()
        if (deleteQueuedFileResponse.ok) {
          deletedItems.push(file.id)
          deletedFileSizeBatch += file.size
        } else {
          captureMessage(`useDeleteFiles :: deleteAll ${JSON.stringify(deleteQueuedFileResponse)}`)
          setApplicationNoticeState({ active: true, value: 'Error Deleting Files - Try Again', type: 'error' })
          break
        }
        await wait(500)
      } catch (err) {
        captureException(err)
        setApplicationNoticeState({ active: true, value: 'Error Deleting Files - Try Again', type: 'error' })
        setIsDeleting(false)
      }
    }

    setDeletedFileSize(deletedFileSize + deletedFileSizeBatch)
    setFetchedFiles(fetchedFiles.filter((file: FileResponse) => !deletedItems.includes(file.id)))
    setIsDeleting(false)
    setApplicationNoticeState({
      active: true,
      value: `${deletedFileSizeBatch} Files Deleted Successfully`,
      type: 'success',
    })
    // if (page < pages) {
    //   fetchFiles(formData, page + 1)
    // }
  }

  return {
    deleteFile,
    deleteAll,
    isDeleting,
  }
}
