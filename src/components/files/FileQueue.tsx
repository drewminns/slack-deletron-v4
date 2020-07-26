import React, { FC } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'

import { FileResponse } from '../../../shared'
import { queuedFilesState } from '../../state'

import { useDeleteFiles } from '../../hooks/useDeleteFiles'
import { FileDisplayItem } from './FileDisplayItem'
import { formatBytes } from '../../utils'

export const FileQueue: FC = () => {
  const [queuedFiles] = useRecoilState(queuedFilesState)
  const { deleteAll } = useDeleteFiles(queuedFiles)

  if (!Object.keys(queuedFiles).length) {
    return null
  }

  const sizeTotal = formatBytes(queuedFiles.reduce((a: any, b: any) => a + b.size, 0))

  return (
    <FileQueueWrapper>
      <h1>Queue</h1>
      <h3>Possibility to save: {sizeTotal}</h3>
      <button onClick={deleteAll}>Delete All</button>
      <ul>
        {queuedFiles.map((file: FileResponse) => (
          <li key={file.id}>
            <FileDisplayItem file={file} handleDelete={() => null} />
          </li>
        ))}
      </ul>
    </FileQueueWrapper>
  )
}

FileQueue.displayName = 'File Queue Section'

const FileQueueWrapper = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  top: var(--hs);
  background: var(--color-white);
  padding: 25px;
  box-shadow: -5px 2px 10px rgba(0, 0, 0, 0.2);
`
