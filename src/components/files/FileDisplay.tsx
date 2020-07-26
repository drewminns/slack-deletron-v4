import React, { FC } from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { cssVar } from 'polished'

import { FileResponse } from '../../../shared'
import { fetchedFilesState, queuedFilesState } from '../../state'
import { useDeleteFiles } from '../../hooks/useDeleteFiles'

import { FileDisplayItem } from './FileDisplayItem'

export const FileDisplay: FC = () => {
  const [fetchedFiles] = useRecoilState(fetchedFilesState)
  const [queuedFiles, setQueuedFiles] = useRecoilState(queuedFilesState)
  const { deleteFile } = useDeleteFiles(fetchedFiles)

  if (!Object.keys(fetchedFiles).length) {
    return null
  }

  const handleAddToQueue = (file: FileResponse) => {
    setQueuedFiles([...queuedFiles, file])
  }

  return (
    <FileDisplayWrapper>
      <FileDisplayItems>
        <FileDisplayList>
          {fetchedFiles.map((file: FileResponse) => (
            <FileDisplayListItem key={file.id}>
              <FileDisplayItem file={file} handleDelete={deleteFile} />
            </FileDisplayListItem>
          ))}
        </FileDisplayList>
      </FileDisplayItems>
    </FileDisplayWrapper>
  )
}

FileDisplay.displayName = 'File Display Section'

const FileDisplayWrapper = styled.div`
  flex: 1;
`

const FileDisplayHeader = styled.header`
  padding: 25px;
  background: var(--color-grey);
`

const FileDisplayItems = styled.div``

const FileDisplayList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 0;
  margin: 0;
  list-style: none;
`

const FileDisplayListItem = styled.li`
  margin-bottom: 20px;
`
