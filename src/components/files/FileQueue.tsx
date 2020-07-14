import React, { FC } from 'react'
import { useRecoilState } from 'recoil'

import { FileResponse } from '../../../shared'
import { queuedFilesState } from '../../state'

import { useDeleteFiles } from '../../hooks/useDeleteFiles'
import { FileDisplayItem } from './FileDisplayItem'
import { formatBytes } from '../../utils'

async function wait(ms: number) {
  return new Promise((resolve: any) => {
    setTimeout(resolve, ms)
  })
}

export const FileQueue: FC = () => {
  const [queuedFiles] = useRecoilState(queuedFilesState)
  const { deleteAll, isLoading } = useDeleteFiles(queuedFiles)

  if (!Object.keys(queuedFiles).length) {
    return null
  }

  const sizeTotal = formatBytes(queuedFiles.reduce((a: any, b: any) => a + b.size, 0))

  return (
    <main>
      <h1>Queue</h1>
      <h3>Possibility to save: {sizeTotal}</h3>
      <button onClick={deleteAll}>Delete All</button>
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
