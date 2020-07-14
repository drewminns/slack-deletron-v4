import React, { FC } from 'react'
import { useRecoilState } from 'recoil'

import { FileResponse } from '../../../shared'
import { fetchedFilesState, deleteFileSizeState } from '../../state'
import { useDeleteFiles } from '../../hooks/useDeleteFiles'

import { FileDisplayItem } from './FileDisplayItem'
import { formatBytes } from '../../utils'

async function wait(ms: number) {
  return new Promise((resolve: any) => {
    setTimeout(resolve, ms)
  })
}

export const FileDisplay: FC = () => {
  const [fetchedFiles] = useRecoilState(fetchedFilesState)
  const [deletedFileSize] = useRecoilState(deleteFileSizeState)
  const { deleteAll, deleteFile, isLoading } = useDeleteFiles(fetchedFiles)

  if (!Object.keys(fetchedFiles).length) {
    return null
  }

  const sizeTotal = formatBytes(fetchedFiles.reduce((a: any, b: any) => a + b.size, 0))

  return (
    <main>
      <h2>Total File Size: {sizeTotal}</h2>
      <h3>Saved: {formatBytes(deletedFileSize)}</h3>
      <button onClick={deleteAll}>Delete All</button>
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
