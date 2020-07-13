import React, { FC } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { FileResponse } from '../../../shared'
import { fetchedFilesState, applicationErrorState, deleteFileSizeState } from '../../state/atoms'
import { tokenSelector } from '../../state/selectors'

import { FileDisplayItem } from './FileDisplayItem'
import { formatBytes } from '../../utils'

export const FileDisplay: FC = () => {
  const [fetchedFiles, setFetchedFiles] = useRecoilState(fetchedFilesState)
  const [applicationError, setApplicationError] = useRecoilState(applicationErrorState)
  const [deletedFileSize, setDeletedFileSize] = useRecoilState(deleteFileSizeState)
  const token = useRecoilValue(tokenSelector)

  if (!Object.keys(fetchedFiles).length) {
    return null
  }

  const sizeTotal = formatBytes(fetchedFiles.reduce((a: any, b: any) => a + b.size, 0))

  const deleteFile = async (id: string, size: number) => {
    try {
      const deleteFileFetch = await fetch(
        'https://slack.com/api/files.delete?' + new URLSearchParams({ token, file: id }),
      )
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

  return (
    <main>
      <h2>Total File Size: {sizeTotal}</h2>
      <h3>Saved: {formatBytes(deletedFileSize)}</h3>
      <ul>
        {fetchedFiles.map((file: FileResponse) => (
          <li key={file.id}>
            <FileDisplayItem file={file} handleDelete={deleteFile} />
          </li>
        ))}
      </ul>
    </main>
  )
}

FileDisplay.displayName = 'File Display Section'
