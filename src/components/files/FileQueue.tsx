import React, { FC } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

import { FileResponse } from '../../../shared'
import { queuedFilesState, applicationErrorState, deleteFileSizeState, fetchedFilesState } from '../../state/atoms'
import { tokenSelector } from '../../state/selectors'

import { FileDisplayItem } from './FileDisplayItem'
import { formatBytes } from '../../utils'

async function wait(ms: number) {
  return new Promise((resolve: any) => {
    setTimeout(resolve, ms)
  })
}

export const FileQueue: FC = () => {
  const [applicationError, setApplicationError] = useRecoilState(applicationErrorState)
  const [deletedFileSize, setDeletedFileSize] = useRecoilState(deleteFileSizeState)
  const [queuedFiles, setQueuedFiles] = useRecoilState(queuedFilesState)
  const [fetchedFiles, setFetchedFiles] = useRecoilState(fetchedFilesState)
  const token = useRecoilValue(tokenSelector)

  if (!Object.keys(queuedFiles).length) {
    return null
  }

  const sizeTotal = formatBytes(queuedFiles.reduce((a: any, b: any) => a + b.size, 0))

  const handleDeleteAll = async () => {
    const deletedItems: string[] = []
    let deletedFileSizeBatch = 0
    for (const file of queuedFiles) {
      try {
        const deleteQueuedFile = await fetch(
          'https://slack.com/api/files.delete?' + new URLSearchParams({ token, file: file.id }),
        )
        const deleteQueuedFileResponse = await deleteQueuedFile.json()
        if (deleteQueuedFileResponse.ok) {
          deletedItems.push(file.id)
          deletedFileSizeBatch += file.size
        }
        await wait(1250)
      } catch (err) {
        console.log(err)
      }
    }

    setDeletedFileSize(deletedFileSize + deletedFileSizeBatch)
    setQueuedFiles(queuedFiles.filter((file: FileResponse) => !deletedItems.includes(file.id)))
    setFetchedFiles(fetchedFiles.filter((file: FileResponse) => !deletedItems.includes(file.id)))
  }

  return (
    <main>
      <h1>Queue</h1>
      <h3>Possibility to save: {sizeTotal}</h3>
      <button onClick={handleDeleteAll}>Delete All</button>
      <ul>
        {queuedFiles.map((file: FileResponse) => (
          <li key={file.id}>
            <FileDisplayItem file={file} />
          </li>
        ))}
      </ul>
    </main>
  )
}

FileQueue.displayName = 'File Queue Section'
